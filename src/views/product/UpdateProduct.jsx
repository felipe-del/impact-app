/**
 * UpdateProduct Component
 * 
 * This component is used to update product information in the system.
 * It includes a form with fields for purchase date, expiry date,
 * product category, and product status.
 * It also includes a confirmation modal for saving changes.
 * It uses React Router for navigation and React Hot Toast for notifications.
 * It uses custom hooks for fetching product category and status data.
 */
import {useNavigate, useParams} from "react-router-dom";
import ProductBanner from "./ProductBanner.jsx";
import useProductCategoryData from "../../hooks/apiData/productCategory/productCategoryData.jsx";
import useProductStatusData from "../../hooks/apiData/productStatus/ProductStatusData.jsx";
import {useEffect, useRef, useState} from "react";
import {saveProduct, updateProduct} from "../../api/product/product_API.js";
import {toast} from "react-hot-toast";
import SaveButton from "../../components/button/SaveButton.jsx";
import GenericModal from "../../components/popUp/generic/GenericModal.jsx";
import useProductData from "../../hooks/apiData/product/productData.jsx";
import {StatusTranslator} from "../../util/Translator.js";

/**
 * UpdateProduct component that allows users to update product information.
 * 
 * @component
 * @returns {JSX.Element} - The UpdateProduct component.
 */
