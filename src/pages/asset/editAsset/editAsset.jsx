import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom'; 
import { Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './editAsset.css';
import { Link } from 'react-router-dom';
import { API_URLS } from '../../../declarations/apiConfig';
import { usePage } from '../../../context/pageContext';

const EditAsset = () => {
    const { id } = useParams();
    const [suppliers, setSuppliers] = useState([]);
    const [brands, setBrands] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [users, setUsers] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [assetModels, setAssetModels] = useState([]);
    const [locationNumbers, setLocationNumbers] = useState([]);

    const [purchaseDate, setPurchaseDate] = useState('');
    const [value, setValue] = useState('');
    const [supplier, setSupplier] = useState('');
    const [brand, setBrand] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [responsible, setResponsible] = useState('');
    const [status, setStatus] = useState('');
    const [currency, setCurrency] = useState('');
    const [assetModel, setAssetModel] = useState('');
    const [assetSeries, setAssetSeries] = useState('');
    const [plateNumber, setPlateNumber] = useState('');
    const [locationNumber, setLocationNumber] = useState('');

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    const formRef = useRef(null);
    const { setPageName } = usePage();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setPageName("Editar Activo");
        console.log('ID:',id);
    }, [setPageName]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch asset data
                setIsLoading(true);
                const assetResponse = await fetch(`http://localhost:8080/asset/${id}`, { method: 'GET', credentials: 'include' });
                if (!assetResponse.ok) throw new Error('Network response was not ok for asset');
                const assetData = await assetResponse.json();
                console.log("Asset data:", assetData);

                // Set asset fields with fetched data
                setPurchaseDate(assetData.purchaseDate);
                setValue(assetData.value);
                setSupplier(assetData.supplierId);
                setBrand(assetData.brandId);
                setSubcategory(assetData.subcategoryId);
                setResponsible(assetData.responsibleId);
                setStatus(assetData.statusId);
                setCurrency(assetData.currencyId);
                setAssetModel(assetData.assetModelId);
                setAssetSeries(assetData.assetSeries);
                setPlateNumber(assetData.plateNumber);
                setLocationNumber(assetData.locationNumber);

                // Fetch all other dropdown data (similar to create logic)
                const supplierData = await (await fetch(API_URLS.SUPPLIER.GET_ALL, { method: 'GET', credentials: 'include' })).json();
                setSuppliers(supplierData);

                const brandData = await (await fetch(API_URLS.BRAND.GET_ALL, { method: 'GET', credentials: 'include' })).json();
                setBrands(brandData);

                const subcategoryData = await (await fetch(API_URLS.ASSET.GET_ALL_SUBCATEGORY, { method: 'GET', credentials: 'include' })).json();
                console.log("Subcategory data:", subcategoryData);
                setSubcategories(subcategoryData);

                const statusData = await (await fetch(API_URLS.ASSET.GET_ALL_STATUS, { method: 'GET', credentials: 'include' })).json();
                setStatuses(statusData);

                const userData = await (await fetch(API_URLS.USER.GET_ALL, { method: 'GET', credentials: 'include' })).json();
                setUsers(userData);

                const currencyData = await (await fetch(API_URLS.ASSET.GET_ALL_CURRENCY, { method: 'GET', credentials: 'include' })).json();
                setCurrencies(currencyData);

                const assetModelData = await (await fetch(API_URLS.ASSET.GET_ALL_MODEL, { method: 'GET', credentials: 'include' })).json();
                setAssetModels(assetModelData);

                const locationNumberData = await (await fetch(API_URLS.ASSET.GET_ALL_LOCATION_NUMBER, { method: 'GET', credentials: 'include' })).json();
                setLocationNumbers(locationNumberData);
            } catch (error) {
                console.error('Fetch error:', error);
                setIsLoading(false);
                setShowErrorAlert(true);
            }
        };

        fetchData();
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedAsset = {
            id, // existing asset ID
            purchaseDate,
            value: parseFloat(value),
            supplierId: parseInt(supplier),
            brandId: parseInt(brand),
            subcategoryId: parseInt(subcategory),
            responsibleId: parseInt(responsible),
            statusId: parseInt(status),
            currencyId: parseInt(currency),
            assetModelId: parseInt(assetModel),
            assetSeries,
            plateNumber,
            locationNumber: parseInt(locationNumber),
            isDeleted: false,
        };

        fetch(`http://localhost:8080/asset/edit/${id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedAsset)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    console.error('Error updating asset:', errorData);
                    throw new Error('Network response was not ok');
                });
            }
            setShowSuccessAlert(true);
        })
        .catch(error => {
            console.error('Error updating asset:', error);
            setShowErrorAlert(true);
        });
    };

    return (
        <div className="mt-5 d-flex justify-content-center">
    <div className="card p-5 shadow-lg" style={{ maxWidth: "900px", borderRadius: "10px" }}>
        <h1 id="editar-activo-title" className="text-center mb-5">Editar Activo</h1>

        <h3 id="datos-activo-title" className="text-center mb-4">Datos del Activo</h3>
        <form ref={formRef} onSubmit={handleSubmit}>
            <div className="row mb-4">
                <div className="col-md-6 mb-3">
                    <label htmlFor="purchaseDate" className="form-label">
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
                    <label htmlFor="value" className="form-label">
                        <i className="fas fa-money-bill"></i> Valor
                    </label>
                    <input
                        type="number"
                        id="value"
                        min={0.01}  // O el valor mínimo decimal que desees
                        step="0.01"  // Permite pasos decimales
                        className="form-control border-primary"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        required
                    />
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-md-6 mb-3">
                    <label htmlFor="supplier" className="form-label">
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
                    <label htmlFor="brand" className="form-label">
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
            </div>

            <div className="row mb-4">
                <div className="col-md-6 mb-3">
                    <label htmlFor="subcategory" className="form-label">
                        <i className="fas fa-list-alt"></i> Subcategoría
                    </label>
                    <select
                        id="subcategory"
                        className="form-select border-primary"
                        value={subcategory}
                        onChange={(e) => setSubcategory(e.target.value)}
                        required
                    >
                        <option value="">Seleccionar subcategoría</option>
                        {subcategories.map((subcategory) => (
                            <option key={subcategory.id} value={subcategory.id}>
                                {subcategory.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="responsible" className="form-label">
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
            </div>

            <div className="row mb-4">
                <div className="col-md-6 mb-3">
                    <label htmlFor="status" className="form-label">
                        <i className="fas fa-info-circle"></i> Estado
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
                <div className="col-md-6 mb-3">
                    <label htmlFor="currency" className="form-label">
                        <i className="fas fa-dollar-sign"></i> Moneda
                    </label>
                    <select
                        id="currency"
                        className="form-select border-primary"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        required
                    >
                        <option value="">Seleccionar moneda</option>
                        {currencies.map((currency) => (
                            <option key={currency.name} value={currency.id}>
                                {currency.currencyName}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-md-6 mb-3">
                    <label htmlFor="assetModel" className="form-label">
                        <i className="fas fa-box"></i> Modelo de Activo
                    </label>
                    <select
                        id="assetModel"
                        className="form-select border-primary"
                        value={assetModel}
                        onChange={(e) => setAssetModel(e.target.value)}
                        required
                    >
                        <option value="">Seleccionar modelo</option>
                        {assetModels.map((model) => (
                            <option key={model.modelName} value={model.id}>
                                {model.modelName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="assetSeries" className="form-label">
                        <i className="fas fa-barcode"></i> Serie del Activo
                    </label>
                    <input
                        type="text"
                        id="assetSeries"
                        className="form-control border-primary"
                        value={assetSeries}
                        onChange={(e) => setAssetSeries(e.target.value)}
                        required
                    />
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-md-6 mb-3">
                    <label htmlFor="plateNumber" className="form-label">
                        <i className="fas fa-hashtag"></i> Número de Placa
                    </label>
                    <input
                        type="text"
                        id="plateNumber"
                        className="form-control border-primary"
                        value={plateNumber}
                        onChange={(e) => setPlateNumber(e.target.value)}
                        required
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="locationNumber" className="form-label">
                        <i className="fas fa-map-marker-alt"></i> Número de Localización
                    </label>
                    <select
                        id="locationNumber"
                        className="form-select border-primary"
                        value={locationNumber}
                        onChange={(e) => setLocationNumber(e.target.value)}
                        required
                    >
                        <option value="">Seleccionar localización</option>
                        {locationNumbers.map((location) => (
                            <option key={location.id} value={location.id}>
                                {location.locationType + ' : ' + location.locationNumber}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <Button variant="primary" type="submit" className="me-2">
                Actualizar Activo
            </Button>
            <Link to="/app/assetList" className="btn btn-primary ms-2">
                Regresar
            </Link>
            {showSuccessAlert && <div className="alert alert-success mt-3">Activo actualizado exitosamente</div>}
            {showErrorAlert && <div className="alert alert-danger mt-3">Hubo un error al actualizar el activo</div>}
        </form>
    </div>
</div>

    );
};

export default EditAsset;

