import { Button } from 'react-bootstrap';
import { useEffect, useState } from "react";
import AssetBanner from "./AssetBanner.jsx";
import useAssetData from "../../hooks/apiData/assetData/AssetData.jsx";
import { Box, Typography } from '@mui/material';
import SaveButton from "../../components/button/SaveButton.jsx";
import GenericModal from "../../components/popUp/generic/GenericModal.jsx";
import { toast } from "react-hot-toast";
import { useForm } from 'react-hook-form';
import {saveAssetRequest} from "../../api/assetRequest/assetRequest_API.js";
import {saveAsset} from "../../api/asset/asset_API.js";

const AssetLoan = () => {
    const [assetData, setAssetData] = useState([]);
    const [selectedAsset, setSelectedAsset] = useState("");
    const [assetInfo, setAssetInfo] = useState(null);
    const [showAssetInfo, setShowAssetInfo] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const { register,
        handleSubmit,
        formState: { errors }, reset, clearErrors } = useForm();
    const { assets } = useAssetData();

    useEffect(() => {
        if (assets) setAssetData(assets.data);
    }, [assets]);

    useEffect(() => {
        if (selectedAsset === "") {
            setAssetInfo(null);
            return;
        }

        const foundAsset = assetData.find(asset => asset.id === parseInt(selectedAsset));
        setAssetInfo(foundAsset || null);
    }, [selectedAsset, assetData]);

    const handleShowInfo = () => {
        setShowAssetInfo(!showAssetInfo);
    };

    const handleShowConfirmationModal = () => setShowConfirmationModal(true);
    const handleHideConfirmationModal = () => setShowConfirmationModal(false);

    const onSubmit = async (data) => {
        // This function will only show a confirmation modal
        handleShowConfirmationModal();
    };

    const handleFinalSubmit = async (data) => {
        console.log(data);
        try{
            const response = await saveAssetRequest({
                assetId: data.selectedAsset,
                reason: data.reason,
                expirationDate: data.expirationDate
            });
            toast.success(response.message, { duration: 7000 });
            reset();
        } catch (e) {
            toast.error(e.message)
        }
    };

    return (
        <>
            <AssetBanner
                title="Préstamo de Activos"
                visibleButtons={[ "goBack", selectedAsset ? "assetInfo" : null ]}
                assetInfo={handleShowInfo}
            />
            {showAssetInfo && assetInfo && (
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
                        { label: 'ID', value: assetInfo.id },
                        { label: 'Placa', value: assetInfo.plateNumber },
                        { label: 'Fecha de Compra', value: assetInfo.purchaseDate },
                        { label: 'Valor', value: `${assetInfo.value} ${assetInfo.currency?.symbol}` },
                        { label: 'Usuario Responsable', value: assetInfo.user?.email },
                        { label: 'Proveedor', value: assetInfo.supplier?.name },
                        { label: 'Categoría', value: assetInfo.category?.name },
                        { label: 'Subcategoría', value: assetInfo.subcategory?.name },
                        { label: 'Marca', value: assetInfo.brand?.name },
                        { label: 'Estado', value: assetInfo.status?.name },
                        { label: 'Modelo', value: assetInfo.model?.modelName },
                        { label: 'Tipo de Moneda', value: `${assetInfo.currency?.stateName} - ${assetInfo.currency?.code} - ${assetInfo.currency?.symbol}` },
                        { label: 'Serie', value: assetInfo.assetSeries },
                        { label: 'Ubicación', value: assetInfo.locationNumber?.locationTypeName }
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
                            {/* Asset Selection */}
                            <div className="col-md-4 mb-4">
                                <label htmlFor="assetSelect" className="form-label">
                                    <i className="fas fa-car"></i> Seleccione el Activo
                                </label>
                                <select
                                    id="assetSelect"
                                    className="form-select border-primary"
                                    {...register("selectedAsset", { required: "Seleccione un activo" })}
                                    onChange={(e) => {
                                        setSelectedAsset(e.target.value);
                                        if (e.target.value === "") setAssetInfo(null);
                                        clearErrors("selectedAsset"); // Clear the error when selecting a new asset
                                    }}
                                >
                                    <option value="">Seleccione un activo</option>
                                    {assetData && assetData.length > 0 ? (
                                        assetData.map(asset => (
                                            <option key={asset.id} value={asset.id}>
                                                {asset.plateNumber}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="">No hay activos disponibles</option>
                                    )}
                                </select>
                                {errors.selectedAsset && <div className="input-text-error show">{errors.selectedAsset.message}</div>}
                            </div>

                            {/* Purpose */}
                            <div className="col-md-4 mb-4">
                                <label htmlFor="reason" className="form-label">
                                    <i className="fas fa-file-alt"></i> Propósito de la Solicitud
                                </label>
                                <textarea
                                    id="reason"
                                    className="form-control border-primary"
                                    {...register("reason", { required: "Ingrese el propósito de la solicitud" })}
                                    rows={1}
                                />
                                {errors.reason && <div className="input-text-error show">{errors.reason.message}</div>}
                            </div>

                            {/* Expiration Date */}
                            <div className="col-md-4 mb-4">
                                <label htmlFor="expirationDate" className="form-label">
                                    <i className="fas fa-calendar-alt"></i> Fecha de Finalización
                                </label>
                                <input
                                    type="date"
                                    id="expirationDate"
                                    className="form-control border-primary"
                                    {...register("expirationDate", { required: "Ingrese la fecha de finalización" })}
                                />
                                {errors.expirationDate && <div className="input-text-error show">{errors.expirationDate.message}</div>}
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
                title="¿Desea realizar la solicitud de préstamo?"
                bodyText="Una vez realizada la solicitud, no podrá ser revertida."
                onButtonClick={() => {
                    handleHideConfirmationModal();
                    handleSubmit(handleFinalSubmit)();
                }}
            />
        </>
    );
};

export default AssetLoan;
