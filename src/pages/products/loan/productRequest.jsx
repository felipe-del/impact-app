import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { usePage } from '../../../context/pageContext';

const ProductRequest = () => {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [purpose, setPurpose] = useState('');
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [filteredCategories, setFilteredCategories] = useState([]); 
    const [availableQuantity, setAvailableQuantity] = useState(0);
    const formRef = useRef(null);
    const { setPageName } = usePage();

    useEffect(() => {
        setPageName("Solicitud de Productos");
    }, [setPageName]);

    const userId = sessionStorage.getItem('userId'); 

    useEffect(() => {
        fetch(`http://localhost:8080/product/all`, {
            method: 'GET',
            include: 'credentials',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setProducts(data);
            console.log(data);

            const categoryCount = {};
            data.forEach(product => {
                if (product.status.id === 1) { 
                    if (!categoryCount[product.category.name]) {
                        categoryCount[product.category.name] = 0;
                    }
                    categoryCount[product.category.name]++;
                }
            });

            const availableCategories = Object.keys(categoryCount).filter(category => categoryCount[category] > 0);
            setFilteredCategories(availableCategories);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            setShowErrorAlert(true);
        });
    }, []);

    useEffect(() => {
        const countAvailableProducts = products.filter(product => 
            product.category.name === selectedCategory && product.status.id === 1
        ).length;

        setAvailableQuantity(countAvailableProducts);
    }, [selectedCategory, products]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedCategory || !purpose) {
            setShowErrorAlert(true);
            return;
        }

        if (availableQuantity === 0) {
            setShowErrorAlert(true);
            return;
        }

        // Filtrar solo un producto disponible de la categoría seleccionada
        const selectedProduct = products
    .filter(product => product.category.name === selectedCategory && product.status.id === 1)
    .slice(0, 1)[0]?.id; // Obtener el ID del primer producto disponible


        const productRequest = {
            categoryName: selectedCategory,  
            productId: selectedProduct,
            reason: purpose,               
            userId: 1,                        
            requestDate: new Date().toISOString().split('T')[0] 
        };
        console.log(productRequest);

        fetch('http://localhost:8080/product/request', {
            method: 'POST',
            include: 'credentials',
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
            setSelectedCategory('');
            setPurpose('');
            setAvailableQuantity(0);
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
                        <label htmlFor="categorySelect" className="form-label">
                            <i className="fas fa-box" id="icon-category"></i> Seleccione la Categoría
                        </label>
                        <select
                            id="categorySelect"
                            className="form-select border-primary"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            required
                        >
                            <option value="">Seleccione una categoría</option>
                            {filteredCategories.map((category) => (
                                <option key={category} value={category.id}>
                                    {category}
                                </option>
                            ))}
                        </select>
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
