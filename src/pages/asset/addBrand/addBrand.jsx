import React, { useState, useEffect } from 'react';
import { Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './addBrand.css';
import { usePage } from '../../../context/pageContext';

const AddBrand = () => {
    const [name, setName] = useState('');
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const { setPageName } = usePage();

    useEffect(() => {
        setPageName("Agregar Marca de Activo");
    }, [setPageName]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newBrand = {
            id: 0,
            name
        };

        fetch('http://localhost:8080/brand', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBrand)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(() => {
                setShowSuccessAlert(true);
                setName('');
            })
            .catch(error => {
                console.error('Error adding brand:', error);
                setShowErrorAlert(true);
            });
    };

    return (
        <div className="mt-5 d-flex justify-content-center">
            <div className="card p-5 shadow-lg" style={{ maxWidth: "700px", borderRadius: "10px" }}>
                <h1 id="brand-title" className="text-center mb-5">Agregar Marca</h1>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 row align-items-center">
                        <label htmlFor="name" id="label-name" className="col-sm-4 col-form-label form-label">
                            <i className="fas fa-tag" id="icon-name"></i> Nombre
                        </label>
                        <div className="col-sm-8 w-100 mb-4">
                            <input
                                type="text"
                                id="name"
                                className="form-control border-primary"
                                placeholder="Ingresa el nombre de la marca"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="text-center">
                        <Button className="btn btn-lg btn-custom w-100 shadow-sm" type="submit">
                            <i className="fas fa-save"></i> Guardar
                        </Button>
                    </div>
                </form>
    
                {/* Success Alert */}
                {showSuccessAlert && (
                    <div className="alert alert-success mt-4 text-center" role="alert">
                        Marca ingresada correctamente!
                    </div>
                )}
    
                {/* Error Alert */}
                {showErrorAlert && (
                    <div className="alert alert-danger mt-5 text-center" role="alert">
                        Se produjo un error al agregar la marca. Por favor inténtalo de nuevo.
                    </div>
                )}
            </div>
        </div>
    );
    
    
};

export default AddBrand;
