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
        <div className="main-container">
            <div className="button-container">
                <h1>Registro de tipos de espacio</h1>
                <div className="ver-inventario">
                    <button className="button-5" role="button" onClick={handleRegisterS}>Registro de espacios
                    </button>
                </div>
            </div>
            <div className="container2">
                <div className="container3">
                    <h3>Detalles del tipo de espacio</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <div className="input-group">
                                <label htmlFor="type">Tipo de espacio (ej. laboratorio, aula, auditorio...)</label>
                                <input
                                    type="text"
                                    id="type"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="button">
                            <Button className="button-5" type="submit" role="button">
                                Guardar
                            </Button>
                        </div>
                    </form>

                    {/* Success Alert */}
                    {showSuccessAlert && (
                        <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
                            Space-type added successfully!
                        </Alert>
                    )}

                    {/* Error Alert */}
                    {showErrorAlert && (
                        <Alert variant="danger" onClose={() => setShowErrorAlert(false)} dismissible>
                            There was an error adding the type. Please try again.
                        </Alert>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddSpaceType;
