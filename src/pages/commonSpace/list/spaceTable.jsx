import React from 'react';
import DynamicTable from '../../../components/dynamicTable/dynamicTable.jsx';
import SearchBar from '../../../components/searchBar/searchBar.jsx';
import { useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import { usePage } from '../../../context/pageContext.jsx';

const SpaceTable = () => {
  const [allSpaces, setSpaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { setPageName } = usePage();

  useEffect(() => {
      setPageName("Listado de Espacios comunes");
  }, [setPageName]);

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
      ubicacion: space.location.floor,
      capacidadMaxima: space.maxPeople,  // Asegúrate de que 'name' existe en 'status'
      estado: space.status.name
  }));

  const productColumns = [
    { header: 'Codigo', accessor: 'numeroEspacio' },
    { header: 'Nombre', accessor: 'nombre' },
    { header: 'Edificio', accessor: 'edificio' },
    { header: 'Ubicacion', accessor: 'ubicacion' },
    { header: 'Cantidad máxima de personas', accessor: 'capacidadMaxima' },
    { header: 'Estado del espacio', accessor: 'estado' },
  ];

  return (
      <div>
          <div className="d-flex justify-content-between align-items-center mb-4 w-100">
              <nav aria-label="breadcrumb" className="flex-grow-1">
                  <ol className="breadcrumb mb-0">
                      <li className="breadcrumb-item">
                          <a href="/app">Inicio</a>
                      </li>
                      <li className="breadcrumb-item active" aria-current="page">
                          Registro de ubicaciones de edificio
                      </li>
                  </ol>
              </nav>
              <Link className="button-5" to="/app/addSpace">
                  Registro de espacios
              </Link>
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