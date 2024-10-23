import { useState, useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './createAsset.css';
import { API_URLS } from '../../../declarations/apiConfig';
import { usePage } from '../../../context/pageContext';
import InputMask from 'react-input-mask';
import { NumericFormat } from 'react-number-format';


const CreateAsset = () => {
    const [formData, setFormData] = useState({
        purchaseDate: '',
        value: '',
        supplier: '',
        brand: '',
        subcategory: '',
        responsible: '',
        status: '',
        currency: '',
        assetModel: '',
        assetSeries: '',
        plateNumber: '',
        locationNumber: '',
    });

    const [suppliers, setSuppliers] = useState([]);
    const [brands, setBrands] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [users, setUsers] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [assetModels, setAssetModels] = useState([]);
    const [locationNumbers, setLocationNumbers] = useState([]);
    
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
                const responses = await Promise.all([
                    fetch(API_URLS.SUPPLIER.GET_ALL, { method: 'GET', credentials: 'include' }),
                    fetch(API_URLS.BRAND.GET_ALL, { method: 'GET', credentials: 'include' }),
                    fetch(API_URLS.ASSET.GET_ALL_SUBCATEGORY, { method: 'GET', credentials: 'include' }),
                    fetch(API_URLS.ASSET.GET_ALL_STATUS, { method: 'GET', credentials: 'include' }),
                    fetch(API_URLS.USER.GET_ALL, { method: 'GET', credentials: 'include' }),
                    fetch(API_URLS.ASSET.GET_ALL_CURRENCY, { method: 'GET', credentials: 'include' }),
                    fetch(API_URLS.ASSET.GET_ALL_MODEL, { method: 'GET', credentials: 'include' }),
                    fetch(API_URLS.ASSET.GET_ALL_LOCATION_NUMBER, { method: 'GET', credentials: 'include' }),
                ]);

                const data = await Promise.all(responses.map(res => {
                    if (!res.ok) throw new Error('Network response was not ok');
                    return res.json();
                }));

                setSuppliers(data[0]);
                setBrands(data[1]);
                setSubcategories(data[2]);
                setStatuses(data[3]);
                setUsers(data[4]);
                setCurrencies(data[5]);
                setAssetModels(data[6]);
                setLocationNumbers(data[7]);
            } catch (error) {
                console.error('Fetch error:', error);
                setShowErrorAlert(true);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newAsset = {
            id: 0,
            ...formData,
            value: parseFloat(formData.value),
            supplierId: parseInt(formData.supplier),
            brandId: parseInt(formData.brand),
            subcategoryId: parseInt(formData.subcategory),
            responsibleId: parseInt(formData.responsible),
            statusId: parseInt(formData.status),
            currencyId: parseInt(formData.currency),
            assetModelId: parseInt(formData.assetModel),
            locationNumber: parseInt(formData.locationNumber),
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
                if (!response.ok) throw new Error('Network response was not ok');
                setShowSuccessAlert(true);
                setFormData({
                    purchaseDate: '',
                    value: '',
                    supplier: '',
                    brand: '',
                    subcategory: '',
                    responsible: '',
                    status: '',
                    currency: '',
                    assetModel: '',
                    assetSeries: '',
                    plateNumber: '',
                    locationNumber: '',
                });
                if (formRef.current) {
                    formRef.current.reset();
                }
            })
            .catch(error => {
                console.error('Error saving asset:', error);
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
                            <InputMask
                                mask="***-***" // Adjust the mask as needed
                                name="plateNumber"
                                id="plateNumber"
                                className="form-control border-primary"
                                value={formData.plateNumber}
                                onChange={handleChange}
                                placeholder="Ej: ABC-123"
                                required
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="assetSeries" className="form-label">
                                <i className="fas fa-barcode"></i> Serie de Activo
                            </label>
                            <input
                                type="text" // Use text input for asset series
                                name="assetSeries"
                                id="assetSeries"
                                className="form-control border-primary"
                                value={formData.assetSeries}
                                onChange={handleChange}
                                placeholder="Ej: A123"
                                required
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="assetModel" className="form-label">
                                <i className="fas fa-laptop"></i> Modelo del Activo
                            </label>
                            <select
                                name="assetModel"
                                id="assetModel"
                                className="form-select border-primary"
                                value={formData.assetModel}
                                onChange={handleChange}
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
                                name="brand"
                                id="brand"
                                className="form-select border-primary"
                                value={formData.brand}
                                onChange={handleChange}
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
                                name="subcategory"
                                id="subcategory"
                                className="form-select border-primary"
                                value={formData.subcategory}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Seleccionar subcategoría</option>
                                {subcategories.map((subcategory) => (
                                    <option key={subcategory.id} value={subcategory.id}>
                                        {subcategory.name} - {subcategory.description}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="responsible" className="form-label">
                                <i className="fas fa-user"></i> Responsable
                            </label>
                            <select
                                name="responsible"
                                id="responsible"
                                className="form-select border-primary"
                                value={formData.responsible}
                                onChange={handleChange}
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
                            <label htmlFor="supplier" className="form-label">
                                <i className="fas fa-store"></i> Proveedor
                            </label>
                            <select
                                name="supplier"
                                id="supplier"
                                className="form-select border-primary"
                                value={formData.supplier}
                                onChange={handleChange}
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
                        <div className="col-md-4 mb-3">
                            <label htmlFor="purchaseDate" className="form-label">
                                <i className="fas fa-calendar-alt"></i> Fecha de Compra
                            </label>
                            <input
                                type="date"
                                name="purchaseDate" // Ensure name is set
                                id="purchaseDate"
                                className="form-control border-primary"
                                value={formData.purchaseDate} // This binds the state to the input
                                onChange={handleChange} // Ensure this updates the state
                                required
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="value" className="form-label">
                                <i className="fas fa-dollar-sign"></i> Valor
                            </label>
                            <NumericFormat
                                name="value"
                                id="value"
                                className="form-control border-primary"
                                value={formData.value}
                                onValueChange={(values) => {
                                    const { floatValue } = values; // Extract raw numeric value
                                    handleChange({
                                        target: {
                                            name: 'value',
                                            value: floatValue || '', // Send raw value or empty if cleared
                                        },
                                    });
                                }}
                                thousandSeparator={true} // Adds comma as thousand separator
                                decimalScale={2} // Sets decimal scale to 2 digits
                                fixedDecimalScale={true} // Ensures the number has 2 decimal places
                                allowNegative={false} // Prevents negative numbers
                                placeholder="Ej: 5000"
                                isNumericString={true} // Keeps the value as a numeric string
                            />
                        </div>

                    </div>

                    <div className="row mb-4">
                        <div className="col-md-4 mb-3">
                            <label htmlFor="currency" className="form-label">
                                <i className="fas fa-money-bill-wave"></i> Moneda
                            </label>
                            <select
                                name="currency"
                                id="currency"
                                className="form-select border-primary"
                                value={formData.currency}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Seleccionar moneda</option>
                                {currencies.map((currency) => (
                                    <option key={currency.id} value={currency.id}>
                                        {currency.currencyName} - {currency.code}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="status" className="form-label">
                                <i className="fas fa-exclamation-circle"></i> Estado
                            </label>
                            <select
                                name="status"
                                id="status"
                                className="form-select border-primary"
                                value={formData.status}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Seleccionar estado</option>
                                {statuses.map((status) => (
                                    <option key={status.id} value={status.id}>
                                        {status.name} - {status.description}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="locationNumber" className="form-label">
                                <i className="fas fa-map-marker-alt"></i> Número de Ubicación
                            </label>
                            <select
                                name="locationNumber"
                                id="locationNumber"
                                className="form-select border-primary"
                                value={formData.locationNumber}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Seleccionar número de ubicación</option>
                                {locationNumbers.map((location) => (
                                    <option key={location.id} value={location.id}>
                                        {location.locationType} - {location.locationNumber}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="text-center mb-4">
                        <Button type="submit" className="btn btn-primary">Registrar Activo</Button>
                    </div>

                    {showSuccessAlert && (
                        <div className="alert alert-success" role="alert">
                            Activo registrado con éxito!
                        </div>
                    )}

                    {showErrorAlert && (
                        <div className="alert alert-danger" role="alert">
                            Error al registrar el activo. Por favor, intente nuevamente.
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default CreateAsset;