const UpdateProduct = () => {
    const { id } = useParams();
    const {productCategories} = useProductCategoryData()
    const {products} = useProductData()
    const {productStatus} = useProductStatusData()
    const [productCategoryData, setProductCategoryData] = useState([]);
    const [productStatusData, setProductStatusData] = useState([]);
    const [formData, setFormData] = useState({})
    const [formErrors, setFormErrors] = useState({});
    const formRef = useRef(null);
    const navigate = useNavigate()

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const handleShowConfirmationModal = () => setShowConfirmationModal(true);
    const handleHideConfirmationModal = () => setShowConfirmationModal(false);



    useEffect(() => {
        if (productCategories?.data && Array.isArray(productCategories.data)) setProductCategoryData(productCategories.data);
        if (productStatus?.data && Array.isArray(productStatus.data)) setProductStatusData(productStatus.data);
    }, [productCategories, productStatus]);

    useEffect(() => {
        if(products?.data && Array.isArray(products.data)) {
            const product = products.data.find((product) => product.id === parseInt(id));
            if (product) {
                if (product) {
                    setNoExpiry(!product.expiryDate);

                    setFormData({
                        purchaseDate: product.purchaseDate,
                        expiryDate: product.expiryDate,
                        productCategory: product.category.id,
                        productStatus: product.status.id
                    });
                }

            }
        }

    }, [id, products])

    /**
     * Validates the form data and checks for errors.
     * 
     * @returns {void}
     */
    const checkErrors = () => {
        const errors = {};
        setFormErrors(errors);

        if (!formData.purchaseDate) errors.purchaseDate = "La fecha de compra es obligatoria.";
        else {
            const purchaseDate = new Date(formData.purchaseDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0); 
            if (purchaseDate > today) {
                errors.purchaseDate = "La fecha de compra debe ser en el pasada.";
            }
        }

        if (!formData.expiryDate && !noExpiry) {
            errors.expiryDate = "La fecha de expiración es obligatoria.";
        } else if (formData.expiryDate) {
            const expiryDate = new Date(formData.expiryDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0); 
            if (expiryDate <= today) {
                errors.expiryDate = "La fecha de expiración debe ser en el futuro.";
            }
        }
        if (!formData.productStatus) errors.productStatus = "El estado del producto es obligatorio.";
        if (!formData.productCategory) errors.productCategory = "La categoría del producto es obligatoria.";

        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            handleShowConfirmationModal();
        }
    }

    /**
     * Handles the change event for form inputs.
     * 
     * @param {object} e - The event object.
     * @returns {void}
     */
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

    /**
     * Handles the form submission and updates the product.
     * 
     * @returns {void}
     */
    const handleSubmit = async () => {

        const requestData = {
            quantity: 1,
            purchaseDate: formData.purchaseDate,
            expiryDate: formData.expiryDate,
            categoryId: formData.productCategory,
            statusName: formData.productStatus
        };
        try {
            const response = await updateProduct(id, requestData);
            toast.success(response.message, { duration: 7000 });
            setFormData({
                purchaseDate: "",
                expiryDate: "",
                productCategory: "",
                productStatus: ""
            })
            navigate('/app/productManagement');
        } catch (error) {
            console.error(error);
            toast.error(error.message, { duration: 7000 });
        } finally {
            setShowConfirmationModal(false);
        }
    };

    const [noExpiry, setNoExpiry] = useState(true);

    /**
     * Toggles the expiry date field and updates the form data accordingly.
     * 
     * @returns {void}
     */
    const toggleExpiry = () => {
        setNoExpiry(!noExpiry);
        setFormData({ ...formData, expiryDate: noExpiry ? "" : null });
    };

    return (
        <>
            <ProductBanner
                title="Edición de Productos"
                visibleButtons={["goBack"]}
            />
            <div className="container-fluid p-0">
                <div className="card p-4 shadow-lg" style={{ maxWidth: "100%", borderRadius: "15px" }}>
                    <form ref={formRef}>
                        <div className="row mb-4">

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

                            <div className="col-md-3 col-sm-6 col-12 mb-3">
                                <label htmlFor="productStatus" className="form-label">
                                    <i className="fas fa-exclamation-circle"></i> Estado del Producto <span className="text-danger">*</span>
                                </label>
                                <select
                                    name="productStatus"
                                    id="productStatus"
                                    className="form-select border-primary"
                                    value={formData.productStatus}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Seleccionar estado</option>
                                    {productStatusData.map((status) => {
                                        const isDisabled = [2, 3].includes(status.id); 
                                        return (
                                            <option
                                                key={status.id}
                                                value={status.id}
                                                disabled={isDisabled}
                                                style={isDisabled ? { color: "#999", backgroundColor: "#f0f0f0", cursor: "not-allowed" } : {}}
                                            >
                                                {StatusTranslator.translate(status.name)} - {status.description}
                                            </option>
                                        );
                                    })}
                                </select>
                                {formErrors.productStatus && <div className="input-text-error show">{formErrors.productStatus}</div>}
                            </div>

                            <div className="col-md-3 col-sm-6 col-12 mb-3">
                                <label htmlFor="productCategory" className="form-label">
                                    <i className="fa-solid fa-cubes-stacked"></i> Categoría de Producto <span
                                    className="text-danger">*</span>
                                </label>
                                <select
                                    name="productCategory"
                                    id="productCategory"
                                    className="form-select border-primary"
                                    value={formData.productCategory}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Seleccionar estado</option>
                                    {productCategoryData.map((status) => {
                                        return (
                                            <option
                                                key={status.id}
                                                value={status.id}
                                            >
                                                Nombre: {status.name} - Tipo de Categoría: {status.categoryType.name} - Unidad de Medida: {status.unitOfMeasurement.name}
                                            </option>
                                        );
                                    })}
                                </select>
                                {formErrors.productCategory && <div className="input-text-error show">{formErrors.productCategory}</div>}
                            </div>

                            <div className="col-md-3 col-sm-6 col-12 mb-3">
                                <label htmlFor="expiryDate" className="form-label">
                                    <i className="fas fa-calendar-xmark"></i> Fecha de Expiración
                                </label>
                                <input
                                    type="date"
                                    name="expiryDate"
                                    id="expiryDate"
                                    className="form-control border-primary"
                                    value={formData.expiryDate || ""}
                                    onChange={handleChange}
                                    required={!noExpiry}
                                    disabled={noExpiry}
                                />
                                {formErrors.expiryDate && <div className="input-text-error show">{formErrors.expiryDate}</div>}

                                <span
                                    className="mt-1 text-black-50 font-italic"
                                    style={{ fontSize: ".85rem", cursor: "pointer" }}
                                    onClick={toggleExpiry}
                                >
                                    {noExpiry ? "Activar fecha de expiración" : "Desactivar fecha de expiración"}
                                </span>
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
                title="¿Desea actualizar el Producto?"
                bodyText="Si actualiza el producto, los cambios serán permanentes."
                onButtonClick={handleSubmit}
            />
        </>
    );
}

export default UpdateProduct;