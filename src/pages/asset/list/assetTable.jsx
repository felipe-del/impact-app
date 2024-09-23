import React from 'react';
import DynamicTable from '../../../components/dynamicTable/dynamicTable';
import SearchBar from '../../../components/searchBar/searchBar';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePage } from '../../../context/pageContext';

const AssetTable = () => {
  const [assets, setAssets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { setPageName } = usePage();

    useEffect(() => {
        setPageName("Listado de Activos");
    }, [setPageName]);

  useEffect(() => {
    fetch("http://localhost:8080/asset/all")
        .then(response => response.json())
        .then(data => {
            console.log("Datos recibidos: ", data);
            setAssets(data);
        })
        .catch(error => console.error('Error:', error));
}, []);
  

// Filtrado de productos basado en la búsqueda y las categorías seleccionadas
const filteredProducts = assets.filter(asset => {
const matchesSearch = asset.description.toLowerCase().includes(searchTerm.toLowerCase());
  return matchesSearch;
});

const flattenedProducts = filteredProducts.map(asset => ({
    plate: asset.plate,
    category: asset.category,  // Asegúrate de que 'name' existe en 'category'
    subcategory: asset.subcategory,
    status: asset.status,
    description: asset.description,
    location: asset.location,
}));
  
    const productColumns = [
      { header: 'Placa', accessor: 'plate' },
      { header: 'Categoría', accessor: 'category' },
      { header: 'Subcagoría', accessor: 'subcategory' },
      { header: 'Estado', accessor: 'status' },
      { header: 'Descripción', accessor: 'description'},
      { header: 'Ubicación', accessor: 'location'},
    ];
  
    return (
      <div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-0">
                      <li className="breadcrumb-item"><a href="/app">Inicio</a></li>
                      <li className="breadcrumb-item active" aria-current="page">Listado de Activos</li>
                  </ol>
          </nav>
          <Link to="/app/createAsset" className="btn btn-primary me-2">Registrar activo</Link>
        </div>
        <h2 className="mb-4">Listado de activos</h2>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <SearchBar 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm} 
            placeholder="Buscar activos..." 
          /> 
        </div>
        
        <DynamicTable items={flattenedProducts} columns={productColumns} />
      </div>
    );
  };

export default AssetTable;