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
import {getAllSupplier} from "../../api/supplier/Supplier_API.js";
import {getAllSubCategory} from "../../api/assetSubCategory/subCategory_API.js";
import {getAllUsers} from "../../api/user/user_API.js";
import {getAllBrands} from "../../api/brand/brand_API.js";
import {getAllAssetModels} from "../../api/assetModel/assetModel_API.js";
import {getAllCurrencies} from "../../api/currency/currency_API.js";
import {getAllLocationNumber} from "../../api/locationNumber_API/locationNumber_API.js";
import {getAllAssets, saveAsset, updateAsset} from "../../api/asset/asset_API.js";
import {toast} from "react-hot-toast";
import {useNavigate, useParams} from "react-router-dom";

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

const UpdateAsset = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState(initialData);
    const [formErrors, setFormErrors] = useState({});
    const [assetId, setAssetId] = useState(id);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const handleShowConfirmationModal = () => setShowConfirmationModal(true);
    const handleHideConfirmationModal = () => setShowConfirmationModal(false);

    const [assets, setAssets] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [brands, setBrands] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [users, setUsers] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [assetModels, setAssetModels] = useState([]);
    const [locationNumbers, setLocationNumbers] = useState([]);
    const [assetStatus, setAssetStatus] = useState([]);

    const [openStatesAssetModal, setOpenStatesAssetModal] = useState(false);

    const navigate= useNavigate()

    const clearForm = () => {
        setFormData(initialData);
    }

    const handleOpenStatesAssetModal = () => setOpenStatesAssetModal(true);
    const handleCloseStatesAssetModal = () => setOpenStatesAssetModal(false);

    const formRef = useRef(null);

    const { data: assetsData, isLoading, isError } = useQuery({
        queryKey: ['assets'],
        queryFn: getAllAssets,
        retry: 1,
        refetchOnWindowFocus: false
    })

    const {data: assetStatusData} = useQuery({queryKey: ['assetStatus'], queryFn: getAllAssetStatus})
    const {data: suppliersData} = useQuery({queryKey: ['suppliers'], queryFn: getAllSupplier})
    const {data: subCategoriesData} = useQuery({queryKey: ['subCategories'], queryFn: getAllSubCategory})
    const {data: usersData} = useQuery({queryKey: ['users'], queryFn: getAllUsers});
    const {data: brandsData} = useQuery({queryKey: ['brands'], queryFn: getAllBrands});
    const {data: assetModelsData} = useQuery({queryKey: ['assetModels'], queryFn: getAllAssetModels})
    const {data: currencyData} = useQuery({queryKey: ['currencies'], queryFn: getAllCurrencies})
    const {data: locationsData} = useQuery({queryKey: ['locations'], queryFn: getAllLocationNumber})



    useEffect(() => {
        if (assetsData?.data) {
            const selectedAsset = assetsData.data.find(asset => asset.id === parseInt(id));
            if (selectedAsset) {
                console.log({ selectedAsset });
                setFormData({
                    purchaseDate: selectedAsset.purchaseDate,
                    value: selectedAsset.value,
                    supplier: selectedAsset.supplier.id,
                    brand: selectedAsset.brand.id,
                    subcategory: selectedAsset.subcategory.id,
                    responsible: selectedAsset.user.id,
                    status: selectedAsset.status.id,
                    currency: selectedAsset.currency.id,
                    assetModel: selectedAsset.model.id,
                    assetSeries: selectedAsset.assetSeries,
                    plateNumber: selectedAsset.plateNumber,
                    locationNumber: selectedAsset.locationNumber.id,
                });
            }
        }
    }, [assetsData, id]);


    useEffect(() => {
        if (assetStatusData) setAssetStatus(assetStatusData.data)
        if (suppliersData) setSuppliers(suppliersData.data)
        if (subCategoriesData) setSubcategories(subCategoriesData.data)
        if (usersData) setUsers(usersData.data)
        if (brandsData) setBrands(brandsData.data)
        if (assetModelsData) setAssetModels(assetModelsData.data)
        if (currencyData) setCurrencies(currencyData.data)
        if (locationsData) setLocationNumbers(locationsData.data)

    }, [
        assetStatusData,
        suppliersData,
        subCategoriesData,
        usersData,
        brandsData,
        assetModelsData,
        currencyData,
        locationsData
    ])

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prevState => ({ ...prevState, [name]: value }));

        setFormErrors(prevErrors => {
            const newErrors = { ...prevErrors };
            if (newErrors[name]) {
                delete newErrors[name];
            }
            return newErrors;
        });
    };

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

        // Solo enviar si no hay errores
        if (Object.keys(errors).length === 0) {
            handleShowConfirmationModal();
        }
    }

    const handleSubmit = async () => {
        const requestData = {
            purchaseDate: formData.purchaseDate,
            value: formData.value,
            userId: parseInt(formData.responsible),
            supplierId: parseInt(formData.supplier),
            subCategoryId: parseInt(formData.subcategory),
            brandId: parseInt(formData.brand),
            statusName: parseInt(formData.status),
            assetSeries: formData.assetSeries,
            plateNumber: formData.plateNumber,
            assetModelId: parseInt(formData.assetModel),
            currencyName: parseInt(formData.currency),
            locationNumberId: parseInt(formData.locationNumber),
        };
        try {
            const response = await updateAsset(id, requestData);
            toast.success(response.message, { duration: 7000 });
            navigate('/app/assetTable')
            clearForm();
        } catch (error) {
            console.log({ error });
            toast.error(error.message, { duration: 7000 });
        }
    };



    return (
        <>
            <AssetBanner
                title="Edición de Activo"
                visibleButtons={["goBack", "statusModal"]}
                handleOpen={handleOpenStatesAssetModal}
            />
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
                                    {subcategories.map((subcategory) => (
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
                                    {users.map((user) => (
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
                                    {suppliers.map((supplier) => (
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
                                    {brands.map((brand) => (
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
                                    {assetModels.map((model) => (
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
                                    {currencies.map((currency) => (
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
                                    {assetStatus.map((status) => {
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
                                    {locationNumbers.map((location) => (
                                        <option key={location.id} value={location.id}>
                                            {location.locationTypeName} - {location.locationNumber}
                                        </option>
                                    ))}
                                </select>
                                {formErrors.locationNumber && <div className="input-text-error show">{formErrors.locationNumber}</div>}
                            </div>
                        </div>

                        <div className="d-flex justify-content-end mb-0">
                            <SaveButton acceptAction={checkErrors} labelAccept="Guardar" />
                        </div>
                    </form>
                </div>
            </div>
            <GenericModal
                show={showConfirmationModal}
                onHide={handleHideConfirmationModal}
                title="¿Desea actualizar el activo?"
                bodyText="Si actualiza el activo, los cambios serán permanentes."
                onButtonClick={handleSubmit}
            />
            <AssetStatusModal  open={openStatesAssetModal} onClose={handleCloseStatesAssetModal} assetStatuses={assetStatus} />
        </>
    );
};

export default UpdateAsset;