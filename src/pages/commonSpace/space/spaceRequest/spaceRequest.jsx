import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { usePage } from "../../../../context/pageContext.jsx";
import DynamicTable from "../../../../components/dynamicTable/dynamicTable.jsx";
import {Button} from "react-bootstrap";
import {formatEventTime, handleTimeSetting, isEmptyString} from "../../../../declarations/commonUseFunctions.js";
import ConfirmationModal from "../../../../components/confirmation/ConfirmationModal.jsx";
import SuccessModal from "../../../../components/modal/success/SuccessModal.jsx";
import ErrorModal from "../../../../components/modal/error/ErrorModal.jsx";

const SpaceRequest = () => {
    const { setPageName } = usePage();
    const [space, setSpace] = useState(null);
    const [spaces, setSpaces] = useState([]);
    const [brands, setBrands] = useState([]);
    const [spaceId, setSpaceId] = useState(-1);
    const [equipments, setEquipments] = useState([]);
    const [numPeople, setNumPeople] = useState('');
    const [eventDesc, setEventDesc] = useState('');
    const [eventObs, setEventObs] = useState('');
    const [useEquipment, setUseEquipment] = useState(false);
    const [eventDate, setEventDate] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [minTime, setMinTime] = useState('');
    const [maxTime, setMaxTime] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const [showCancellationModal, setShowCancellationModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    useEffect(() => {
        setPageName("Solicitud de espacios");

        fetch('http://localhost:8080/common-space/equipment-by-space', { method: 'GET', credentials: 'include' })
            .then(response => response.json())
            .then(data => setSpaces(data))
            .catch(error => console.error('Error fetching spaces:', error));

        fetch('http://localhost:8080/common-space/brands', { method: 'GET', credentials: 'include' })
            .then(response => response.json())
            .then(data => setBrands(data))
            .catch(error => console.error('Error fetching brands:', error));

    }, [setPageName]);

    const handleSpaceChange = (e) => {
        const curSpaceId = e.target.value;
        const selected = spaces.find(space => space.space.id === parseInt(curSpaceId));

        setSpace(selected);
        setSpaceId(curSpaceId);

        setMinTime(handleTimeSetting(selected.space?.openTime, 1));
        setMaxTime(handleTimeSetting(selected.space?.closeTime, 1, true));

        // Map equipment to replace brandId with brand name
        const equipmentWithBrandNames = selected.equipment?.map(eq => {
            const brand = brands.find(b => b.id === eq.brandId);
            return {
                ...eq,
                brandId: brand ? brand.name : 'Sin marca' // Replace brandId with brand name or default
            };
        });

        setEquipments(equipmentWithBrandNames);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowConfirmationModal(true);
    }

    const verifyCancel = () => setShowCancellationModal(true);

    const handleConfirm = () => {
        if (startTime < minTime || endTime > maxTime) {
            setShowErrorModal(true);
            alert(`Error: El horario del evento debe de ser entre ${minTime} - ${maxTime}`);
            return;
        }

        if(isEmptyString(eventObs)) { setEventObs("No hay observaciones"); }

        const newSpaceRequest = {
            spaceId,
            numPeople,
            eventDesc,
            eventObs,
            statusId: 1,
            useEquipment,
            startTime: formatEventTime(startDate, startTime),
            endTime: formatEventTime(endDate, endTime)
        };

        console.log('Request payload:', newSpaceRequest); // Debug log

        fetch('http://localhost:8080/common-space/request/space-request&reservation', {method: 'POST', credentials: 'include',
            headers: {'Content-Type': 'application/json'}, body: JSON.stringify(newSpaceRequest)})
            .then(response => {
                if (!response.ok) { throw new Error('Network response was not ok'); }
                return response.json();
            })
            .then(() => {
                setShowSuccessModal(true);
            })
            .catch(error => {
                console.error('Error adding space request:', error);
                setShowErrorModal(true);
            });
    }

    const columns = [
        { header: 'Nombre', accessor: 'name' },
        { header: 'Cantidad', accessor: 'quantity' },
        { header: 'Marca', accessor: 'brandId' } // Now brandId contains the brand name
    ];

    const handleCancel = () => {
        setNumPeople('');
        setEventDesc('');
        setEventObs('');
        setEventDate('');
        setStartDate('');
        setEndDate('');
        setStartTime('');
        setUseEquipment(false);
        setEndTime('');
    }

    return (
        <div>
            <nav aria-label="breadcrumb" className="mt-0">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/app">Inicio</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Solicitud de Espacios</li>
                </ol>
            </nav>

            <div className="d-flex justify-content-center">
                <div className="card p-5 shadow-lg" style={{ minWidth: "50vw",  maxWidth: "70vw",  minHeight: "70vh",  borderRadius: "2vh", marginLeft: "1.5vw"}}>
                    <h1 className="text-center mb-2">Solicitud y Reservación de Espacios</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 row align-items-center">
                            <label htmlFor="spaceSelect" className="form-label text-black">
                                <i className="fas fa-building"></i> Seleccione el espacio que desea solicitar
                                <span className="ml-2 text-danger fw-bold">*</span>
                            </label>
                            <div className="col">
                                <select
                                    id="spaceSelect"
                                    className="form-control border-primary"
                                    onChange={(space) => {
                                        handleSpaceChange(space);
                                    }}
                                    defaultValue=""
                                >
                                    <option value="">Seleccione un espacio</option>
                                    {spaces.map(({space}) => (
                                        <option key={space.id} value={space.id}>
                                            {space.spaceCode} - {space.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="mb-1 row align-items-center">
                            <label htmlFor="numPeople" className="form-label text-black">
                                <i className="fas fa-users"></i> Cantidad de personas
                                <span className="ml-2 text-danger fw-bold">*</span>
                            </label>
                            <div className="col-sm mb-1">
                                <input
                                    type="number"
                                    id="numPeople"
                                    min="1"
                                    max={space?.space?.maxPeople}
                                    className="form-control border-primary"
                                    placeholder="Ingrese la cantidad de personas que van a asistir al evento"
                                    value={numPeople}
                                    onChange={(e) => setNumPeople(e.target.value)}
                                    required
                                />
                            </div>
                            {space && (
                                <span
                                    className="mt-1 text-primary font-italic">Capacidad máxima del espacio: {space?.space?.maxPeople}</span>
                            )}
                        </div>
                        <div className="mb-3 row align-items-center">
                            <label htmlFor="eventDesc" className="form-label text-black">
                                <i className="fas fa-file-alt"></i> Propósito de la Solicitud
                                <span className="ml-2 text-danger fw-bold">*</span>
                            </label>
                            <div className="col">
                                <textarea
                                    id="eventDesc"
                                    className="form-control border-primary"
                                    value={eventDesc}
                                    onChange={(e) => setEventDesc(e.target.value)}
                                    required
                                    style={{height: '7vh', resize: 'none'}}
                                />
                            </div>
                        </div>
                        <div className="mb-3 row align-items-center">
                            <div className="col-sm-6">
                                <label htmlFor="openTime" className="col-form-label form-label text-black">
                                    <i className="fas fa-clock"></i> Hora de inicio
                                    <span className="ml-2 text-danger fw-bold">*</span>
                                </label>
                                <input
                                    type="time"
                                    id="openTime"
                                    className="form-control border-primary"
                                    value={startTime}
                                    min={minTime}
                                    max={maxTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="col-sm-6">
                                <label htmlFor="closeTime" className="col-form-label form-label text-black">
                                    <i className="fas fa-clock"></i> Hora de finalización
                                    <span className="ml-2 text-danger fw-bold">*</span>
                                </label>
                                <input
                                    type="time"
                                    id="closeTime"
                                    className="form-control border-primary"
                                    value={endTime}
                                    min={minTime}
                                    max={maxTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-2 row d-flex align-items-center">
                            <div className="row col d-flex align-content-end" style={{marginRight: ".6vw"}}>
                                <div className="col">
                                    <label className="form-label text-black">
                                        <i className="fas fa-calendar-days"></i> Seleccione la fecha del evento
                                        <span className="ml-2 text-danger fw-bold">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        id="eventDate"
                                        className="form-control mt-2 border-primary"
                                        name="eventDate"
                                        value={eventDate}
                                        onChange={(e) => {
                                            setEventDate(e.target.value);
                                            setStartDate(e.target.value);
                                            setEndDate(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="mb-3 row" style={{maxWidth: "50%"}}>
                                <label className="form-label text-black">
                                    <i className="fas fa-computer"></i> Desea utilizar el equipo tecnológico disponible?
                                </label>
                                <div className="col d-flex align-items-center">
                                    <div className="form-check mr-auto">
                                        <input
                                            type="radio"
                                            id="useEquipmentYes"
                                            className="form-check-input"
                                            name="useEquipment"
                                            value="true"
                                            checked={useEquipment === true}
                                            onChange={() => setUseEquipment(true)}
                                        />
                                        <label htmlFor="useEquipmentYes" className="form-check-label">Sí</label>
                                    </div>
                                    <div className="form-check mr-4">
                                        <input
                                            type="radio"
                                            id="useEquipmentNo"
                                            className="form-check-input"
                                            name="useEquipment"
                                            value="false"
                                            checked={useEquipment === false}
                                            onChange={() => setUseEquipment(false)}
                                        />
                                        <label htmlFor="useEquipmentNo" className="form-check-label">No</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-3 row align-items-center">
                            <label htmlFor="eventDesc" className="form-label text-black">
                                <i className="fas fa-file-alt"></i> Observaciones
                            </label>
                            <div className="col">
                                <textarea
                                    id="eventObs"
                                    className="form-control border-primary"
                                    value={eventObs}
                                    onChange={(e) => setEventObs(e.target.value)}
                                    style={{height: '7vh', resize: 'none'}}
                                />
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <div className="col-sm-6">
                                <Button className="btn btn-danger btn-lg w-100 shadow-sm me-4"
                                        id='cancel'
                                        onClick={verifyCancel}>
                                    <i className="fas fa-times"></i> Cancelar
                                </Button>
                            </div>
                            <div className="col-sm-6">
                                <Button className="btn btn-lg btn-custom w-100 shadow-sm" type="submit">
                                    <i className="fas fa-save"></i> Guardar
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
                {space && (
                    <div className="mt-5 mb-5 d-flex container-fluid" style={{maxWidth: "40vw", marginLeft: "0vw"}}>
                        <div className="container shadow-lg card" style={{borderRadius: "2vh", padding: "1vw"}}>
                            <h3 className="mb-4">Equipo tecnológico disponible para <strong>{space.space.name}:</strong>
                            </h3>
                            {equipments.length > 0 ? (
                                <DynamicTable
                                    items={equipments}
                                    columns={columns}
                                />
                            ) : (
                                <h4 className="font-italic">No hay equipo disponible para este espacio.</h4>
                            )}
                        </div>
                    </div>
                )}
                {/* Confirmation modal */}
                <ConfirmationModal
                    show={showConfirmationModal}
                    onHide={() => setShowConfirmationModal(false)}
                    confirmAction="guardar"
                    onConfirm={handleConfirm}
                />

                {/* Cancelation modal */}
                <ConfirmationModal
                    show={showCancellationModal}
                    onHide={() => setShowCancellationModal(false)}
                    confirmAction="eliminar"
                    onConfirm={handleCancel}
                />

                {/* Success Modal */}
                <SuccessModal
                    show={showSuccessModal}
                    onHide={() => setShowSuccessModal(false)}
                    title="Operación Exitosa"
                    message="La solicitud se ha realizado correctamente."
                />

                {/* Error Modal */}
                <ErrorModal
                    show={showErrorModal}
                    onHide={() => setShowErrorModal(false)}
                    title="Error"
                    message="Hubo un problema al realizar la solicitud. Por favor, intenta nuevamente."
                />
            </div>
        </div>
    )
};

export default SpaceRequest;
