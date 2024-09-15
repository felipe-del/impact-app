import React from 'react';
import DynamicTable from '../../../components/dynamicTable/dynamicTable';
import SearchBar from '../../../components/searchBar/searchBar';
import { useState , useEffect} from 'react';
import { Link } from 'react-router-dom';

const SpaceList = () => {
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
  const matchesSearch = space.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const flattenedProducts = filteredProducts.map(space => ({
      nombre: space.name,
      numeroEspacio: space.spaceCode,  // Asegúrate de que 'name' existe en 'category'
      edificio: space.locationName,
      capacidadMaxima: space.maxPeople,  // Asegúrate de que 'name' existe en 'status'
  }));

  const productColumns = [
    { header: 'Nombre', accessor: 'nombre' },
    { header: 'Codigo', accessor: 'numeroEspacio' },
    { header: 'Edificio', accessor: 'edificio' },
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

export default SpaceList;