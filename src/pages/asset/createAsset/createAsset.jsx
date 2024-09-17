import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap CSS


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
    <div className="mt-5 d-flex justify-content-center">
        <div className="card p-5 shadow-lg" style={{ maxWidth: "900px", borderRadius: "10px" }}>
            <h1 className="text-center text-primary mb-5">Registro de Activo</h1>

            <h3 className="text-center text-primary mb-4">Datos del Activo</h3>
            <form ref={formRef} onSubmit={handleSubmit}>
                <div className="row mb-4">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="purchaseDate" className="form-label text-primary">
                            <i className="fas fa-calendar-alt"></i> Fecha de Compra
                        </label>
                        <input
                            type="date"
                            id="purchaseDate"
                            className="form-control border-primary"
                            value={purchaseDate}
                            onChange={(e) => setPurchaseDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="value" className="form-label text-primary">
                            <i className="fas fa-dollar-sign"></i> Valor
                        </label>
                        <input
                            type="number"
                            id="value"
                            min={1}
                            className="form-control border-primary"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="supplier" className="form-label text-primary">
                            <i className="fas fa-truck"></i> Proveedor
                        </label>
                        <select
                            id="supplier"
                            className="form-select border-primary"
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
                    <div className="col-md-6 mb-3">
                        <label htmlFor="brand" className="form-label text-primary">
                            <i className="fas fa-tag"></i> Marca
                        </label>
                        <select
                            id="brand"
                            className="form-select border-primary"
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
                    <div className="col-md-6 mb-3">
                        <label htmlFor="category" className="form-label text-primary">
                            <i className="fas fa-list"></i> Categoría
                        </label>
                        <select
                            id="category"
                            className="form-select border-primary"
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
                    <div className="col-md-6 mb-3">
                        <label htmlFor="responsible" className="form-label text-primary">
                            <i className="fas fa-user"></i> Responsable
                        </label>
                        <select
                            id="responsible"
                            className="form-select border-primary"
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
                    <div className="col-md-6 mb-3">
                        <label htmlFor="status" className="form-label text-primary">
                            <i className="fas fa-exclamation-triangle"></i> Estado
                        </label>
                        <select
                            id="status"
                            className="form-select border-primary"
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

                <div className="text-center">
                    <Button className="btn btn-lg btn-primary w-100 shadow-sm" type="submit">
                        <i className="fas fa-save"></i> Guardar
                    </Button>
                </div>
            </form>

            {/* Success Alert */}
            {showSuccessAlert && (
                <div className="alert alert-success mt-4 text-center" role="alert">
                    El activo se ha guardado exitosamente.
                </div>
            )}

            {/* Error Alert */}
            {showErrorAlert && (
                <div className="alert alert-danger mt-4 text-center" role="alert">
                    Hubo un problema al guardar el activo. Por favor, intente nuevamente.
                </div>
            )}
        </div>
    </div>
);

};

export default CreateAsset;
