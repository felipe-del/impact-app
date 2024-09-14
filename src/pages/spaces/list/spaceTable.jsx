import React from 'react';
import DynamicTable from '../list/DynamicTable';
import SearchBar from '../searchBar/searchBar';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const SpacesPage = () => {
    const [allSpaces, setSpaces] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch("http://localhost:8080/common-space/all")
            .then(response => response.json())
            .then(data => {
                console.log("Datos recibidos: ", data);
                setSpaces(data);
            })
            .catch(error => console.error('Error:', error));
    }, []);
      
  
    // Filtrado de productos basado en la búsqueda y las categorías seleccionadas
    const filteredProducts = allSpaces.filter(space => {
    const matchesSearch = space.nombre.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });

    const flattenedProducts = filteredProducts.map(space => ({
        nombre: space.name,
        numeroEspacio: space.spaceCode,  // Asegúrate de que 'name' existe en 'category'
        edificio: space.location?.building?.name,
        piso: space.location?.floor,
        capacidadMaxima: space.maxPeople,  // Asegúrate de que 'name' existe en 'status'
    }));
  
    const productColumns = [
      { header: 'Nombre', accessor: 'nombre' },
      { header: 'Codigo', accessor: 'numeroEspacio' },
      { header: 'Edificio', accessor: 'edificio' },
      { header: 'Piso', accessor: 'piso' },
      { header: 'Cantidad máxima de personas', accessor: 'capacidadMaxima' },
    ];
  
    return (
      <div>
        <h2 className="mb-4">Listado de espacios comunes</h2>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <SearchBar 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm} 
            placeholder="Buscar espacios comunes..." 
          />
          <Link to="/nueva-pagina-2" className="btn btn-primary me-2">Registrar espacio</Link>
        </div>
        <DynamicTable items={flattenedProducts} columns={productColumns} />
      </div>
    );
  };

export default SpacesPage;