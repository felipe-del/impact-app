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
        console.log(productCategories.data)
    }, [productCategories, productStatus]);

    useEffect(() => {
        if(products?.data && Array.isArray(products.data)) {
            const product = products.data.find((product) => product.id === parseInt(id));
            if (product) {
                console.log(product)
                setFormData({
                    name: product.name,
                    purchaseDate: product.purchaseDate,
                    expiryDate: product.expiryDate,
                    productCategory: product.category.id,
                    productStatus: product.status.id
                });
            }
        }

    }, [id, products])

    const checkErrors = () => {
        const errors = {};
        setFormErrors(errors);

        if (!formData.name) errors.name = "El nombre del producto es obligatorio.";
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
        if (!formData.productCategory) errors.productCategory = "La categoría del producto es obligatoria.";



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
            name: formData.name,
            purchaseDate: formData.purchaseDate,
            expiryDate: formData.expiryDate,
            categoryId: formData.productCategory,
            statusName: formData.productStatus
        };
        try {
            const response = await updateProduct(id, requestData);
            toast.success(response.message, { duration: 7000 });
            setFormData({
                name: "",
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
                                <label htmlFor="name" className="form-label">
                                    <i className="fa-solid fa-signature"/> Nombre de Producto <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="form-control border-primary"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Ej: Pizarra"
                                    style={{ fontSize: ".9rem" }}
                                    required
                                />
                                {formErrors.name && <div className="input-text-error show">{formErrors.name}</div>}
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