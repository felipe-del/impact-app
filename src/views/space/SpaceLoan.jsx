/**
 * SpaceLoan Component
 * 
 * This component is used to manage space loan requests in the system.
 * It includes functionalities to create, update, and delete space loan requests.
 * It also displays a form for submitting space loan requests and a modal for confirmation.
 * It uses Material-UI for styling and icons.
 * It also includes a banner for navigation and information.
 * It uses react-hook-form for form handling and validation.
 */
import SpaceBanner from "./SpaceBanner.jsx";
import useSpaceData from "../../hooks/apiData/space/SpaceData.jsx";
import LoadingPointsSpinner from "../../components/spinner/loadingSpinner/LoadingPointsSpinner.jsx";
import {useEffect, useState} from "react";
import SaveButton from "../../components/button/SaveButton.jsx";
import {useForm} from "react-hook-form";
import { parse, format } from 'date-fns';
import {toast} from "react-hot-toast";
import GenericModal from "../../components/popUp/generic/GenericModal.jsx";
import {Box, Typography} from "@mui/material";
import useSpaceStatusData from "../../hooks/apiData/spaceStatus/SpaceStatusData.jsx";
import {saveSpaceRequest} from "../../api/spaceRequest/SpaceRequest.js";

/**
 * SpaceLoan component that displays a form for submitting space loan requests.
 * 
 * @component
 * @returns {JSX.Element} - The SpaceLoan component.
 */
