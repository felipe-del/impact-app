import React, { useState, useEffect } from 'react';
import { Button, Alert, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './addAssetSubcategory.css';
import { API_URLS } from '../../../declarations/apiConfig';

const AddSubcategory = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    useEffect(() => {
        // Fetch categories on component mount
        fetch(API_URLS.ASSET.GET_ALL_CATEGORY, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched categories:', data); // Log the fetched categories
                setCategories(data);
            })
            .catch(error => console.error('Error fetching categories:', error));
    }, []);
    
    const handleSubmit = (e) => {
        e.preventDefault();

        const newSubcategory = {
            id: 0, // ID will be auto-generated
            name,
            description,
            categoryId: selectedCategory // Add selected category ID
        };

        console.log(newSubcategory)

        fetch(API_URLS.ASSET.ADD_NEW_SUBCATEGORY, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newSubcategory)
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
                setSelectedCategory(''); // Reset selected category
            })
            .catch(error => {
                console.error('Error adding subcategory:', error);
                setShowErrorAlert(true);
            });
    };

    return (
        <div className="mt-5 d-flex justify-content-center">
            <div className="card p-5 shadow-lg" style={{ maxWidth: "700px", borderRadius: "10px" }}>
                <h1 id="subcategory-title" className="text-center mb-5">Agregar Subcategoría</h1>

                {showSuccessAlert && <Alert variant="success">Subcategoría agregada con éxito!</Alert>}
                {showErrorAlert && <Alert variant="danger">Error al agregar subcategoría.</Alert>}

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4">
                        <Form.Label htmlFor="name" id="label-name">
                            <i className="fas fa-tag" id="icon-name"></i> Nombre
                        </Form.Label>
                        <Form.Control
                            type="text"
                            id="name"
                            placeholder="Ingresa el nombre de la subcategoría"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label htmlFor="description" id="label-description">
                            <i className="fas fa-info-circle" id="icon-description"></i> Descripción
                        </Form.Label>
                        <Form.Control
                            type="text"
                            id="description"
                            placeholder="Ingresa una descripción de la subcategoría"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label htmlFor="category" id="label-category">
                            <i className="fas fa-list" id="icon-category"></i> Categoría
                        </Form.Label>
                        <Form.Control
                            as="select"
                            id="category"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            required
                        >
                            <option value="">Selecciona una categoría</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <div className="text-center">
                        <Button className="btn btn-lg btn-custom w-100 shadow-sm" type="submit">
                            <i className="fas fa-save"></i> Guardar
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default AddSubcategory;
