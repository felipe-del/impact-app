import React, { useState, useEffect, useRef } from 'react';
import { Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap CSS
import './CreateAsset.css';

const CreateAsset = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [users, setUsers] = useState([]);
    const [purchaseDate, setPurchaseDate] = useState('');
    const [value, setValue] = useState('');
    const [supplier, setSupplier] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [responsible, setResponsible] = useState('');
    const [status, setStatus] = useState('');
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    const formRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const supplierResponse = await fetch('http://localhost:8080/supplier', { method: 'GET', credentials: 'include' });
                if (!supplierResponse.ok) throw new Error('Network response was not ok');
                const supplierData = await supplierResponse.json();
                setSuppliers(supplierData);
    
                const brandResponse = await fetch('http://localhost:8080/brand', { method: 'GET', credentials: 'include' });
                if (!brandResponse.ok) throw new Error('Network response was not ok');
                const brandData = await brandResponse.json();
                setBrands(brandData);
    
                const categoryResponse = await fetch('http://localhost:8080/asset/category', { method: 'GET', credentials: 'include' });
                if (!categoryResponse.ok) throw new Error('Network response was not ok');
                const categoryData = await categoryResponse.json();
                setCategories(categoryData);
    
                const statusResponse = await fetch('http://localhost:8080/asset/status', { method: 'GET', credentials: 'include' });
                if (!statusResponse.ok) throw new Error('Network response was not ok');
                const statusData = await statusResponse.json();
                setStatuses(statusData);
    
                const userResponse = await fetch('http://localhost:8080/user', { method: 'GET', credentials: 'include' });
                if (!userResponse.ok) throw new Error('Network response was not ok');
                const userData = await userResponse.json();
                setUsers(userData);
    
            } catch (error) {
                console.error('Fetch error:', error);
                setShowErrorAlert(true);
            }
        };
    
        fetchData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newAsset = {
            id: 0,
            purchaseDate,
            value: parseFloat(value), 
            supplierId: parseInt(supplier), 
            brandId: parseInt(brand), 
            categoryId: parseInt(category), 
            responsibleId: parseInt(responsible), 
            statusId: parseInt(status), 
            isDeleted: false
        };

        fetch('http://localhost:8080/asset', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newAsset)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                setShowSuccessAlert(true);
                setPurchaseDate('');
                setValue('');
                setSupplier('');
                setBrand('');
                setCategory('');
                setResponsible('');
                setStatus('');
                if (formRef.current) {
                    formRef.current.reset();
                }
            })
            .catch(error => {
                console.error('Error al guardar activo:', error);
                setShowErrorAlert(true);
            });
    };

    return (
        <div className="main-container">
            <div className="button-container">
                <h1>Registro de Activo</h1>
            </div>
            <div className="container2">
                <div className="container3">
                    <h3>Datos del Activo</h3><br />
                    <form ref={formRef} onSubmit={handleSubmit}>
                        <div className="form-group">
                            <div className="input-group">
                                <label htmlFor="purchaseDate">Fecha de Compra</label>
                                <input
                                    type="date"
                                    id="purchaseDate"
                                    value={purchaseDate}
                                    onChange={(e) => setPurchaseDate(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="value">Valor</label>
                                <input
                                    type="number"
                                    id="value"
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="input-group">
                                <label htmlFor="supplier">Proveedor</label>
                                <select
                                    id="supplier"
                                    value={supplier}
                                    onChange={(e) => setSupplier(e.target.value)}
                                    required
                                >
                                    <option value="">Seleccionar proveedor</option>
                                    {suppliers.map((supplier) => (
                                        <option key={supplier.id} value={supplier.id}>
                                            {supplier.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="input-group">
                                <label htmlFor="brand">Marca</label>
                                <select
                                    id="brand"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                    required
                                >
                                    <option value="">Seleccionar marca</option>
                                    {brands.map((brand) => (
                                        <option key={brand.id} value={brand.id}>
                                            {brand.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="input-group">
                                <label htmlFor="category">Categoría</label>
                                <select
                                    id="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                >
                                    <option value="">Seleccionar categoría</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="input-group">
                                <label htmlFor="responsible">Responsable</label>
                                <select
                                    id="responsible"
                                    value={responsible}
                                    onChange={(e) => setResponsible(e.target.value)}
                                    required
                                >
                                    <option value="">Seleccionar responsable</option>
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="input-group">
                                <label htmlFor="status">Estado</label>
                                <select
                                    id="status"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    required
                                >
                                    <option value="">Seleccionar estado</option>
                                    {statuses.map((status) => (
                                        <option key={status.id} value={status.id}>
                                            {status.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="button">
                            <button className="button-5" type="submit" role="button">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>

           {/* Success Alert */}
           {showSuccessAlert && (
                <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
                    El activo se ha guardado exitosamente.
                </Alert>
            )}

            {/* Error Alert */}
            {showErrorAlert && (
                <Alert variant="danger" onClose={() => setShowErrorAlert(false)} dismissible>
                   Se produjo un error al agregar el activo. Por favor inténtalo de nuevo.
                </Alert>
            )}
        </div>
    );
};

export default CreateAsset;