const SpaceLoan = () => {

    const {spaceStatus} = useSpaceStatusData()
    const {spaces, isError, isLoading, refetch} = useSpaceData();
    const [spaceData, setSpaceData] = useState(spaces);
    const [selectedSpace, setSelectedSpace] = useState(null);
    const [spaceInfo, setSpaceInfo] = useState(null);

    const [showSpaceInfo, setShowSpaceInfo] = useState(false);

    const handleShowInfo = () => {
        setShowSpaceInfo(!showSpaceInfo);
    };

    useEffect(() => {
        if (spaces) setSpaceData(spaces.data);
        if (spaceStatus) setSpaceData(spaces.data);
    }, [spaces, spaceStatus]);

    const { register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        clearErrors } = useForm();

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const handleShowConfirmationModal = () => setShowConfirmationModal(true);
    const handleHideConfirmationModal = () => setShowConfirmationModal(false);

    useEffect(() => {
        if (selectedSpace === "" || selectedSpace === null) {
            setSpaceInfo(null);
            return;
        }

        const foundSpace = spaceData.find(space => space.id === parseInt(selectedSpace));
        setSpaceInfo(foundSpace || null);
    }, [selectedSpace, spaceData]);

    const onSubmit = async (data) => {
        handleShowConfirmationModal();
    };

    /**
     * Handles the final submission of the space loan request form.
     * 
     * @param {object} data - The form data from the space loan request form.
     * @returns {Promise<void>} - A promise that resolves when the submission is complete.
     */
    const handleFinalSubmit = async (data) => {
        try{

            const parsedStartTime = parse(data.startTime, "yyyy-MM-dd'T'HH:mm", new Date());
            const parsedEndTime = parse(data.endTime, "yyyy-MM-dd'T'HH:mm", new Date());

            const startTime = format(parsedStartTime, "yyyy-MM-dd'T'HH:mm:ss'Z'");
            const endTime = format(parsedEndTime, "yyyy-MM-dd'T'HH:mm:ss'Z'");

            const obs = data.eventObs ? data.eventObs : "Ninguna";

            const response = await saveSpaceRequest({
                spaceId: parseInt(data.selectedSpace),
                numPeople: parseInt(data.numPeople),
                eventDesc: data.eventDesc,
                eventObs: obs,
                useEquipment: data.useEquipment,
                startTime: startTime,
                endTime: endTime,
            });
            toast.success(response.message, { duration: 7000 });
            reset();
            refetch();
        } catch (e) {
            toast.error(e.message)
        }
    };


    if (isError) return <div>Error</div>
    return (
        <>
            {isLoading && <LoadingPointsSpinner />}
            <SpaceBanner
                title="Solicitud de Espacios"
                visibleButtons={["goBack", selectedSpace ? "spaceInfo" : null]}
                spaceInfo={handleShowInfo}
            />
            {showSpaceInfo && showSpaceInfo && (
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
                        { label: 'ID', value: spaceInfo.id },
                        { label: 'Nombre', value: spaceInfo.name },
                        { label: 'Código de Espacio', value: spaceInfo.spaceCode },
                        { label: 'Ubicación', value: spaceInfo.buildingLocationResponse.building.name },
                        { label: 'Piso', value: spaceInfo.buildingLocationResponse.floor },
                        { label: 'Capacidad Máxima', value: spaceInfo.maxPeople },
                        { label: 'Hora de Apertura', value: spaceInfo.openTime },
                        { label: 'Hora de Cierre', value: spaceInfo.closeTime },
                        { label: 'Estado', value: spaceInfo.spaceStatus.name },
                        { label: 'Descripción del Estado', value: spaceInfo.spaceStatus.description }
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
                            <div className="col-md-3 mb-4">
                                <label htmlFor="selectedSpace" className="form-label">
                                    <i className="fas fa-car"></i> Seleccione el Espacio<span className="text-danger">*</span>
                                </label>
                                <select
                                    id="selectedSpace"
                                    className="form-select border-primary"
                                    {...register("selectedSpace", { required: "Seleccione un espacio" })}
                                    onChange={(e) => {
                                        setSelectedSpace(e.target.value);
                                        if (e.target.value === "") setSpaceInfo(null);
                                        else setSpaceInfo(spaceData.find(space => space.id === parseInt(e.target.value)));
                                        clearErrors("selectedSpace");
                                    }}
                                >
                                    <option value="">Seleccione un activo</option>
                                    {spaceData && spaceData.length > 0 ? (
                                        spaceData
                                            .filter(space => space.spaceStatus.name.toLowerCase() !== "earring")
                                            .map(space => (
                                                <option key={space.id} value={space.id}>
                                                    {space.name}
                                                </option>
                                            ))
                                    ) : (
                                        <option value="">No hay espacios disponibles</option>
                                    )}
                                </select>
                                {errors.selectedSpace && <div className="input-text-error show">{errors.selectedSpace.message}</div>}
                            </div>
                            <div className="col-md-3 mb-4">
                                <label htmlFor="numPeople" className="form-label">
                                    <i className="fa-solid fa-arrow-up-1-9"/>  Número de personas <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="number"
                                    id="numPeople"
                                    className="form-control border-primary"
                                    {...register("numPeople",
                                        {
                                            required: "El número de personas es requerido",
                                            min: {
                                            value: 1,
                                                message: "La cantidad debe ser mayor a 0"
                                            },
                                            max: {
                                                value: spaceInfo ? spaceInfo.maxPeople : 0,  // Se usa la capacidad máxima del espacio
                                                message: `La cantidad no puede ser mayor a la capacidad máxima de ${spaceInfo ? spaceInfo.maxPeople : 0} personas.`
                                            }
                                        }
                                        )
                                }
                                    placeholder="Ej: 10"
                                    style={{ fontSize: ".9rem" }}
                                />
                                {spaceInfo && (
                                    <span
                                        className="mt-1 text-black-50 font-italic"
                                        style={{fontSize: ".85rem"}}
                                    >Capacidad máxima del espacio: {spaceInfo.maxPeople}</span>
                                )}
                                {errors.numPeople && <div className="input-text-error show">{errors.numPeople.message}</div>}
                            </div>
                            <div className="col-md-3 mb-4">
                                <label htmlFor="eventDesc" className="form-label">
                                    <i className="fas fa-file-alt"></i> Propósito de la Solicitud<span className="text-danger">*</span>
                                </label>
                                <textarea
                                    id="eventDesc"
                                    className="form-control border-primary"
                                    {...register("eventDesc", { required: "Ingrese el propósito de la solicitud" })}
                                    rows={1}
                                />
                                {errors.eventDesc && <div className="input-text-error show">{errors.eventDesc.message}</div>}
                            </div>
                            <div className="col-md-3 mb-4">
                                <label htmlFor="eventObs" className="form-label">
                                    <i className="fas fa-eye"></i> Observaciónes de Solucitud
                                </label>
                                <textarea
                                    id="eventObs"
                                    className="form-control border-primary"
                                    {...register("eventObs")}
                                    rows={1}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3 mb-4">
                                <label htmlFor="useEquipment" className="form-label">
                                    <i className="fas fa-toolbox"></i> Equipo de Espacio <span className="text-danger">*</span>
                                </label>
                                <div className="input-group">
                                    <div className="input-group-text border-primary">
                                        <input
                                            id="useEquipment"
                                            type="checkbox"
                                            style={{marginLeft: "-0.455rem"}}
                                            className="form-check-input mt-0"
                                            {...register("useEquipment")}
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control border-primary"
                                        value={watch("useEquipment") ? "Necesito equipamiento de espacio" : "No necesito equipamiento de espacio"}
                                        readOnly
                                        style={{ fontSize: ".9rem", backgroundColor: "#f8f9fa" }}
                                    />
                                </div>
                                {errors.useEquipment && <div className="input-text-error show">{errors.useEquipment.message}</div>}
                            </div>
                            <div className="col-md-3 mb-4">
                                <label htmlFor="startTime" className="form-label">
                                    <i className="fas fa-hourglass-start"></i> Fecha y Hora de Inicio<span className="text-danger">*</span>
                                </label>
                                <input
                                    type="datetime-local"
                                    id="startTime"
                                    className="form-control border-primary"
                                    {...register("startTime", { required: "Ingrese la fecha y hora de inicio" })}
                                />
                                {spaceInfo && (
                                    <span
                                        className="mb-5 text-black-50 font-italic"
                                        style={{fontSize: ".85rem"}}
                                    >
                                        Hora de apertura: {spaceInfo.openTime}
                                    </span>
                                )}
                                {errors.startTime && <div className="input-text-error show">{errors.startTime.message}</div>}
                            </div>
                            <div className="col-md-3 mb-4">
                                <label htmlFor="endTime" className="form-label">
                                    <i className="fas fa-hourglass-start" style={{ transform: 'rotate(180deg)' }}></i> Fecha y Hora de Cierre<span className="text-danger">*</span>
                                </label>
                                <input
                                    type="datetime-local"
                                    id="endTime"
                                    className="form-control border-primary"
                                    {...register("endTime", { required: "Ingrese la fecha y hora de cierre" })}
                                />
                                {spaceInfo && (
                                        <span
                                            className="mt-1 text-black-50 font-italic"
                                            style={{fontSize: ".85rem"}}
                                        >
                                        Hora de cierre: {spaceInfo.closeTime}
                                    </span>
                                )}
                                {errors.endTime && <div className="input-text-error show">{errors.endTime.message}</div>}
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
                title="¿Desea realizar la solicitud de espacio?"
                bodyText="Una vez realizada la solicitud, no podrá ser revertida."
                onButtonClick={() => {
                    handleHideConfirmationModal();
                    handleSubmit(handleFinalSubmit)();
                }}
            />
        </>
    );
}

export default SpaceLoan;