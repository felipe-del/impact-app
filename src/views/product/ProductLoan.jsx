import ProductBanner from "./ProductBanner.jsx";
import useProductData from "../../hooks/apiData/product/productData.jsx";
import {useEffect, useState} from "react";
import {toast} from "react-hot-toast";
import SaveButton from "../../components/button/SaveButton.jsx";
import GenericModal from "../../components/popUp/generic/GenericModal.jsx";
import {useForm} from "react-hook-form";
import {saveProductRequest} from "../../api/productRequest/productRequest.js";
import {Box, Typography} from "@mui/material";


const ProductLoan = () => {

    const {products, refetch} = useProductData();
    const [productData, setProductData] = useState([]);
    useEffect(() => {
        if(products) setProductData(products.data)
        console.log(products.data)
    }, [products]);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productInfo, setProductInfo] = useState(null);
    const [showProductInfo, setShowProductInfo] = useState(false);

    const handleShowInfo = () => {
        setShowProductInfo(!showProductInfo);
    };

    useEffect(() => {
        if (selectedProduct === "" || selectedProduct === null) {
            setProductInfo(null);
            return;
        }

        const foundProduct = productData.find(product => product.id === parseInt(selectedProduct));
        setProductInfo(foundProduct || null);
    }, [selectedProduct, productData]);

    const { register,
        handleSubmit,
        formState: { errors }, reset, clearErrors } = useForm();

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const handleShowConfirmationModal = () => setShowConfirmationModal(true);
    const handleHideConfirmationModal = () => setShowConfirmationModal(false);

    const onSubmit = async (data) => {
        handleShowConfirmationModal();
    };

    const handleFinalSubmit = async (data) => {
        try{
            console.log(data)
            const response = await saveProductRequest({
                quantity: data.quantity,
                productId: data.selectedProduct,
                reason: data.reason,
            });
            toast.success(response.message, { duration: 7000 });
            reset();
            refetch();
        } catch (e) {
            toast.error(e.message)
        }
    };

    return (
        <>
        <ProductBanner
            title="Solicitud de productos"
            visibleButtons={["goBack", selectedProduct ? "productInfo" : null]}
            productInfo={handleShowInfo}
        />
            {showProductInfo && productInfo && (
                <Box
                    sx={{
                        display: 'grid',
                        margin: 'auto',
                        marginBottom: '20px',
                        gridTemplateColumns: 'repeat(5, 1fr)',
                        width: '100%',
                        padding: '20px',
                        background: 'linear-gradient(135deg, #003c74 0%, #005DA4 100%)',
                        borderRadius: '15px',
                        boxShadow: '0px 4px 10px rgba(0, 93, 164, 0.3)',
                        color: '#f8f9fa',
                        fontFamily: '"Montserrat", sans-serif',
                        letterSpacing: '0.5px',
                        gap: '15px',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                    }}
                >
                    {[
                        { label: 'ID', value: productInfo.id },
                        { label: 'Nombre', value: productInfo.name },
                        { label: 'Fecha de Compra', value: productInfo.purchaseDate },
                        { label: 'Fecha de Expiración', value: productInfo.expiryDate },
                        { label: 'Categoría', value: productInfo.category.name },
                        { label: 'Cantidad Mínima', value: productInfo.category.minimumQuantity },
                        { label: 'Tipo de Categoría', value: productInfo.category.categoryType.name },
                        { label: 'Descripción de Categoría', value: productInfo.category.categoryType.description },
                        { label: 'Unidad de Medida', value: productInfo.category.unitOfMeasurement.name },
                        { label: 'Abreviatura de Unidad', value: productInfo.category.unitOfMeasurement.abbreviation },
                        { label: 'Estado', value: productInfo.status.name },
                        { label: 'Descripción del Estado', value: productInfo.status.description }


                    ].map((item, index) => (
                        <Box key={index} sx={{ background: 'rgba(255, 255, 255, 0.1)', padding: '8px', borderRadius: '10px', textAlign: 'left', boxShadow: '0px 2px 5px rgba(255, 255, 255, 0.1)', transition: '0.3s ease-in-out', '&:hover': { transform: 'scale(1.03)', boxShadow: '0px 4px 12px rgba(255, 255, 255, 0.3)' } }}>
                            <Typography sx={{ fontWeight: 'bold', color: '#f8f9fa', fontFamily: '"Montserrat", sans-serif' }}>{item.label}</Typography>
                            <Typography sx={{ fontFamily: '"Montserrat", sans-serif' }}>{item.value || 'N/A'}</Typography>
                        </Box>
                    ))}
                </Box>
            )}
            <div className="container-fluid p-0">
                <div className="card p-4 shadow-lg" style={{ maxWidth: "100%", borderRadius: "15px" }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-md-4 mb-4">
                                <label htmlFor="selectedProduct" className="form-label">
                                    <i className="fas fa-car"></i> Seleccione el Producto<span className="text-danger">*</span>
                                </label>
                                <select
                                    id="selectedProduct"
                                    className="form-select border-primary"
                                    {...register("selectedProduct", { required: "Seleccione un activo" })}
                                    onChange={(e) => {
                                        setSelectedProduct(e.target.value);
                                        if (e.target.value === "") setProductInfo(null);
                                        clearErrors("selectedProduct"); // Clear the error when selecting a new asset
                                    }}
                                >
                                    <option value="">Seleccione un activo</option>
                                    {productData && productData.length > 0 ? (
                                        Array.from(
                                            productData
                                                .filter(product => product.status.name.toLowerCase() !== "earring") // Exclude products with status "EARRING"
                                                .reduce((acc, product) => {
                                                    // If category doesn't exist in the accumulator, add it with the product
                                                    if (!acc.has(product.category.id)) {
                                                        acc.set(product.category.id, {
                                                            categoryName: product.category.name,
                                                            categoryType: product.category.categoryType.name,
                                                            availableQuantity: productData.filter(
                                                                p => p.category.id === product.category.id && p.status.name.toLowerCase() !== "earring"
                                                            ).length,
                                                            productId: product.id
                                                        });
                                                    }
                                                    return acc;
                                                }, new Map())
                                        ).map(([_, categoryData]) => (
                                            <option key={categoryData.productId} value={categoryData.productId}>
                                                Categoría: {categoryData.categoryName} - Tipo: {categoryData.categoryType} (Cantidad disponible: {categoryData.availableQuantity})
                                            </option>
                                        ))
                                    ) : (
                                        <option value="">No hay activos disponibles</option>
                                    )}
                                </select>
                                {errors.selectedProduct && <div className="input-text-error show">{errors.selectedProduct.message}</div>}
                            </div>

                            <div className="col-md-4 mb-4">
                                <label htmlFor="quantity" className="form-label">
                                    <i className="fa-solid fa-arrow-up-1-9"/> Cantidad de Productos por solicitar<span className="text-danger">*</span>
                                </label>
                                <input
                                    type="number"
                                    id="quantity"
                                    className="form-control border-primary"
                                    {...register("quantity", { required: "La cantidad es requerida", min: { value: 1, message: "La cantidad debe ser mayor a 0" } })}
                                    placeholder="Ej: 10"
                                    style={{ fontSize: ".9rem" }}
                                />
                                {errors.quantity && <div className="input-text-error show">{errors.quantity.message}</div>}
                            </div>

                            {/* Purpose */}
                            <div className="col-md-4 mb-4">
                                <label htmlFor="reason" className="form-label">
                                    <i className="fas fa-file-alt"></i> Propósito de la Solicitud<span className="text-danger">*</span>
                                </label>
                                <textarea
                                    id="reason"
                                    className="form-control border-primary"
                                    {...register("reason", { required: "Ingrese el propósito de la solicitud" })}
                                    rows={1}
                                />
                                {errors.reason && <div className="input-text-error show">{errors.reason.message}</div>}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="d-flex justify-content-end mb-0">
                            <SaveButton onClick={handleShowConfirmationModal} labelAccept="Guardar" />
                        </div>
                    </form>
                </div>
            </div>
            <GenericModal
                show={showConfirmationModal}
                onHide={handleHideConfirmationModal}
                title="¿Desea realizar la solicitud de producto?"
                bodyText="Una vez realizada la solicitud, no podrá ser revertida."
                onButtonClick={() => {
                    handleHideConfirmationModal();
                    handleSubmit(handleFinalSubmit)();
                }}
            />
        </>
    )
}

export default ProductLoan