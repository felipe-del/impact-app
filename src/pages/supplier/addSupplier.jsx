import React, { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './AddSupplier.css';

const AddSupplier = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newSupplier = {
            id: 0,
            name,
            phone,
            email,
            address
        };

        fetch('http://localhost:8080/supplier', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newSupplier)
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
                setPhone('');
                setEmail('');
                setAddress('');
            })
            .catch(error => {
                console.error('Error adding supplier:', error);
                setShowErrorAlert(true);
            });
    };

    return (
        <div className="main-container">
            <h1>Agregar Proveedor</h1>
            <div className="container2">
                <div className="container3">
                    <h3>Detalles</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Nombre</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Número Telefónico</label>
                            <input
                                type="text"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Correo Electrónico</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Dirección</label>
                            <textarea
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
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
                            Proveedor ingresado correctamente!
                        </Alert>
                    )}

                    {/* Error Alert */}
                    {showErrorAlert && (
                        <Alert variant="danger" onClose={() => setShowErrorAlert(false)} dismissible>
                            Se produjo un error al agregar el proveedor. Por favor inténtalo de nuevo.
                        </Alert>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddSupplier;
