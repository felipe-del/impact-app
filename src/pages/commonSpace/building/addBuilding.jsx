import React, { useState, useEffect } from 'react';
import { Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './addBuilding.css';
import { usePage } from '../../../context/pageContext';

const AddBuilding = () => {
    const [name, setName] = useState('');
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const { setPageName } = usePage();

    useEffect(() => {
        setPageName("Agregar Edificio");
    }, [setPageName]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newBuilding = {
            id: 0,
            name: name
        };

        fetch('http://localhost:8080/common-space/create/building', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBuilding)
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

    const handleRegisterBloc = () => {
        window.location.href = 'addBuildingLocation';
    };
    const handleRegisterSp = () => {
        window.location.href = 'addSpace';
    };


    return (
        <div className="main-container mt-5 d-flex justify-content-center">
            <div className="card p-5 shadow-lg" style={{ maxWidth: "700px", borderRadius: "10px" }}>
                <h1 id="building-title" className="text-center mb-5">Registro de edificios</h1>
                <div className="text-center mb-4">
                    <button className="btn btn-lg btn-custom btn-space shadow-sm" role="button" onClick={handleRegisterBloc}>
                        <i className="fas fa-map-marked-alt"></i> Registro de ubicaciones
                    </button>
                    <button className="btn btn-lg btn-custom btn-space shadow-sm" role="button" onClick={handleRegisterSp}>
                        <i className="fas fa-building"></i> Registro de espacios
                    </button>
                </div>

                <div className="container3">
                    <h3 id="building-details-title" className="text-center mb-4">Detalles del Edificio</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-4 row align-items-center">
                            <label htmlFor="floorId" id="label-floorId" className="col-sm-4 col-form-label form-label">
                                <i className="fas fa-building"></i> Nombre del Edificio
                            </label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    id="floorId"
                                    className="form-control border-primary"
                                    placeholder="Ingresa el nombre del edificio"
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
                            ¡Edificio agregado correctamente!
                        </div>
                    )}
    
                    {/* Error Alert */}
                    {showErrorAlert && (
                        <div className="alert alert-danger mt-4 text-center" role="alert">
                            Hubo un error al agregar el edificio. Por favor inténtalo de nuevo.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
    
};

export default AddBuilding;
