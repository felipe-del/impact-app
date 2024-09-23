import React, { useState, useEffect } from 'react';
import { Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './addCategory.css';
import { API_URLS } from '../../../declarations/apiConfig';
import { usePage } from '../../../context/pageContext';

const AddCategory = () => {
    const [name, setName] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState(''); // Added state for subcategory
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const { setPageName } = usePage();

    useEffect(() => {
        setPageName("Agregar Categoría"); // Update as necessary
    }, [setPageName]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newCategory = {
            id: 0,
            name,
            subcategoryId: selectedSubcategory // Assuming the backend expects subcategory_id
        };

        fetch(API_URLS.ASSET.ADD_NEW_CATEGORY, {
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
                setName(''); // Reset name
                setSelectedSubcategory(''); // Reset subcategory
            })
            .catch(error => {
                console.error('Error adding category:', error);
                setShowErrorAlert(true);
            });
    };

    return (
        <div className="mt-5 d-flex justify-content-center">
            <div className="card p-5 shadow-lg" style={{ maxWidth: "700px", borderRadius: "10px" }}>
                <h1 id="category-title" className="text-center mb-5">Agregar Categoría</h1>

                {showSuccessAlert && (
                    <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
                        Categoría agregada exitosamente.
                    </Alert>
                )}

                {showErrorAlert && (
                    <Alert variant="danger" onClose={() => setShowErrorAlert(false)} dismissible>
                        Hubo un error al agregar la categoría.
                    </Alert>
                )}

                <div className="mb-4">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4 row align-items-center">
                            <label htmlFor="name" id="label-name" className="col-sm-4 col-form-label form-label">
                                <i className="fas fa-tag" id="icon-name"></i> Nombre
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
                        <div className="text-center">
                            <Button className="btn btn-lg btn-custom w-100 shadow-sm" type="submit">
                                <i className="fas fa-save"></i> Guardar
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddCategory;
