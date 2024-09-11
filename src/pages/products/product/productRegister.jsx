import React, { useState, useEffect } from 'react';
import './productRegister.module.css'

const ProductRegister = () => {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(null);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().substr(0, 10));
    const [expiryDate, setExpiryDate] = useState('');
    const [quantity, setQuantity] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentStep, setCurrentStep] = useState(1); // 1 para selección de categoría, 2 para el formulario

    useEffect(() => {
        fetch('http://localhost:8080/api/productCategory/categories')
            .then(response => response.json())
            .then(data => {
                setCategories(data);
                setFilteredCategories(data);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    // Categories filter
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
        setCurrentStep(2); // Next step, form
    };


    const handleGoBackToCategorySelection = () => {
        setCurrentStep(1); // step back, category section
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newProduct = {
            category: category.id,
            purchaseDate,
            expiryDate,
            quantity
        };
        console.log(newProduct);
        fetch('http://localhost:8080/api/productCategory/product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("error in the product register");
                }
                alert('Productos guardada exitosamente');
            })
            .catch(error => {
                console.error('Error al guardar categoría:', error);
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

            {/* Category selection */}
            {currentStep === 1 && (
                <div className="container">
                    <div className="search-container">
                        <h3>Seleccione la categoría del producto</h3>
                        <div className="form-group">
                            <div className='input-group'>
                                <label>Buscar categorías</label>
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

            {/* Register form */}
            {currentStep === 2 && (
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <h3>Categoría seleccionada: {selectedCategory || 'Ninguna seleccionada'}</h3>
                        <div className="form-group">
                            <div className="input-group">
                                <label>Fecha de compra:</label>
                                <input
                                    type="date"
                                    value={purchaseDate}
                                    onChange={(e) => setPurchaseDate(e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <label>Fecha de vencimiento:</label>
                                <input
                                    type="date"
                                    value={expiryDate}
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
        </div>
    );
};

export default ProductRegister;
