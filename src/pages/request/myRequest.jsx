import React from "react";
import { useState } from 'react';
import DynamicTable from "../../components/dynamicTable/dynamicTable";
import SearchBar from "../../components/searchBar/searchBar";

const Myrequest= () => {
  const [searchTerm, setSearchTerm] = useState('');

  return(
    <div>
      <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/app/welcome">Inicio</a></li>
                    <li className="breadcrumb-item"><a href="/app/myRequest">Ver mis solicitudes</a></li>
                </ol>
      </nav>
      <h2 className="mb-4">Listado de mis solicitudes</h2>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <SearchBar 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm} 
            placeholder="Buscar solicitudes" 
        />
        {/* <div className="ms-auto">
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
        </div> */}
        {/* <DynamicTable  style={{maxHeight: '60vh'}}/> */}
      </div>
    </div>
  )
}

export default Myrequest;