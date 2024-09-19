import React from 'react';
import DynamicTable from '../../../components/dynamicTable/dynamicTable';
import SearchBar from '../../../components/searchBar/searchBar';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const InventoryTable = () => {

      const [categories, setCategories] = useState([]);
      const [searchTerm, setSearchTerm] = useState('');
      const [showLimpieza, setShowLimpieza] = useState(true);
      const [showOficina, setShowOficina] = useState(true);
  
      useEffect(() => {
          fetch("http://localhost:8080/product/cat")
              .then(response => response.json())
              .then(data => {
                  console.log("Datos recibidos: ", data);
                  setCategories(data);
              })
              .catch(error => console.error('Error:', error));
      }, []);
  
      // Filtrado de productos basado en la búsqueda y las categorías seleccionadas
      const filteredProducts = categories.filter(category => {
          const matchesCategory =
              (showLimpieza && category.productCategory === 'Limpieza') ||
              (showOficina && category.productCategory === 'Oficina');
          const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase());
  
          return matchesCategory && matchesSearch;
      });
  
      // Aplanar los datos de productos para que la tabla los maneje fácilmente
      const flattenedProducts = filteredProducts.map(category => ({
              id: category.id,
              name: category.name,
              unit: category.unitOfMeasurement,
              minQuantity: category.cantidadMinima,
              availableQuantity: category.availableQuantity,
              status: category.status,  // El estado calculado según la cantidad disponible y mínima
      }));
  
      // Definir las columnas de la tabla
      const productColumns = [
          { header: 'Código', accessor: 'id' },
          { header: 'Descripción', accessor: 'name' },
          { header: 'Unidad de medida', accessor: 'unit' },
          { header: 'Cantidad mínima', accessor: 'minQuantity' },
          { header: 'Cantidad disponible', accessor: 'availableQuantity' },
          { header: 'Estado', accessor: 'status'},
      ];
  
      // Manejar los cambios en los checkboxes
      const handleCategoryChange = (category) => {
        if (category === 'Limpieza') {
            setShowLimpieza(!showLimpieza);
        } else if (category === 'Oficina') {
            setShowOficina(!showOficina);
        }
      };

      return (
          <div>
              <div className="d-flex justify-content-end mb-4">
                  <Link to="/app/productList" className="btn btn-primary me-2">Productos</Link>
                  <Link to="/app/categoryRegister" className="btn btn-primary me-2">Registrar categoría</Link>
              </div>
              <h2 className="mb-4">Inventario de productos</h2>
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

export default InventoryTable;