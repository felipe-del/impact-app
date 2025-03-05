import ProductBanner from "./ProductBanner.jsx";
import useProductCategoryData from "../../hooks/apiData/productCategory/productCategoryData.jsx";
import {useEffect, useRef, useState} from "react";
import SaveButton from "../../components/button/SaveButton.jsx";
import GenericModal from "../../components/popUp/generic/GenericModal.jsx";
import {toast} from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import useProductStatusData from "../../hooks/apiData/productStatus/ProductStatusData.jsx";
import {saveProduct} from "../../api/product/product_API.js";

const initialData = {
    quantity: 0,
    purchaseDate: "",
    expiryDate: "",
    categoryId: "",
    statusName: ""
}

const CreateProduct = () => {

    const {productCategories} = useProductCategoryData()
    const {productStatus} = useProductStatusData()
    const [productCategoryData, setProductCategoryData] = useState([]);
    const [productStatusData, setProductStatusData] = useState([]);
    const [formData, setFormData] = useState(initialData)
    const [formErrors, setFormErrors] = useState({});
    const formRef = useRef(null);
    const navigate = useNavigate()

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const handleShowConfirmationModal = () => setShowConfirmationModal(true);
    const handleHideConfirmationModal = () => setShowConfirmationModal(false);


    useEffect(() => {
        if (productCategories?.data && Array.isArray(productCategories.data)) setProductCategoryData(productCategories.data);
        if (productStatus?.data && Array.isArray(productStatus.data)) setProductStatusData(productStatus.data);
        console.log(productCategories.data)
    }, [productCategories, productStatus]);

    const checkErrors = () => {
        const errors = {};
        setFormErrors(errors);

        if (!formData.quantity) errors.quantity = "La cantidad es obligatoria.";
        if (!formData.purchaseDate) errors.purchaseDate = "La fecha de compra es obligatoria.";
        else {
            // Check if purchaseDate is today or in the past
            const purchaseDate = new Date(formData.purchaseDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Set time to 00:00:00 for comparison
            if (purchaseDate > today) {
                errors.purchaseDate = "La fecha de compra debe ser en el pasada.";
            }
        }

        if (!formData.expiryDate) errors.expiryDate = "La fecha de expiración es obligatoria.";
        else {
            // Check if expiryDate is in the future
            const expiryDate = new Date(formData.expiryDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Set time to 00:00:00 for comparison
            if (expiryDate <= today) {
                errors.expiryDate = "La fecha de expiración debe ser en el futuro.";
            }
        }
        if (!formData.productStatus) errors.productStatus = "El estado del producto es obligatorio.";
        if (!formData.productCateogory) errors.productCateogory = "La categoría del producto es obligatoria.";



        setFormErrors(errors);

        // Solo enviar si no hay errores
        if (Object.keys(errors).length === 0) {
            handleShowConfirmationModal();
        }
    }

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

    const handleSubmit = async () => {

        const requestData = {
            quantity: formData.quantity,
            purchaseDate: formData.purchaseDate,
            expiryDate: formData.expiryDate,
            categoryId: formData.productCateogory,
            statusName: formData.productStatus
        };
        try {
            const response = await saveProduct(requestData);
            toast.success(response.message, { duration: 7000 });
            setFormData(initialData);
            navigate('/app/productManagement');
        } catch (error) {
            console.error(error);
            toast.error(error.message, { duration: 7000 });
        } finally {
            setShowConfirmationModal(false);
        }
    };

    return (
        <>
            <ProductBanner
                title="Creación de Producto"
                visibleButtons={["goBack"]}
            />
            <div className="container-fluid p-0">
                <div className="card p-4 shadow-lg" style={{ maxWidth: "100%", borderRadius: "15px" }}>
                    <form ref={formRef}>
                        <div className="row mb-4">
                            <div className="col-md-3 col-sm-6 col-12 mb-3">
                                <label htmlFor="quantity" className="form-label">
                                    <i className="fa-solid fa-arrow-up-1-9"/> Cantidad de Productos por agregar<span className="text-danger">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="quantity"
                                    id="quantity"
                                    className="form-control border-primary"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    placeholder="Ej: 10"
                                    style={{ fontSize: ".9rem" }}
                                    required
                                    // minimum="0"

                                />
                                {formErrors.quantity && <div className="input-text-error show">{formErrors.quantity}</div>}
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

                            <div className="col-md-3 col-sm-6 col-12 mb-3">
                                <label htmlFor="expiryDate" className="form-label">
                                    <i className="fas fa-calendar-xmark"></i> Fecha de Expiración <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="date"
                                    name="expiryDate"
                                    id="expiryDate"
                                    className="form-control border-primary"
                                    value={formData.expiryDate}
                                    onChange={handleChange}
                                    required
                                />
                                {formErrors.expiryDate && <div className="input-text-error show">{formErrors.expiryDate}</div>}
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
                                        const isDisabled = [2, 3].includes(status.id); // IDs de opciones deshabilitadas
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
                                {formErrors.productStatus && <div className="input-text-error show">{formErrors.productStatus}</div>}
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-md-6 col-sm-12 col-24 mb-3">
                                <label htmlFor="productCateogory" className="form-label">
                                    <i className="fa-solid fa-cubes-stacked"></i> Categoría de Producto <span
                                    className="text-danger">*</span>
                                </label>
                                <select
                                    name="productCateogory"
                                    id="productCateogory"
                                    className="form-select border-primary"
                                    value={formData.productCateogory}
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
                                {formErrors.productCateogory && <div className="input-text-error show">{formErrors.productCateogory}</div>}
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
                title="¿Desea guardar el Producto?"
                bodyText="Si guarda el producto, este se añadirá a la lista de productos."
                onButtonClick={handleSubmit}
            />
        </>
    );
}

export default CreateProduct