import React from 'react';
import DynamicTable from '../../../components/dynamicTable/dynamicTable';
import SearchBar from '../../../components/searchBar/searchBar';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AssetPage = () => {
  const [assets, setAssets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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
const matchesSearch = asset.category.toLowerCase().includes(searchTerm.toLowerCase());
  return matchesSearch;
});

const flattenedProducts = filteredProducts.map(asset => ({
    plate: asset.id,
    category: asset.category,  // Asegúrate de que 'name' existe en 'category'
    number: asset.number,
    status: asset.status,
}));
  
    const productColumns = [
      { header: 'Placa', accessor: 'plate' },
      { header: 'Categoría', accessor: 'category' },
      { header: 'Número', accessor: 'number' },
      { header: 'Estado', accessor: 'status' },
    ];
  
    return (
      <div>
        <h2 className="mb-4">Listado de activos</h2>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <SearchBar 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm} 
            placeholder="Buscar activos..." 
          />
          <Link to="/app/createAsset" className="btn btn-primary me-2">Registrar activo</Link>
        </div>
        
        <DynamicTable items={flattenedProducts} columns={productColumns} />
      </div>
    );
  };

export default AssetPage;