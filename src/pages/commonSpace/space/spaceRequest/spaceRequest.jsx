import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { usePage } from "../../../../context/pageContext.jsx";
import DynamicTable from "../../../../components/dynamicTable/dynamicTable.jsx";
import {Button, Modal} from "react-bootstrap";
import {formatEventTime} from "../../functions/commonUseFunctions.jsx";

const SpaceRequest = () => {
    const { setPageName } = usePage();
    const [space, setSpace] = useState(null);
    const [spaces, setSpaces] = useState([]);
    const [brands, setBrands] = useState([]);
    const [spaceId, setSpaceId] = useState(-1);
    const [equipment, setEquipment] = useState([]);
    const [numPeople, setNumPeople] = useState('');
    const [eventDesc, setEventDesc] = useState('');
    const [eventObs, setEventObs] = useState('');
    const [useEquipment, setUseEquipment] = useState(false);
    const [eventDate, setEventDate] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    useEffect(() => {
        setPageName("Solicitud de espacios");
    }, [setPageName]);

    useEffect(() => {
        fetch('http://localhost:8080/common-space/equipment-by-space', { method: 'GET', credentials: 'include' })
            .then(response => response.json())
            .then(data => setSpaces(data))
            .catch(error => console.error('Error fetching spaces:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/common-space/brands', { method: 'GET', credentials: 'include' })
            .then(response => response.json())
            .then(data => setBrands(data))
            .catch(error => console.error('Error fetching brands:', error));
    }, [])

    const handleSpaceChange = (e) => {
        const curSpaceId = e.target.value;
        const selected = spaces.find(space => space.space.id === parseInt(curSpaceId));

        setSpace(selected);
        setSpaceId(curSpaceId);

        // Map equipment to replace brandId with brand name
        const equipmentWithBrandNames = selected.equipment.map(eq => {
            const brand = brands.find(b => b.id === eq.brandId);
            return {
                ...eq,
                brandId: brand ? brand.name : 'Sin marca' // Replace brandId with brand name or default
            };
        });

        setEquipment(equipmentWithBrandNames);
    };

    const handleSubmit = (sp) => {
        sp.preventDefault();

        const selectedOpenTime = space.space.openTime;
        const selectedCloseTime = space.space.closeTime;

        if (startTime < selectedOpenTime || endTime > selectedCloseTime) {
            setShowErrorModal(true);
            alert(`Error: El horario del evento debe de ser entre ${selectedOpenTime} - ${selectedCloseTime}`);
            return;
        }

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

    const resetForm = () => {
        setSpaceId('');
        setNumPeople('');
        setEventDesc('');
        setEventObs('');
        setEventDate('');
        setStartDate('');
        setEndDate('');
        setStartTime('');
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
                                            {space.name} - {space.spaceCode}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="mb-1 row align-items-center">
                            <label htmlFor="numPeople" className="form-label text-black">
                                <i className="fas fa-users"></i> Cantidad de personas
                            </label>
                            <div className="col-sm">
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
                            { space && (
                                <span className="mt-1 text-primary font-italic">Capacidad máxima del espacio: {space?.space?.maxPeople}</span>
                            )}
                        </div>
                        <div className="mb-3 row align-items-center">
                            <label htmlFor="eventDesc" className="form-label text-black">
                                <i className="fas fa-file-alt"></i> Propósito de la Solicitud
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
                        <div className="mb-2 row d-flex align-items-center">
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
                            <div className="row col d-flex align-content-end" style={{marginLeft: ".6vw"}}>
                                <div className="col">
                                    <label className="form-label text-black">
                                        <i className="fas fa-calendar-days"></i> Seleccione la fecha del evento
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
                        </div>
                        <div className="mb-3 row align-items-center">
                            <div className="col-sm-6">
                                <label htmlFor="openTime" className="col-form-label form-label text-black">
                                    <i className="fas fa-clock"></i> Hora de inicio
                                </label>
                                <input
                                    type="time"
                                    id="openTime"
                                    className="form-control border-primary"
                                    value={startTime}
                                    min={space?.space?.openTime}
                                    max={space?.space?.closeTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="col-sm-6">
                                <label htmlFor="closeTime" className="col-form-label form-label text-black">
                                    <i className="fas fa-clock"></i> Hora de finalización
                                </label>
                                <input
                                    type="time"
                                    id="closeTime"
                                    className="form-control border-primary"
                                    value={endTime}
                                    min={space?.space?.openTime}
                                    max={space?.space?.closeTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    required
                                />
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
                                    required
                                    style={{height: '7vh', resize: 'none'}}
                                />
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <div className="col-sm-6">
                                <Button className="btn btn-danger btn-lg w-100 shadow-sm me-4"
                                        id='cancel'
                                        onClick={resetForm}>
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
                            {equipment.length > 0 ? (
                                <DynamicTable
                                    items={equipment}
                                    columns={columns}
                                />
                            ) : (
                                <h4 className="font-italic">No hay equipo disponible para este espacio.</h4>
                            )}
                        </div>
                    </div>
                )}
                <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Éxito</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Se ha enviado la solicitud exitosamente!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowSuccessModal(false)}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Error Modal */}
                <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Hubo un problema enviar la solicitud. Por favor, intente nuevamente.</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
};

export default SpaceRequest;
