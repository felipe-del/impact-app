import React, { useState, useEffect } from 'react';
import { Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { usePage } from '../../../context/pageContext';
import { API_URLS } from '../../../declarations/apiConfig';

const AddLocationType = () => {
    const [typeName, setName] = useState('');
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const { setPageName } = usePage();

    useEffect(() => {
        setPageName("Agregar Tipo de Ubicación");
    }, [setPageName]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newLocationType = {
            id: 0,
            typeName
        };

        fetch(API_URLS.ASSET.ADD_NEW_LOCATION_TYPE, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newLocationType)
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
                console.error('Error adding location type:', error);
                setShowErrorAlert(true);
            });
    };

    return (
        <div className="mt-5 d-flex justify-content-center">
            <div className="card p-5 shadow-lg" style={{ maxWidth: "700px", borderRadius: "10px" }}>
                <h1 id="location-type-title" className="text-center mb-5">Agregar Tipo de Ubicación</h1>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 row align-items-center">
                        <label htmlFor="name" id="label-name" className="col-sm-4 col-form-label form-label">
                            <i className="fas fa-map-marker-alt" id="icon-name"></i> Nombre
                        </label>
                        <div className="col-sm-8 w-100 mb-4">
                            <input
                                type="text"
                                id="name"
                                className="form-control border-primary"
                                placeholder="Ingresa el tipo de ubicación"
                                value={typeName}
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

                {showSuccessAlert && (
                    <div className="alert alert-success mt-4 text-center" role="alert">
                        Tipo de ubicación ingresado correctamente!
                    </div>
                )}

                {showErrorAlert && (
                    <div className="alert alert-danger mt-5 text-center" role="alert">
                        Se produjo un error al agregar el tipo de ubicación. Por favor inténtalo de nuevo.
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddLocationType;