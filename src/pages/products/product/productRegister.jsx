import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './productRegister.module.css';

const ProductRegister = () => {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(null);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().substr(0, 10));
    const [expiryDate, setExpiryDate] = useState('');
    const [isExpiryDisabled, setIsExpiryDisabled] = useState(false); // Estado para controlar el campo de fecha de vencimiento
    const [quantity, setQuantity] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentStep, setCurrentStep] = useState(1);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
   

    useEffect(() => {
        fetch('http://localhost:8080/product/categories', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                setCategories(data);
                setFilteredCategories(data);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    const handleSearch = (e) => {
        const searchValue = e.target.value;
        setSearchTerm(searchValue);
        const filtered = categories.filter(category =>
            category.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredCategories(filtered);
    };

    const handleSelectCategory = (category) => {
        setCategory(category);
        setSelectedCategory(category.name);
        setCurrentStep(2);

        // Si la categoría es "Oficina", desactivar la fecha de vencimiento
        if (category.categorieType.name === 'Oficina') {
            setIsExpiryDisabled(true);
            setExpiryDate(''); // Limpiar la fecha de vencimiento
        } else {
            setIsExpiryDisabled(false);
        }
    };

    const handleGoBackToCategorySelection = () => {
        setCurrentStep(1);
    };

    const resetForm = () => {
        setCategory(null);
        setSelectedCategory('');
        setPurchaseDate(new Date().toISOString().substr(0, 10));
        setExpiryDate('');
        setIsExpiryDisabled(false); // Resetear estado de la fecha de vencimiento
        setQuantity('');
        setSearchTerm('');
        setFilteredCategories(categories); // Resetea la lista filtrada de categorías
        setCurrentStep(1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();


        const newProduct = {
            category: category.id,
            purchaseDate,
            expiryDate: isExpiryDisabled ? null : expiryDate, // Enviar null si está deshabilitado
            quantity
        };
        fetch('http://localhost:8080/product/product', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al guardar el producto");
                }
                setShowSuccess(true);
                resetForm(); // Llama a resetForm después de que el producto se guarda exitosamente
            })
            .catch(error => {
                console.error('Error al guardar el producto:', error);
                setShowError(true);
            });
    };

    return (
        <div className="main-container">
            <div className="button-container">
                <h1>Registro de productos</h1>
                <div className="ver-inventario">
                    <button className="button-5" role="button">Ver inventario productos</button>
                </div>
            </div>

            {currentStep === 1 && (
                <div className="container2">
                    <h3>Seleccione la categoría del producto</h3>
                    <div className="search-container">
                        <div className="form-group">
                            <div className='input-group'>
                                <input
                                    type="text"
                                    placeholder="Buscar categorías"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                            </div>
                        </div>
                        <div className='form-group'>
                            <div className='input-group'>
                                <ul>
                                    {filteredCategories.map(category => (
                                        <li key={category.id} onClick={() => handleSelectCategory(category)}>
                                            {category.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {currentStep === 2 && (
                <div className="container2">
                    <form onSubmit={handleSubmit}>
                        <h3>Categoría seleccionada: {selectedCategory || 'Ninguna seleccionada'}</h3>
                        <div className="form-group">
                            <div className="input-group">
                                <label>Fecha de compra:</label>
                                <input
                                    type="date"
                                    value={purchaseDate}
                                    required
                                    onChange={(e) => setPurchaseDate(e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <label>Fecha de vencimiento:</label>
                                <input
                                    type="date"
                                    value={expiryDate}
                                    disabled={isExpiryDisabled} // Deshabilitar si es de tipo "Oficina"
                                    required={!isExpiryDisabled} // Hacerlo obligatorio solo si no está deshabilitado
                                    onChange={(e) => setExpiryDate(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <label>Cantidad a ingresar:</label>
                                <input
                                    type="number"
                                    value={quantity}
                                    min={1}
                                    required
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <button type="button" className="button-5" onClick={handleGoBackToCategorySelection}>
                                Cambiar categoría
                            </button>
                            <button type="submit" className="button-5">Guardar</button>
                        </div>
                    </form>
                </div>
            )}

            {/* Success Modal */}
            <Modal show={showSuccess} onHide={() => setShowSuccess(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Éxito</Modal.Title>
                </Modal.Header>
                <Modal.Body>Producto guardado exitosamente.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowSuccess(false)}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Error Modal */}
            <Modal show={showError} onHide={() => setShowError(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>Hubo un error al guardar el producto. Inténtelo de nuevo.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowError(false)}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ProductRegister;
