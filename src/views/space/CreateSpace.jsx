/**
 * CreateSpace Component
 * 
 * This component is used to create a new space in the system.
 * It includes a form with fields for space name, code, location, capacity, open and close times, and space status.
 * It also includes a modal for confirming the creation of the space.
 * It uses React hooks for state management and form handling.
 * It also uses Material-UI for styling and icons.
 */
import {useState, useRef, useEffect} from 'react';
import InputMask from 'react-input-mask';
import { NumericFormat } from 'react-number-format';
import '../../style/createPage.css'
import SaveButton from "../../components/button/SaveButton.jsx";
import GenericModal from "../../components/popUp/generic/GenericModal.jsx";
import {toast} from "react-hot-toast";
import SpaceBanner from "./SpaceBanner.jsx";
import useSpaceStatusData from "../../hooks/apiData/spaceStatus/SpaceStatusData.jsx";
import SpaceStatusModal from "../../components/popUp/spaceStatus/SpaceStatusModal.jsx";
import useBuildingLocationData from "../../hooks/apiData/buildingLocation/BuildingLocationData.jsx";
import {saveSpace} from "../../api/space/space_API.js";
import {useNavigate} from "react-router-dom";
import {StatusTranslator} from "../../util/Translator.js";

const initialData = {
    name: '',
    spaceCode: '',
    buildingLocation: '',
    maxPeople: '',
    openTime: '',
    closeTime: '',
    spaceStatusId: 0
};

/**
 * CreateSpace component that allows users to create a new space.
 * 
 * @component
 * @returns {JSX.Element} - The CreateSpace component.
 */
