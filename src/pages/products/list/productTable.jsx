import React from 'react';
import DynamicTable from '../../../components/dynamicTable/dynamicTable';
import SearchBar from '../../../components/searchBar/searchBar';
import { useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Pencil } from '../../../declarations/imageExports';
import { usePage } from '../../../context/pageContext';

const ProductTable = () => {
    const [showLimpieza, setShowLimpieza] = useState(true);
    const [showOficina, setShowOficina] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [allProducts, setProducts] = useState([]);
    const [showEditColumn, setShowEditColumn] = useState(false);
    const { setPageName } = usePage();

    useEffect(() => {
        setPageName("Listado de productos");
    }, [setPageName]);

    useEffect(() => {
        fetch("http://localhost:8080/product/all")
            .then(response => response.json())
            .then(data => {
                console.log("Datos recibidos: ", data);
                setProducts(data);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    // Filtrado de productos basado en la búsqueda y las categorías seleccionadas
    const filteredProducts = allProducts.filter(product => {
        const matchesCategory =
            (showLimpieza && product.category?.categorieType?.name === 'Limpieza') ||
            (showOficina && product.category?.categorieType?.name === 'Oficina');
        const matchesSearch = product.category?.name.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    // Aplanar los datos de productos para que la tabla los maneje fácilmente
    const flattenedProducts = filteredProducts.map(product => ({
        id: product.id,
        name: product.category?.name || 'Sin categoría',  // Asegúrate de que 'name' existe en 'category'
        purchaseDate: product.purchaseDate,
        expiryDate: product.expiryDate,
        status: product.status?.name || 'Sin estado',  // Asegúrate de que 'name' existe en 'status'
        edit:  <img src={Pencil} alt="Edit" className='icon-pencil' onClick={() => handleEdit(product)} />
    }));

    // Columnas de la tabla
    const productColumns = [
        { header: 'Código', accessor: 'id' },  // Usamos 'id' en lugar de 'code'
        { header: 'Descripción', accessor: 'name' },  // Nombre del producto aplanado
        { header: 'Fecha de compra', accessor: 'purchaseDate' },
        { header: 'Fecha de vencimiento', accessor: 'expiryDate' },
        { header: 'Estado', accessor: 'status' },  // Estado del producto aplanado
    ];

    // Manejar los cambios en los checkboxes
    const handleCategoryChange = (category) => {
        if (category === 'Limpieza') {
            setShowLimpieza(!showLimpieza);
        } else if (category === 'Oficina') {
            setShowOficina(!showOficina);
        }
    };

    if (showEditColumn) {
        productColumns.push({
            header: 'Editar',
            accessor: 'edit',
        });
    }
    const handleEdit = (product) => {
        window.location.href = `productEdit/${product.id}`;
    };

    return (
        <div>
    <div className="d-flex justify-content-between align-items-center mb-4">
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item"><a href="/app">Inicio</a></li>
                <li className="breadcrumb-item active" aria-current="page">Listado de Productos</li>
            </ol>
        </nav>
        <div className="d-flex">
            <Link to="/app/inventoryList" className="btn btn-primary me-2">Inventario</Link>
            <Link to="/app/productRegister" className="btn btn-primary me-2">Registrar producto</Link>
            <button className="btn btn-primary " onClick={() => {
                setShowEditColumn(!showEditColumn);
            }}>
                {showEditColumn ? 'Ocultar Editar' : 'Editar'}
            </button>
        </div>
    </div>
    
    <h2 className="mb-4">Listado de productos</h2>
    
    <div className="d-flex justify-content-between align-items-center mb-3">
        <SearchBar 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm} 
            placeholder="Buscar productos..." 
        />
        <div className="ms-auto">
            <label className="me-2">
                <input
                    type="checkbox"
                    className="me-1"
                    checked={showOficina}
                    onChange={() => handleCategoryChange('Oficina')}
                /> Productos oficina
            </label>
            <label>
                <input
                    type="checkbox"
                    className="me-1"
                    checked={showLimpieza}
                    onChange={() => handleCategoryChange('Limpieza')}
                /> Productos limpieza
            </label>
        </div>
    </div>
    
    <DynamicTable items={flattenedProducts} columns={productColumns} />
</div>

    );
};

export default ProductTable;