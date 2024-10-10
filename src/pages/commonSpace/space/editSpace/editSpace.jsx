import React, {useState, useEffect} from 'react';
import {Modal, Button, ListGroup} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './editSpace.css'
import {usePage} from "../../../../context/pageContext.jsx";
import {formatTime} from "../../functions/commonUseFunctions.jsx";

const EditSpace = () => {
    const { setPageName } = usePage();
    const [name, setName] = useState('');
    const [space, setSpace] = useState('');
    const [spaces, setSpaces] = useState([]);
    const [spaceId, setSpaceId] = useState(-1);
    const [openTime, setOpenTime] = useState('');
    const [closeTime, setCloseTime] = useState('');
    const [spaceCode, setSpaceCode] = useState('');
    const [maxPeople, setMaxPeople] = useState('');
    const [buildings, setBuildings] = useState([]);
    const [buildingId, setBuildingId] = useState('');
    const [trackUpdate, setTrackUpdate] = useState([]);
    const [currentStep, setCurrentStep] = useState(1);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [buildingLocation, setBuildingLocation] = useState('');
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    useEffect(() => {
        setPageName("Editar espacio");
    }, [setPageName]);

    useEffect(() => {
        fetch('http://localhost:8080/common-space/all', { method: 'GET', credentials: 'include' })
            .then(response => response.json())
            .then(data => { setSpaces(data); })
            .catch(error => console.error('Fetch error:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/common-space/locations-by-building', { method: 'GET',  credentials: 'include' })
            .then(response => response.json())
            .then(data => { setBuildings(data); })
            .catch(error => console.error('Fetch error:', error));
    }, []);

    const handleSelectSpace = (space) => {
        setSpace(space);
        setName(space.name);
        setSpaceId(space.id);
        setSpaceCode(space.spaceCode);

        setCurrentStep(2);
    };

    const handleSubmit = (sp) => {
        sp.preventDefault();

        const editedSpace = {
            name,
            spaceCode,
            maxPeople,
            spaceStatus: 1,
            buildingLocation,
            openTime,
            closeTime
        };

        console.log(editedSpace);

        fetch(`http://localhost:8080/common-space/edit/space/${spaceId}`, {method: 'PUT', credentials: 'include',
        headers: {'Content-Type': 'application/json'}, body: JSON.stringify(editedSpace)})
            .then(response => {
                if (!response.ok) { throw new Error('Network response was not ok'); }
                return response.json();
            })
            .then(data => {
                setShowSuccessModal(true);
                resetForm();

                setTimeout(() => {
                    setSpace(data)
                    updateTracking();
                }, 2000);

                setTimeout(() => {setTrackUpdate([])}, 3000);
            })
            .catch(error => {
                console.error('Error adding brand:', error);
                setShowErrorModal(true);
            });
    }

    const resetForm = () => {
        setMaxPeople('');
        setBuildingId('');
        setBuildingLocation('');
        setOpenTime('');
        setCloseTime('');
    }

    const goBackToPreviousStep = ()=> {
        setName('');
        setSpace('');
        setSpaceCode('');
        setCurrentStep(1);
    }

    const updateTracking = () => {
        if (maxPeople !== space.maxPeople) trackUpdate.push('maxPeople');
        if (buildingLocation !== space.location.floor) trackUpdate.push('buildingLocation');
        if (openTime !== space.openTime) trackUpdate.push('openTime');
        if (closeTime !== space.closeTime) trackUpdate.push('closeTime');
    }


    return (
        <div>
            <nav aria-label="breadcrumb" className="mb-5">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/app">Inicio</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Edición de Espacios</li>
                </ol>
            </nav>

            <div className="mt-4 d-flex justify-content-center">
                <div className="card p-5 shadow-lg"  style={{minWidth: "50vw", maxWidth: "70vw", maxHeight: "75vh", borderRadius: "2vh", marginLeft: "2vw"}}>
                    <h1 className="text-center mb-3">Edición de Espacios</h1>
                    <div className="mb-3">
                        <div>
                            {currentStep === 1 && (
                                <div>
                                    <h3>Seleccione el espacio a editar</h3>
                                    <div className='form-group'>
                                        <div className='input-group'>
                                            <select
                                                id="spaceId"
                                                value={spaceId}
                                                onChange={(e) => {
                                                    const selectedSpace = spaces.find(s => s.id === parseInt(e.target.value));
                                                    if (selectedSpace) handleSelectSpace(selectedSpace);
                                                }}
                                            >
                                                <option value="">Seleccione un espacio</option>
                                                {spaces.map(currentSpace => (
                                                    <option key={currentSpace.id} value={currentSpace.id}>
                                                        {currentSpace.id} - {currentSpace.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {currentStep === 2 && (
                                <div>
                                    <div>
                                        <form onSubmit={handleSubmit}>
                                            <div className="row align-items-center mt-4">
                                            <label htmlFor="name" className="col-sm-4 col-form-label form-label text-black">
                                                    <i className="fas fa-tag"></i> Nombre del espacio
                                                </label>
                                                <div className="col-sm-8 w-100 mb-4">
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        className="form-control border-primary"
                                                        placeholder={name}
                                                        disabled={true}
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-4 row align-items-center">
                                                <label htmlFor="spaceCode" className="col-sm-4 col-form-label form-label text-black">
                                                    <i className="fas fa-code"></i> Código del espacio
                                                </label>
                                                <div className="col-sm-8">
                                                    <input
                                                        type="text"
                                                        id="spaceCode"
                                                        className="form-control border-primary"
                                                        value={spaceCode}
                                                        disabled={true}
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-4 row align-items-center">
                                                <label htmlFor="maxPeople" className="col-sm-4 col-form-label form-label text-black">
                                                    <i className="fas fa-users"></i> Capacidad máxima de personas
                                                </label>
                                                <div className="col-sm-8">
                                                    <input
                                                        type="number"
                                                        id="maxPeople"
                                                        className="form-control border-primary"
                                                        placeholder="Ingresa la capacidad máxima de personas"
                                                        value={maxPeople}
                                                        onChange={(e) => setMaxPeople(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-4 row align-items-center">
                                                <label htmlFor="buildingId" className="col-sm-4 col-form-label form-label text-black">
                                                    <i className="fas fa-building"></i> Edificio
                                                </label>
                                                <div className="col-sm-8">
                                                    <select
                                                        id="buildingId"
                                                        className="form-control border-primary"
                                                        value={buildingId}
                                                        onChange={(e) => {
                                                            const currBuildingId = e.target.value;
                                                            const selectedBuilding = buildings.find(
                                                                building => building.building.id === parseInt(currBuildingId)
                                                            );
                                                            if (selectedBuilding) {
                                                                setFilteredLocations(selectedBuilding.locations);
                                                            } else {
                                                                setFilteredLocations([]);
                                                            }
                                                            setBuildingId(currBuildingId);
                                                        }}
                                                        required
                                                    >
                                                        <option value="">Seleccione un edificio</option>
                                                        {buildings.map((currBuilding) => (
                                                            <option key={currBuilding.building.id} value={currBuilding.building.id}>
                                                                {currBuilding.building.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="mb-3 row align-items-center">
                                                <label htmlFor="buildingLocation"
                                                       className="col-sm-4 col-form-label form-label text-black">
                                                    <i className="fas fa-map-marker-alt"></i> Ubicaciones del edificio
                                                </label>
                                                <div className="col-sm-8">
                                                    <select
                                                        id="buildingLocation"
                                                        className="form-control border-primary"
                                                        value={buildingLocation}
                                                        onChange={(e) => setBuildingLocation(e.target.value)}
                                                        required
                                                    >
                                                        <option value="">Seleccione una ubicación</option>
                                                        {filteredLocations.map((location) => (
                                                            <option key={location.id} value={location.id}>
                                                                {location.floorId}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="mb-4 row align-items-center">
                                                <div className="col-sm-6">
                                                    <label htmlFor="openTime" className="col-form-label form-label text-black">
                                                        <i className="fas fa-clock"></i> Hora de apertura
                                                    </label>
                                                    <input
                                                        type="time"
                                                        id="openTime"
                                                        className="form-control border-primary"
                                                        value={openTime}
                                                        onChange={(e) => setOpenTime(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-sm-6">
                                                    <label htmlFor="closeTime" className="col-form-label form-label text-black">
                                                        <i className="fas fa-clock"></i> Hora de cierre
                                                    </label>
                                                    <input
                                                        type="time"
                                                        id="closeTime"
                                                        className="form-control border-primary"
                                                        value={closeTime}
                                                        onChange={(e) => setCloseTime(e.target.value)}
                                                        required
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

                                        <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Éxito</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>El espacio se ha editado exitosamente!</Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={() => setShowSuccessModal(false)}>
                                                    Cerrar
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                        <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Error</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>Hubo un problema al editar el espacio. Por favor, intente nuevamente.</Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
                                                    Cerrar
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                { currentStep === 2 && (
                    <div className="mt-5 mb-5 d-flex container-fluid" style={{maxWidth: "32vw", marginLeft: "1vw"}}>
                        <div className="container shadow-lg card" style={{borderRadius: "2vh", padding: "1vw"}}>
                            <h3 className="font-weight-bold">Datos actuales del espacio seleccionado</h3>
                            <div className="mb-3 w-100" style={{fontSize: ".9vw"}}>
                                <ListGroup>
                                    <ListGroup.Item>
                                        <strong>Nombre del espacio:</strong> {space.name}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <strong>Código del espacio:</strong> {spaceCode}
                                    </ListGroup.Item>
                                    <ListGroup.Item className={`list-group-item ${trackUpdate.includes('maxPeople') ? 'bg-success text-white' : ''}`}>
                                        <strong>Capacidad máxima de personas:</strong> {space.maxPeople}
                                    </ListGroup.Item>
                                    <ListGroup.Item className={`list-group-item ${trackUpdate.includes('buildingLocation') ? 'bg-success text-white' : ''}`}>
                                        <strong>Edificio:</strong> {space.location.building.name}
                                    </ListGroup.Item>
                                    <ListGroup.Item className={`list-group-item ${trackUpdate.includes('buildingLocation') ? 'bg-success text-white' : ''}`}>
                                        <strong>Ubicación:</strong> {space.location.floor}
                                    </ListGroup.Item>
                                    <ListGroup.Item className={`list-group-item ${trackUpdate.includes('openTime') || trackUpdate.includes('closeTime') ? 'bg-success text-white' : ''}`}>
                                        <strong>Horario:</strong> {formatTime(space.openTime)} - {formatTime(space.closeTime)}
                                    </ListGroup.Item>
                                </ListGroup>
                            </div>
                            <Button className="btn bg-dark w-100 shadow-sm" onClick={goBackToPreviousStep}>
                                <i className="fas fa-arrow-circle-left"></i> Volver a la selección de espacios
                            </Button>
                        </div>
                    </div>

                )}
            </div>
        </div>
    )
};

export default EditSpace;