import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_URLS } from '../../../declarations/apiConfig';

const ProductRequest = () => {
    const [products, setProducts] = useState([]);
    const [selectedProductCode, setSelectedProductCode] = useState('');
    const [quantity, setQuantity] = useState('');
    const [purpose, setPurpose] = useState('');
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const formRef = useRef(null);

    const userId = sessionStorage.getItem('userId'); // Replace with your method to get the user ID from session

    useEffect(() => {
        // Fetch the available products from the API
        fetch(`${API_URLS.products}/available`)
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setShowErrorAlert(true);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedProductCode || !quantity || !purpose) {
            setShowErrorAlert(true);
            return;
        }

        const productRequest = {
            productCode: selectedProductCode,
            quantity,
            purpose,
            userId, // Include user ID in the request
            requestDate: new Date().toISOString().split('T')[0] // Current date
        };

        fetch('http://localhost:8080/product/request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productRequest)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                setShowSuccessAlert(true);
                setSelectedProductCode('');
                setQuantity('');
                setPurpose('');
                if (formRef.current) {
                    formRef.current.reset();
                }
            })
            .catch(error => {
                console.error('Error while submitting product request:', error);
                setShowErrorAlert(true);
            });
    };

    return (
        <div className="mt-5 d-flex justify-content-center">
            <div className="card p-5 shadow-lg" style={{ maxWidth: "900px", borderRadius: "10px" }}>
                <h1 id="product-request-title" className="text-center mb-5">Solicitud de Producto</h1>
                <form ref={formRef} onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="productSelect" className="form-label">
                            <i className="fas fa-box" id="icon-product-code"></i> Seleccione el Producto
                        </label>
                        <select
                            id="productSelect"
                            className="form-select border-primary"
                            value={selectedProductCode}
                            onChange={(e) => setSelectedProductCode(e.target.value)}
                            required
                        >
                            <option value="">Seleccione un producto</option>
                            {products.map(product => (
                                <option key={product.code} value={product.code}>
                                    {product.name} - {product.code}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="quantity" className="form-label">
                            <i className="fas fa-sort-numeric-up" id="icon-quantity"></i> Cantidad del Producto
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            className="form-control border-primary"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="purpose" className="form-label">
                            <i className="fas fa-file-alt" id="icon-purpose"></i> Propósito de la Solicitud
                        </label>
                        <textarea
                            id="purpose"
                            className="form-control border-primary"
                            value={purpose}
                            onChange={(e) => setPurpose(e.target.value)}
                            required
                        />
                    </div>

                    <Button type="submit" className="btn btn-primary w-100">Enviar Solicitud</Button>
                </form>

                {showSuccessAlert && <div className="alert alert-success mt-3">Solicitud de producto registrada exitosamente!</div>}
                {showErrorAlert && <div className="alert alert-danger mt-3">Error al registrar la solicitud!</div>}
            </div>
        </div>
    );
};

export default ProductRequest;
