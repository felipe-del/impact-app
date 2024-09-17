import React, { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS


const AddCategory = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newCategory = {
            id: 0,
            name,
            description
        };

        fetch('http://localhost:8080/asset/category', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCategory)
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
                setDescription('');
            })
            .catch(error => {
                console.error('Error adding category:', error);
                setShowErrorAlert(true);
            });
    };

    return (
        <div className="mt-5 d-flex justify-content-center">
            <div className="card p-5 shadow-lg" style={{ maxWidth: "700px", borderRadius: "10px" }}>
                <h1 className="text-center text-primary mb-5">Agregar Categoría</h1>
    
                <div className="mb-4">
                    
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4 row align-items-center">
                            <label htmlFor="name" className="col-sm-4 col-form-label text-primary">
                                <i className="fas fa-tag"></i> Nombre
                            </label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    id="name"
                                    className="form-control border-primary"
                                    placeholder="Ingresa el nombre de la categoría"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-4 row align-items-center">
                            <label htmlFor="description" className="col-sm-4 col-form-label text-primary">
                                <i className="fas fa-info-circle"></i> Descripción
                            </label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    id="description"
                                    className="form-control border-primary"
                                    placeholder="Ingresa una descripción de la categoría"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="text-center">
                            <Button className="btn btn-lg btn-primary w-100 shadow-sm" type="submit">
                                <i className="fas fa-save"></i> Guardar
                            </Button>
                        </div>
                    </form>
    
                    {/* Success Alert */}
                    {showSuccessAlert && (
                        <div className="alert alert-success mt-4 text-center" role="alert">
                            ¡Categoría agregada correctamente!
                        </div>
                    )}
    
                    {/* Error Alert */}
                    {showErrorAlert && (
                        <div className="alert alert-danger mt-4 text-center" role="alert">
                            Se produjo un error al agregar la categoría. Por favor, inténtalo de nuevo.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
    
    
};

export default AddCategory;
