import { useState, useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './createAsset.css';
import { API_URLS } from '../../../declarations/apiConfig';
import { usePage } from '../../../context/pageContext';

const CreateAsset = () => {
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

    useEffect(() => {
        setPageName("Agregar Activo"); 
    }, [setPageName]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const supplierResponse = await fetch(API_URLS.SUPPLIER.GET_ALL, { method: 'GET', credentials: 'include' });
                if (!supplierResponse.ok) throw new Error('Network response was not ok for suppliers');
                const supplierData = await supplierResponse.json();
                setSuppliers(supplierData);

                const brandResponse = await fetch(API_URLS.BRAND.GET_ALL, { method: 'GET', credentials: 'include' });
                if (!brandResponse.ok) throw new Error('Network response was not ok for brands');
                const brandData = await brandResponse.json();
                setBrands(brandData);

                const subcategoryResponse = await fetch(API_URLS.ASSET.GET_ALL_SUBCATEGORY, { method: 'GET', credentials: 'include' });
                if (!subcategoryResponse.ok) throw new Error('Network response was not ok for subcategories');
                const subcategoryData = await subcategoryResponse.json();
                setSubcategories(subcategoryData);

                const statusResponse = await fetch(API_URLS.ASSET.GET_ALL_STATUS, { method: 'GET', credentials: 'include' });
                if (!statusResponse.ok) throw new Error('Network response was not ok for statuses');
                const statusData = await statusResponse.json();
                setStatuses(statusData);

                const userResponse = await fetch(API_URLS.USER.GET_ALL, { method: 'GET', credentials: 'include' });
                if (!userResponse.ok) throw new Error('Network response was not ok for users');
                const userData = await userResponse.json();
                setUsers(userData);

                const currencyResponse = await fetch(API_URLS.ASSET.GET_ALL_CURRENCY, { method: 'GET', credentials: 'include' });
                if (!currencyResponse.ok) throw new Error('Network response was not ok for currencies');
                const currencyData = await currencyResponse.json();
                setCurrencies(currencyData);

                const assetModelResponse = await fetch(API_URLS.ASSET.GET_ALL_MODEL, { method: 'GET', credentials: 'include' });
                if (!assetModelResponse.ok) throw new Error('Network response was not ok for asset models');
                const assetModelData = await assetModelResponse.json();
                setAssetModels(assetModelData);

                const locationNumberResponse = await fetch(API_URLS.ASSET.GET_ALL_LOCATION_NUMBER, { method: 'GET', credentials: 'include' });
                if (!locationNumberResponse.ok) throw new Error('Network response was not ok for location numbers');
                const locationNumberData = await locationNumberResponse.json();
                setLocationNumbers(locationNumberData);

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
            subcategoryId: parseInt(subcategory),
            responsibleId: parseInt(responsible),
            statusId: parseInt(status),
            currencyId: parseInt(currency),
            assetModelId: parseInt(assetModel),
            assetSeries,
            plateNumber,
            locationNumber: parseInt(locationNumber),
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
            setSubcategory('');
            setResponsible('');
            setStatus('');
            setCurrency('');
            setAssetModel('');
            setAssetSeries('');
            setPlateNumber('');
            setLocationNumber('');
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
                <h1 id="registro-activo-title" className="text-center mb-5">Registro de Activo</h1>
    
                <h3 id="datos-activo-title" className="text-center mb-4">Datos del Activo</h3>
                <form ref={formRef} onSubmit={handleSubmit}>
                    <div className="row mb-4">
                        <div className="col-md-4 mb-3">
                            <label htmlFor="plateNumber" className="form-label">
                                <i className="fas fa-id-badge"></i> Número de Placa
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
                        <div className="col-md-4 mb-3">
                            <label htmlFor="assetSeries" className="form-label">
                                <i className="fas fa-barcode"></i> Serie de Activo
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
                        <div className="col-md-4 mb-3">
                            <label htmlFor="assetModel" className="form-label">
                                <i className="fas fa-laptop"></i> Modelo del Activo
                            </label>
                            <select
                                id="assetModel"
                                className="form-select border-primary"
                                value={assetModel}
                                onChange={(e) => setAssetModel(e.target.value)}
                                required
                            >
                                <option value="">Seleccionar modelo del activo</option>
                                {assetModels.map((model) => (
                                    <option key={model.id} value={model.id}>
                                        {model.modelName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
    
                    <div className="row mb-4">
                        <div className="col-md-4 mb-3">
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
                        <div className="col-md-4 mb-3">
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
                        <div className="col-md-4 mb-3">
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
                        <div className="col-md-4 mb-3">
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
                                <option value="">Seleccionar número de localización</option>
                                {locationNumbers.map((location) => (
                                    <option key={location.id} value={location.id}>
                                        {location.locationNumber}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="status" className="form-label">
                                <i className="fas fa-tasks"></i> Estado
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
    
                    <h3 id="datos-compra-title" className="text-center mb-4">Datos de la Compra de Activo</h3>
                    <div className="row mb-4">
                        <div className="col-md-4 mb-3">
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
                        <div className="col-md-4 mb-3">
                            <label htmlFor="value" className="form-label">
                                <i className="fas fa-money-bill"></i> Valor
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
                        <div className="col-md-4 mb-3">
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
                    </div>
    
                    <div className="row mb-4">
                        <div className="col-md-4 mb-3">
                            <label htmlFor="currency" className="form-label">
                                <i className="fas fa-coins"></i> Moneda
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
                                    <option key={currency.id} value={currency.id}>
                                        {currency.currencyName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
    
                    <div className="text-center">
                        <Button type="submit" className="btn btn-primary">Guardar Activo</Button>
                    </div>
                </form>
    
                {showSuccessAlert && (
                    <div className="alert alert-success mt-3">
                        Activo guardado exitosamente.
                    </div>
                )}
                {showErrorAlert && (
                    <div className="alert alert-danger mt-3">
                        Hubo un error al guardar el activo. Inténtelo de nuevo.
                    </div>
                )}
            </div>
        </div>
    );    

};

export default CreateAsset;

