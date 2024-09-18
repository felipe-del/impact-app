import React, { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './addSupplier.css';

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
        <div className="mt-5 d-flex justify-content-center">
            <div className="card p-5 shadow-lg" style={{ maxWidth: "700px", borderRadius: "10px" }}>
                <h1 id="provider-title" className="text-center mb-5">Agregar Proveedor</h1>
    
                <div className="mb-4">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4 row align-items-center">
                            <label htmlFor="name" id="label-provider-name" className="col-sm-4 col-form-label form-label">
                                <i className="fas fa-user" id="icon-provider-name"></i> Nombre
                            </label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    id="name"
                                    className="form-control border-primary"
                                    placeholder="Ingresa el nombre del proveedor"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-4 row align-items-center">
                            <label htmlFor="phone" id="label-provider-phone" className="col-sm-4 col-form-label form-label">
                                <i className="fas fa-phone" id="icon-provider-phone"></i> Número Telefónico
                            </label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    id="phone"
                                    className="form-control border-primary"
                                    placeholder="Ingresa el número telefónico"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mb-4 row align-items-center">
                            <label htmlFor="email" id="label-provider-email" className="col-sm-4 col-form-label form-label">
                                <i className="fas fa-envelope" id="icon-provider-email"></i> Correo Electrónico
                            </label>
                            <div className="col-sm-8">
                                <input
                                    type="email"
                                    id="email"
                                    className="form-control border-primary"
                                    placeholder="Ingresa el correo electrónico"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mb-4 row align-items-center">
                            <label htmlFor="address" id="label-provider-address" className="col-sm-4 col-form-label form-label">
                                <i className="fas fa-map-marker-alt" id="icon-provider-address"></i> Dirección
                            </label>
                            <div className="col-sm-8">
                                <textarea
                                    id="address"
                                    className="form-control border-primary"
                                    placeholder="Ingresa la dirección"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
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
                            Proveedor ingresado correctamente!
                        </div>
                    )}
    
                    {/* Error Alert */}
                    {showErrorAlert && (
                        <div className="alert alert-danger mt-4 text-center" role="alert">
                            Se produjo un error al agregar el proveedor. Por favor inténtalo de nuevo.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
    
    
};

export default AddSupplier;