const CreateSpace = () => {

    const [formData, setFormData] = useState(initialData);
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate()

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const handleShowConfirmationModal = () => setShowConfirmationModal(true);
    const handleHideConfirmationModal = () => setShowConfirmationModal(false);

    const formRef = useRef(null);

    const [openStatesSpaceModal, setOpenStatesSpaceModal] = useState(false);

    const handleOpenStatesSpaceModal = () => setOpenStatesSpaceModal(true);
    const handleCloseStatesSpaceModal = () => setOpenStatesSpaceModal(false);

    const [buildingLocationData, setBuildingLocationData] = useState([]);
    const [spaceStatusData, setSpaceStatusData] = useState([]);

    const {buildingLocations } = useBuildingLocationData()
    const {spaceStatus} = useSpaceStatusData()


    useEffect(() => {
       if (buildingLocations?.data && Array.isArray(buildingLocations.data)) setBuildingLocationData(buildingLocations.data);
       if (spaceStatus?.data && Array.isArray(spaceStatus.data)) setSpaceStatusData(spaceStatus.data);
    }, [buildingLocations,spaceStatus])

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
     * Validates the form data and checks for errors before submission.
     * 
     * @returns {void}
     */
    const checkErrors = () => {
        const errors = {};
        setFormErrors(errors);

        if (!formData.name) errors.name = "El nombre del espacio es obligatorio.";
        if (!formData.spaceCode) errors.spaceCode = "El código del espacio es obligatorio.";
        if (!formData.maxPeople) errors.maxPeople = "La capacidad máxima es obligatoria.";
        if (!formData.buildingLocation) errors.buildingLocation = "La ubicación es obligatoria.";
        if (!formData.openTime) errors.openTime = "La hora de inicio es obligatoria.";
        if (!formData.closeTime) errors.closeTime = "La hora de cierre es obligatoria.";
        if (formData.openTime && formData.closeTime && formData.openTime >= formData.closeTime) {
            errors.timeRange = "La hora de inicio debe ser antes de la hora de cierre.";
        }
        if (!formData.spaceStatusId) errors.spaceStatusId = "El estado del activo es obligatorio.";

        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            handleShowConfirmationModal();
        }
    }

    /**
     * Handles the submission of the form data to create a new space.
     * 
     * @returns {void}
     */
    const handleSubmit = async () => {
        const spaceStatusName = spaceStatusData.find(status => status.id === parseInt(formData.spaceStatusId))?.name;
        const requestData = {
            name: formData.name,
            spaceCode: formData.spaceCode,
            buildingLocationId: parseInt(formData.buildingLocation),
            maxPeople: formData.maxPeople,
            openTime: formData.openTime,
            closeTime: formData.closeTime,
            spaceStatusName: spaceStatusName
        };
        try {
            const response = await saveSpace(requestData);
            toast.success(response.message, { duration: 7000 });
            setFormData(initialData); // Reset form after successful submission
            navigate('/app/spaceManagement');
        } catch (error) {
            console.error(error);
            toast.error(error.message, { duration: 7000 });
        } finally {
            setShowConfirmationModal(false);
        }
    };



    return (
        <>
            <SpaceBanner
                title="Creación de Espacio"
                visibleButtons={["goBack", "statusModal"]}
                handleOpen={handleOpenStatesSpaceModal}
            />
            <div className="container-fluid p-0">
                <div className="card p-4 shadow-lg" style={{ maxWidth: "100%", borderRadius: "15px" }}>
                    <form ref={formRef}>
                        <div className="row mb-4">
                            <div className="col-md-3 col-sm-6 col-12 mb-3">
                                <label htmlFor="name" className="form-label">
                                    <i className="fa-solid fa-signature"/> Nombre de Espacio <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="form-control border-primary"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Ej: A123"
                                    style={{ fontSize: ".9rem" }}
                                    required
                                />
                                {formErrors.name && <div className="input-text-error show">{formErrors.name}</div>}
                            </div>
                            <div className="col-md-3 col-sm-6 col-12 mb-3">
                                <label htmlFor="spaceCode" className="form-label">
                                    <i className="fas fa-barcode"></i> Código de Espacio <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="spaceCode"
                                    id="spaceCode"
                                    className="form-control border-primary"
                                    value={formData.spaceCode}
                                    onChange={(e) => {
                                        const numericValue = e.target.value.replace(/\D/g, ""); // Elimina todo lo que no sea número
                                        handleChange({ target: { name: "spaceCode", value: numericValue } });
                                    }}
                                    placeholder="Ej: 123456"
                                    style={{ fontSize: ".9rem" }}
                                    required
                                />

                                {formErrors.spaceCode && <div className="input-text-error show">{formErrors.spaceCode}</div>}
                            </div>
                            <div className="col-md-3 col-sm-6 col-12 mb-3">
                                <label htmlFor="maxPeople" className="form-label">
                                    <i className="fa-solid fa-people-roof"></i> Capacidad Máxima <span className="text-danger">*</span>
                                </label>
                                <NumericFormat
                                    name="maxPeople"
                                    id="maxPeople"
                                    className="form-control border-primary"
                                    value={formData.maxPeople}
                                    style={{ fontSize: ".9rem" }}
                                    onValueChange={(values) => {
                                        const { value } = values;

                                        const maxValue = 80;
                                        if (value <= maxValue) {
                                            setFormData((prev) => ({
                                                ...prev,
                                                maxPeople: value || '',
                                            }));

                                             if (formErrors.maxPeople) {
                                                setFormErrors((prevErrors) => ({
                                                    ...prevErrors,
                                                    maxPeople: ''
                                                }));
                                            }
                                        } else {
                                            setFormErrors((prevErrors) => ({
                                                ...prevErrors,
                                                maxPeople: 'El valor no puede exceder el máximo de 80',
                                            }));
                                        }
                                    }}
                                    thousandSeparator={false}
                                    decimalScale={0}
                                    fixedDecimalScale={false}
                                    allowNegative={false}
                                    isNumericString={true}
                                    placeholder="Ej: 5000"
                                />

                                {formErrors.maxPeople && <div className="input-text-error show">{formErrors.maxPeople}</div>}
                            </div>
                            <div className="col-md-3 col-sm-6 col-12 mb-3">
                                <label htmlFor="buildingLocation" className="form-label">
                                    <i className="fas fa-map-marker-alt"></i> Ubicación <span className="text-danger">*</span>
                                </label>
                                <select
                                    name="buildingLocation"
                                    id="buildingLocation"
                                    className="form-select border-primary"
                                    value={formData.buildingLocation}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Seleccionar Ubicación</option>
                                    {buildingLocationData.map((buildingLocation) => (
                                        <option key={buildingLocation.id} value={buildingLocation.id}>
                                            Edificio: {buildingLocation.building.name} - Piso: {buildingLocation.floor}
                                        </option>
                                    ))}
                                </select>
                                {formErrors.buildingLocation && <div className="input-text-error show">{formErrors.buildingLocation}</div>}
                            </div>
                        </div>

                        <div className="row mb-4">
                            <div className="col-md-3 col-sm-6 col-12 mb-3">
                                <label htmlFor="openTime" className="form-label">
                                    <i className="fas fa-clock"></i> Hora de Inicio <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="time"
                                    name="openTime"
                                    id="openTime"
                                    className="form-control border-primary"
                                    value={formData.openTime}
                                    onChange={handleChange}
                                    placeholder="Ej: A123"
                                    style={{ fontSize: ".9rem" }}
                                    required
                                />
                                {formErrors.openTime && <div className="input-text-error show">{formErrors.openTime}</div>}
                                {formErrors.timeRange && <div className="input-text-error show">{formErrors.timeRange}</div> }
                            </div>
                            <div className="col-md-3 col-sm-6 col-12 mb-3">
                                <label htmlFor="closeTime" className="form-label">
                                    <i className="fas fa-clock"></i> Hora de Cierre <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="time"
                                    name="closeTime"
                                    id="closeTime"
                                    className="form-control border-primary"
                                    value={formData.closeTime}
                                    onChange={handleChange}
                                    placeholder="Ej: A123"
                                    style={{ fontSize: ".9rem" }}
                                    required
                                />
                                {formErrors.closeTime && <div className="input-text-error show">{formErrors.closeTime}</div>}
                            </div>

                            <div className="col-md-3 col-sm-6 col-12 mb-3">
                                <label htmlFor="spaceStatusId" className="form-label">
                                    <i className="fas fa-exclamation-circle"></i> Estado del Espacio <span className="text-danger">*</span>
                                </label>
                                <select
                                    name="spaceStatusId"
                                    id="spaceStatusId"
                                    className="form-select border-primary"
                                    value={formData.spaceStatusId}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Seleccionar estado</option>
                                    {spaceStatusData.map((status) => {
                                        const isDisabled = [2, 4, 5].includes(status.id); 
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
                                {formErrors.spaceStatusId && <div className="input-text-error show">{formErrors.spaceStatusId}</div>}
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
                title="¿Desea guardar el espacio?"
                bodyText="Si guarda el espacio se podrá solicitar posteriormente por otro usuario."
                onButtonClick={handleSubmit}
            />
            <SpaceStatusModal
                open={openStatesSpaceModal}
                onClose={handleCloseStatesSpaceModal}
                spaceStatuses={spaceStatusData} />

        </>
    );
};

export default CreateSpace;