import React, { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './addSpaceType.css';

const AddSpaceType = () => {
    const [type, setType] = useState('');
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newSpaceType = {
            id: 0,
            type
        };

        fetch('http://localhost:8080/common-space/create/space-type', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newSpaceType)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(() => {
                setShowSuccessAlert(true);
                setType('');
            })
            .catch(error => {
                console.error('Error adding brand:', error);
                setShowErrorAlert(true);
            });
    };

    const handleRegisterS = () => {
        window.location.href = 'addSpace';
    };

    return (
        <div className="mt-5 d-flex justify-content-center">
            <div className="card p-5 shadow-lg" style={{ maxWidth: "700px", borderRadius: "10px" }}>
                <h1 className="text-center mb-5">Registro de Tipos de Espacio</h1>
    
                <div className="text-center mb-4">
                    <Button className="btn btn-lg btn-custom btn-space shadow-sm" role="button" onClick={handleRegisterS}>
                        <i className="fas fa-box"></i> Registro de espacios
                    </Button>
                </div>

                <div className="container2">
                    <div className="container3">
                        <h3 className="text-center mb-4">Detalles del Tipo de Espacio</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4 row align-items-center">
                                <label htmlFor="type" className="col-sm-4 col-form-label form-label">
                                    <i className="fas fa-list"></i> Tipo de espacio (ej. laboratorio, aula, auditorio...)
                                </label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        id="type"
                                        className="form-control border-primary"
                                        placeholder="Ingresa el tipo de espacio"
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
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
                            <Alert variant="success" className="mt-4 text-center" onClose={() => setShowSuccessAlert(false)} dismissible>
                                Tipo de espacio agregado exitosamente!
                            </Alert>
                        )}

                        {/* Error Alert */}
                        {showErrorAlert && (
                            <Alert variant="danger" className="mt-4 text-center" onClose={() => setShowErrorAlert(false)} dismissible>
                                Hubo un error al agregar el tipo. Por favor, inténtalo de nuevo.
                            </Alert>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddSpaceType;
