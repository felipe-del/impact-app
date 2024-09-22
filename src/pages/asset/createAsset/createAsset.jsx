import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './createAsset.css';
import { API_URLS } from '../../../declarations/apiConfig';
import { usePage } from '../../../context/pageContext';

const CreateAsset = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [brands, setBrands] = useState([]);
    const [subcategories, setSubcategories] = useState([]); // Change to subcategories
    const [statuses, setStatuses] = useState([]);
    const [users, setUsers] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [assetModels, setAssetModels] = useState([]);

    const [purchaseDate, setPurchaseDate] = useState('');
    const [value, setValue] = useState('');
    const [supplier, setSupplier] = useState('');
    const [brand, setBrand] = useState('');
    const [subcategory, setSubcategory] = useState(''); // Change to subcategory
    const [responsible, setResponsible] = useState('');
    const [status, setStatus] = useState('');
    const [currency, setCurrency] = useState('');
    const [assetModel, setAssetModel] = useState('');
    const [assetSeries, setAssetSeries] = useState('');
    const [plateNumber, setPlateNumber] = useState('');

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
                // Fetch supplier data
                const supplierResponse = await fetch(API_URLS.SUPPLIER.GET_ALL, { method: 'GET', credentials: 'include' });
                if (!supplierResponse.ok) throw new Error('Network response was not ok for suppliers');
                const supplierData = await supplierResponse.json();
                console.log('Suppliers:', supplierData);
                setSuppliers(supplierData);

                // Fetch brand data
                const brandResponse = await fetch(API_URLS.BRAND.GET_ALL, { method: 'GET', credentials: 'include' });
                if (!brandResponse.ok) throw new Error('Network response was not ok for brands');
                const brandData = await brandResponse.json();
                console.log('Brands:', brandData);
                setBrands(brandData);

                // Fetch subcategory data
                try {
                    const subcategoryResponse = await fetch(API_URLS.ASSET.GET_ALL_SUBCATEGORY, { method: 'GET', credentials: 'include' }); // Change URL to fetch subcategories
                    if (!subcategoryResponse.ok) throw new Error('Network response was not ok for subcategories');
                    const subcategoryData = await subcategoryResponse.json();
                    console.log('Subcategories:', subcategoryData);
                    setSubcategories(subcategoryData); // Update state to use subcategories
                } catch (error) {
                    console.error('Error fetching subcategories:', error);
                }

                // Fetch status data
                const statusResponse = await fetch(API_URLS.ASSET.GET_ALL_STATUS, { method: 'GET', credentials: 'include' });
                if (!statusResponse.ok) throw new Error('Network response was not ok for statuses');
                const statusData = await statusResponse.json();
                console.log('Statuses:', statusData);
                setStatuses(statusData);

                // Fetch user data
                const userResponse = await fetch(API_URLS.USER.GET_ALL, { method: 'GET', credentials: 'include' });
                if (!userResponse.ok) throw new Error('Network response was not ok for users');
                const userData = await userResponse.json();
                console.log('Users:', userData);
                setUsers(userData);

                // Fetch currency data
                const currencyResponse = await fetch(API_URLS.ASSET.GET_ALL_CURRENCY, { method: 'GET', credentials: 'include' });
                if (!currencyResponse.ok) throw new Error('Network response was not ok for currencies');
                const currencyData = await currencyResponse.json();
                console.log('Currencies:', currencyData);
                setCurrencies(currencyData);

                // Fetch asset model data
                const assetModelResponse = await fetch(API_URLS.ASSET.GET_ALL_MODEL, { method: 'GET', credentials: 'include' });
                if (!assetModelResponse.ok) throw new Error('Network response was not ok for asset models');
                const assetModelData = await assetModelResponse.json();
                console.log('Asset Models:', assetModelData);
                setAssetModels(assetModelData);

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
            subcategoryId: parseInt(subcategory), // Change to subcategoryId
            responsibleId: parseInt(responsible),
            statusId: parseInt(status),
            currencyName: currency,
            assetModelName: assetModel,
            assetSeries,
            plateNumber,
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
                setSubcategory(''); // Reset subcategory
                setResponsible('');
                setStatus('');
                setCurrency('');
                setAssetModel('');
                setAssetSeries('');
                setPlateNumber('');
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
                        <div className="col-md-6 mb-3">
                            <label htmlFor="purchaseDate" id="label-purchase-date" className="form-label">
                                <i className="fas fa-calendar-alt" id="icon-purchase-date"></i> Fecha de Compra
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
                            <label htmlFor="value" id="label-value" className="form-label">
                                <i className="fas fa-money-bill" id="icon-value"></i> Valor
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
                            <label htmlFor="supplier" id="label-supplier" className="form-label">
                                <i className="fas fa-truck" id="icon-supplier"></i> Proveedor
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
                            <label htmlFor="brand" id="label-brand" className="form-label">
                                <i className="fas fa-tag" id="icon-brand"></i> Marca
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
                            <label htmlFor="subcategory" id="label-subcategory" className="form-label">
                                <i className="fas fa-folder" id="icon-subcategory"></i> Subcategoría
                            </label>
                            <select
                                id="subcategory"
                                className="form-select border-primary"
                                value={subcategory} // Change to subcategory
                                onChange={(e) => setSubcategory(e.target.value)} // Change to setSubcategory
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
                            <label htmlFor="responsible" id="label-responsible" className="form-label">
                                <i className="fas fa-user" id="icon-responsible"></i> Responsable
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
                            <label htmlFor="status" id="label-status" className="form-label">
                                <i className="fas fa-check-circle" id="icon-status"></i> Estado
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
                            <label htmlFor="currency" id="label-currency" className="form-label">
                                <i className="fas fa-money-bill-wave" id="icon-currency"></i> Moneda
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
                                    <option key={currency.id} value={currency.currencyName}>
                                        {currency.currencyName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="assetModel" id="label-asset-model" className="form-label">
                                <i className="fas fa-cogs" id="icon-asset-model"></i> Modelo de Activo
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
                                    <option key={model.id} value={model.modelName}>
                                        {model.modelName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="assetSeries" id="label-asset-series" className="form-label">
                                <i className="fas fa-hashtag" id="icon-asset-series"></i> Serie de Activo
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

                    <div className="mb-4">
                        <label htmlFor="plateNumber" id="label-plate-number" className="form-label">
                            <i className="fas fa-car" id="icon-plate-number"></i> Número de Placa
                        </label>
                        <input
                            type="text"
                            id="plateNumber"
                            className="form-control border-primary"
                            value={plateNumber}
                            onChange={(e) => setPlateNumber(e.target.value)}
                        />
                    </div>

                    <Button type="submit" className="btn btn-primary w-100">Registrar Activo</Button>
                </form>

                {showSuccessAlert && <div className="alert alert-success mt-3">Activo registrado exitosamente!</div>}
                {showErrorAlert && <div className="alert alert-danger mt-3">Error al registrar el activo!</div>}
            </div>
        </div>
    );
};

export default CreateAsset;
