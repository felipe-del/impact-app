import React from 'react';
import DynamicTable from '../../../components/dynamicTable/dynamicTable.jsx';
import SearchBar from '../../../components/searchBar/searchBar.jsx';
import { useState , useEffect} from 'react';
import { Link } from 'react-router-dom';

const SpaceTable = () => {
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
      edificio: space.location.building.name,
      capacidadMaxima: space.maxPeople,  // Asegúrate de que 'name' existe en 'status'
      estado: space.status.name
  }));

  const productColumns = [
    { header: 'Codigo', accessor: 'numeroEspacio' },
    { header: 'Nombre', accessor: 'nombre' },
    { header: 'Edificio', accessor: 'edificio' },
    { header: 'Cantidad máxima de personas', accessor: 'capacidadMaxima' },
    { header: 'Estado del espacio', accessor: 'estado' },
  ];

  return (
      <div>
          <div className="d-flex justify-content-end mb-4">
              <Link className="button-5" to="/app/addSpace">Registro de espacios</Link>
          </div>
          <h2 className="mb-4">Listado de espacios comunes</h2>
          <div className="d-flex justify-content-between align-items-center mb-3">
              <SearchBar
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  placeholder="Buscar espacios comunes..."
              />
          </div>
          <DynamicTable items={flattenedProducts} columns={productColumns}/>
      </div>
  );
};

export default SpaceTable;