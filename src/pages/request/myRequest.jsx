/**
 * MyRequest Component
 * 
 * This component renders a page that displays a list of user requests.
 * It includes a breadcrumb navigation and a search bar for filtering requests.
 */
import React from "react";
import { useState } from 'react';
import DynamicTable from "../../components/dynamicTable/dynamicTable";
import SearchBar from "../../components/searchBar/searchBar";

/**
 * MyRequest component that displays a list of user requests.
 * 
 * @component
 * @returns {JSX.Element} - The MyRequest component.
 */
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
      </div>
    </div>
  )
}

export default Myrequest;