import {useState, useRef, useEffect} from 'react';
import InputMask from 'react-input-mask';
import { NumericFormat } from 'react-number-format';
import '../../style/createPage.css'
import AssetBanner from "./AssetBanner.jsx";
import AssetStatusModal from "../../components/popUp/assetStatusModal/AssetStatusModal.jsx";
import {useQuery} from "@tanstack/react-query";
import {getAllAssetStatus} from "../../api/asset/assetStatus_API.js";
import SaveButton from "../../components/button/SaveButton.jsx";
import GenericModal from "../../components/popUp/generic/GenericModal.jsx";

const initialData = {
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
};

const CreateAsset = () => {

    const [formData, setFormData] = useState(initialData);

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const handleShowConfirmationModal = () => setShowConfirmationModal(true);
    const handleHideConfirmationModal = () => setShowConfirmationModal(false);

    const [suppliers, setSuppliers] = useState([]);
    const [brands, setBrands] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [users, setUsers] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [assetModels, setAssetModels] = useState([]);
    const [locationNumbers, setLocationNumbers] = useState([]);
    const [assetStatus, setAssetStatus] = useState([]);

    const [openStatesAssetModal, setOpenStatesAssetModal] = useState(false);

    const clearForm = () => {
        setFormData(initialData);
    }

    const handleOpenStatesAssetModal = () => setOpenStatesAssetModal(true);
    const handleCloseStatesAssetModal = () => setOpenStatesAssetModal(false);

    const formRef = useRef(null);

    const {data: assetStatusData} = useQuery({queryKey: ['assetStatus'], queryFn: getAllAssetStatus})

    useEffect(() => {
        if (assetStatusData) setAssetStatus(assetStatusData.data)
    }, [assetStatusData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

    };


    return (
        <>
        <AssetBanner
            title="Creación de Activo"
            visibleButtons={["goBack", "statusModal"]}
            handleOpen={handleOpenStatesAssetModal}
        />
        <div className="container-fluid p-0">
            <div className="card p-4 shadow-lg" style={{ maxWidth: "100%", borderRadius: "15px" }}>
                <form ref={formRef}>
                    <div className="row mb-4">
                        <div className="col-md-3 col-sm-6 col-12 mb-3">
                            <label htmlFor="plateNumber" className="form-label">
                                <i className="fas fa-id-badge"></i> Número de Placa
                            </label>
                            <InputMask
                                mask="***-***"
                                name="plateNumber"
                                id="plateNumber"
                                className="mask form-control border-primary"
                                value={formData.plateNumber}
                                onChange={handleChange}
                                placeholder="Ej: ABC-123"
                                style={{ fontSize: ".9rem" }}
                                required
                            />
                        </div>
                        <div className="col-md-3 col-sm-6 col-12 mb-3">
                            <label htmlFor="assetSeries" className="form-label">
                                <i className="fas fa-barcode"></i> Serie de Activo
                            </label>
                            <input
                                type="text"
                                name="assetSeries"
                                id="assetSeries"
                                className="form-control border-primary"
                                value={formData.assetSeries}
                                onChange={handleChange}
                                placeholder="Ej: A123"
                                style={{ fontSize: ".9rem" }}
                                required
                            />
                        </div>
                        <div className="col-md-3 col-sm-6 col-12 mb-3">
                            <label htmlFor="value" className="form-label">
                                <i className="fas fa-dollar-sign"></i> Valor
                            </label>
                            <NumericFormat
                                name="value"
                                id="value"
                                className="form-control border-primary"
                                value={formData.value}
                                style={{ fontSize: ".9rem" }}
                                onValueChange={(values) => {
                                    const { floatValue } = values;
                                    handleChange({
                                        target: {
                                            name: 'value',
                                            value: floatValue || '',
                                        },
                                    });
                                }}
                                thousandSeparator={true}
                                decimalScale={2}
                                fixedDecimalScale={true}
                                allowNegative={false}
                                placeholder="Ej: 5000"
                                isNumericString={true}
                            />
                        </div>
                        <div className="col-md-3 col-sm-6 col-12 mb-3">
                            <label htmlFor="purchaseDate" className="form-label">
                                <i className="fas fa-calendar-alt"></i> Fecha de Compra
                            </label>
                            <input
                                type="date"
                                name="purchaseDate"
                                id="purchaseDate"
                                className="form-control border-primary"
                                value={formData.purchaseDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-md-3 col-sm-6 col-12 mb-3">
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
                        <div className="col-md-3 col-sm-6 col-12 mb-3">
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
                        <div className="col-md-3 col-sm-6 col-12 mb-3">
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
                        <div className="col-md-3 col-sm-6 col-12 mb-3">
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
                    </div>
                    <div className="row mb-4">
                        <div className="col-md-3 col-sm-6 col-12 mb-3">
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
                        <div className="col-md-3 col-sm-6 col-12 mb-3">
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
                        <div className="col-md-3 col-sm-6 col-12 mb-3">
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
                        <div className="col-md-3 col-sm-6 col-12 mb-3">
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

                    <div className="d-flex justify-content-end mb-0">
                        <SaveButton acceptAction={handleShowConfirmationModal} labelAccept="Guardar" />
                    </div>
                </form>
            </div>
        </div>
            <GenericModal
                show={showConfirmationModal}
                onHide={handleHideConfirmationModal}
                title="¿Desear guardar el activo?"
                bodyText="Si guarda el activo se podrá solicitar posteriormente por otro usuario."
                onButtonClick={handleSubmit}
            />
            <AssetStatusModal  open={openStatesAssetModal} onClose={handleCloseStatesAssetModal} assetStatuses={assetStatus} />
        </>
    );
};

export default CreateAsset;