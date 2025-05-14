/**
 * AssetForm Component
 * 
 * This component renders a form for adding or editing asset information.
 * It includes fields for asset details such as plate number, series, value, purchase date, etc.
 * It validates the input and handles the submission of the form.
 * On successful submission, it triggers a confirmation modal.
 */
import InputMask from "react-input-mask";
import {NumericFormat} from "react-number-format";
import SaveButton from "../button/SaveButton.jsx";
import PropTypes from "prop-types";
import {useEffect, useRef, useState} from "react";
import useAssetData from "../../hooks/apiData/assetData/useAssetData.jsx";
import GenericModal from "../popUp/generic/GenericModal.jsx";

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


/**
 * AssetForm component that displays a form for adding or editing asset information.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.formData - The initial form data.
 * @param {function} props.onChange - Function to handle form data changes.
 * @param {function} props.onSubmit - Function to handle form submission.
 * @returns {JSX.Element} The rendered AssetForm component.
 */
const AssetForm = ({ formData = initialData, onChange, onSubmit }) => {

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const handleShowConfirmationModal = () => setShowConfirmationModal(true);
    const handleHideConfirmationModal = () => setShowConfirmationModal(false);

    /**
     * Handles the change event for form inputs.
     * @param {Object} event - The event object.
     * @returns {void}
     */
    const handleChange = (event) => {
        const { name, value } = event.target;
        onChange({ ...formData, [name]: value });
    };

    const formRef = useRef(null)

    const assetData = useAssetData()

    useEffect(() => {
        console.log(assetData)
    }, []);

    /**
     * Handles the error checking for form inputs.
     * @returns {void}
     */
    const checkErrors = () => {
        const errors = {};
        setFormErrors(errors);

        if (!formData.plateNumber) errors.plateNumber = "El número de placa es obligatorio.";
        if (!formData.assetSeries) errors.assetSeries = "La serie del activo es obligatoria.";
        if (!formData.value || formData.value <= 0) errors.value = "El valor debe ser mayor a 0.";
        if (!formData.purchaseDate) errors.purchaseDate = "La fecha de compra es obligatoria.";
        if (!formData.subcategory) errors.subcategory = "Debe seleccionar una subcategoría.";
        if (!formData.responsible) errors.responsible = "Debe seleccionar un responsable.";
        if (!formData.supplier) errors.supplier = "Debe seleccionar un proveedor.";
        if (!formData.brand) errors.brand = "Debe seleccionar una marca.";
        if (!formData.assetModel) errors.assetModel = "Debe seleccionar un modelo de activo.";
        if (!formData.currency) errors.currency = "Debe seleccionar una moneda.";
        if (!formData.status) errors.status = "Debe seleccionar un estado.";
        if (!formData.locationNumber) errors.locationNumber = "Debe seleccionar un número de ubicación.";

        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            handleShowConfirmationModal();
        }
    }

    /**
     * Handles the submission of the form.
     * @param {Object} event - The event object.
     * @returns {void}
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        checkErrors();
    }

    const [formErrors, setFormErrors] = useState({});

    return (
        <div className="container-fluid p-0">
            <div className="card p-4 shadow-lg" style={{ maxWidth: "100%", borderRadius: "15px" }}>
                <form ref={formRef}>
                    <div className="row mb-4">
                        <div className="col-md-3 col-sm-6 col-12 mb-3">
                            <label htmlFor="plateNumber" className="form-label">
                                <i className="fas fa-id-badge"></i> Número de Placa <span className="text-danger">*</span>
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
                            {formErrors.plateNumber && <div className="input-text-error show">{formErrors.plateNumber}</div>}
                        </div>
                        <div className="col-md-3 col-sm-6 col-12 mb-3">
                            <label htmlFor="assetSeries" className="form-label">
                                <i className="fas fa-barcode"></i> Serie de Activo <span className="text-danger">*</span>
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
                            {formErrors.assetSeries && <div className="input-text-error show">{formErrors.assetSeries}</div>}
                        </div>
                        <div className="col-md-3 col-sm-6 col-12 mb-3">
                            <label htmlFor="value" className="form-label">
                                <i className="fas fa-dollar-sign"></i> Valor <span className="text-danger">*</span>
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
                            {formErrors.value && <div className="input-text-error show">{formErrors.value}</div>}
                        </div>
                        <div className="col-md-3 col-sm-6 col-12 mb-3">
                            <label htmlFor="purchaseDate" className="form-label">
                                <i className="fas fa-calendar-alt"></i> Fecha de Compra <span className="text-danger">*</span>
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
                            {formErrors.purchaseDate && <div className="input-text-error show">{formErrors.purchaseDate}</div>}
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-md-3 col-sm-6 col-12 mb-3">
                            <label htmlFor="subcategory" className="form-label">
                                <i className="fas fa-list-alt"></i> Subcategoría <span className="text-danger">*</span>
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
                                {assetData.subCategoriesData.map((subcategory) => (
                                    <option key={subcategory.id} value={subcategory.id}>
                                        {subcategory.name} - {subcategory.description}
                                    </option>
                                ))}
                            </select>
                            {formErrors.subcategory && <div className="input-text-error show">{formErrors.subcategory}</div>}
                        </div>
                        <div className="col-md-3 col-sm-6 col-12 mb-3">
                            <label htmlFor="responsible" className="form-label">
                                <i className="fas fa-user"></i> Responsable <span className="text-danger">*</span>
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
                                {assetData.usersData.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name} - {user.userRoleResponse.roleName}
                                    </option>
                                ))}
                            </select>
                            {formErrors.responsible && <div className="input-text-error show">{formErrors.responsible}</div>}
                        </div>
                        <div className="col-md-3 col-sm-6 col-12 mb-3">
                            <label htmlFor="supplier" className="form-label">
                                <i className="fas fa-store"></i> Proveedor <span className="text-danger">*</span>
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
                                {assetData.suppliersData.map((supplier) => (
                                    <option key={supplier.id} value={supplier.id}>
                                        {supplier.name} - {supplier.phone}
                                    </option>
                                ))}
                            </select>
                            {formErrors.supplier && <div className="input-text-error show">{formErrors.supplier}</div>}
                        </div>
                        <div className="col-md-3 col-sm-6 col-12 mb-3">
                            <label htmlFor="brand" className="form-label">
                                <i className="fas fa-tag"></i> Marca <span className="text-danger">*</span>
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
                                {assetData.brandsData.map((brand) => (
                                    <option key={brand.id} value={brand.id}>
                                        {brand.name}
                                    </option>
                                ))}
                            </select>
                            {formErrors.brand && <div className="input-text-error show">{formErrors.brand}</div>}
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-md-3 col-sm-6 col-12 mb-3">
                            <label htmlFor="assetModel" className="form-label">
                                <i className="fas fa-laptop"></i> Modelo del Activo <span className="text-danger">*</span>
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
                                {assetData.assetModelsData.map((model) => (
                                    <option key={model.id} value={model.id}>
                                        {model.modelName}
                                    </option>
                                ))}
                            </select>
                            {formErrors.assetModel && <div className="input-text-error show">{formErrors.assetModel}</div>}
                        </div>
                        <div className="col-md-3 col-sm-6 col-12 mb-3">
                            <label htmlFor="currency" className="form-label">
                                <i className="fas fa-money-bill-wave"></i> Moneda <span className="text-danger">*</span>
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
                                {assetData.currencyData.map((currency) => (
                                    <option key={currency.id} value={currency.id}>
                                        {currency.stateName} - {currency.code} - {currency.symbol}
                                    </option>
                                ))}
                            </select>
                            {formErrors.currency && <div className="input-text-error show">{formErrors.currency}</div>}
                        </div>
                        <div className="col-md-3 col-sm-6 col-12 mb-3">
                            <label htmlFor="status" className="form-label">
                                <i className="fas fa-exclamation-circle"></i> Estado <span className="text-danger">*</span>
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
                                {assetData.assetStatusData.map((status) => {
                                    const isDisabled = [3, 4, 5].includes(status.id); // IDs de opciones deshabilitadas
                                    return (
                                        <option
                                            key={status.id}
                                            value={status.id}
                                            disabled={isDisabled}
                                            style={isDisabled ? { color: "#999", backgroundColor: "#f0f0f0", cursor: "not-allowed" } : {}}
                                        >
                                            {status.name} - {status.description}
                                        </option>
                                    );
                                })}
                            </select>
                            {formErrors.status && <div className="input-text-error show">{formErrors.status}</div>}
                        </div>
                        <div className="col-md-3 col-sm-6 col-12 mb-3">
                            <label htmlFor="locationNumber" className="form-label">
                                <i className="fas fa-map-marker-alt"></i> Número de Ubicación <span className="text-danger">*</span>
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
                                {assetData.locationsData.map((location) => (
                                    <option key={location.id} value={location.id}>
                                        {location.locationTypeName} - {location.locationNumber}
                                    </option>
                                ))}
                            </select>
                            {formErrors.locationNumber && <div className="input-text-error show">{formErrors.locationNumber}</div>}
                        </div>
                    </div>

                    <div className="d-flex justify-content-end mb-0">
                        <SaveButton acceptAction={handleSubmit} labelAccept="Guardar" />
                    </div>
                </form>
            </div>
            <GenericModal
                show={showConfirmationModal}
                onHide={handleHideConfirmationModal}
                title="¿Desea guardar el activo?"
                bodyText="Si guarda el activo se podrá solicitar posteriormente por otro usuario."
                onButtonClick={onSubmit}
            />
        </div>
    );
}

AssetForm.propTypes = {
    formData: PropTypes.shape({
        purchaseDate: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        supplier: PropTypes.string,
        brand: PropTypes.string,
        subcategory: PropTypes.string,
        responsible: PropTypes.string,
        status: PropTypes.string,
        currency: PropTypes.string,
        assetModel: PropTypes.string,
        assetSeries: PropTypes.string,
        plateNumber: PropTypes.string,
        locationNumber: PropTypes.string,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default AssetForm;