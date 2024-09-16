import React, {useState, useEffect, useRef} from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './addSpace.css';

const AddSpace = () => {
    const [name, setName] = useState(''); // State for floorId
    const [spaceCode, setSpaceCode] = useState(''); // State for the space code
    const [maxPeople, setMaxPeople] = useState(''); // State for the max people
    const [buildings, setBuildings] = useState([]);
    const [buildingId, setBuildingId] = useState('');
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [buildingLocation, setBuildingLocation] = useState(''); // State for space location
    const [types, setTypes] = useState([]); // State for space type
    const [spaceType, setSpaceType] = useState(''); // State for product type
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    const formRef = useRef(null);

    useEffect(() => {
        fetch('http://localhost:8080/common-space/locations-by-building', { method: 'GET',  credentials: 'include' })
            .then(response => response.json())
            .then(data => { setBuildings(data); })
            .catch(error => console.error('Fetch error:', error));

        fetch('http://localhost:8080/common-space/types', { method: 'GET',  credentials: 'include' })
            .then(response => response.json())
            .then(data => {
                setTypes(data);
                if (data.length > 0) {
                    setSpaceType(data[0].type);
                }
            })
            .catch(error => console.error('Fetch error:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newSpace = {
            name,
            spaceCode,
            maxPeople,
            spaceType,
            spaceStatus: 1,
            buildingLocation,
        };
        console.log(newSpace);

        fetch('http://localhost:8080/common-space/create', {method: 'POST', credentials: 'include',
            headers: {'Content-Type': 'application/json'}, body: JSON.stringify(newSpace)})
            .then(response => {
                if (!response.ok) { throw new Error('Network response was not ok'); }
                return response.json();
            })
            .then(() => {
                setShowSuccessModal(true);
                setName('');
            })
            .catch(error => {
                console.error('Error adding brand:', error);
                setShowErrorModal(true);
            });

    };

    const handleRegisterSt = () => {
        window.location.href = 'addSpaceType';
    };
    const handleRegisterBld = () => {
        window.location.href = 'addBuilding';
    };
    const handleRegisterBloc = () => {
        window.location.href = 'addBuildingLocation';
    };


    return (
        <div className="main-container">
            <div className="button-container">
                <h1>Registro de espacios</h1>
                <div className="button-group">
                    <button className="button-5" role="button" onClick={handleRegisterSt}>Registro tipos de espacio </button>
                    <button className="button-5" role="button" onClick={handleRegisterBld}>Registro de edificios </button>
                    <button className="button-5" role="button" onClick={handleRegisterBloc}>Registro de ubicaciones </button>
                </div>
            </div>
            <div className="container2">
                <div className="container3">
                    <h3>Información del espacio</h3><br></br>
                    <form ref={formRef} onSubmit={handleSubmit}>
                        <div className="form-group">
                            <div className="input-group">
                                <label htmlFor="name">Nombre del espacio</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="spaceCode">Código del espacio</label>
                                <input
                                    type="number"
                                    id="spaceCode"
                                    value={spaceCode}
                                    onChange={(e) => setSpaceCode(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="input-group">
                                <label htmlFor="type">Tipo de espacio</label>
                                <select
                                    id="type"
                                    value={spaceType}
                                    onChange={(e) => setSpaceType(e.target.value)}
                                    required
                                >
                                    <option>Seleccione un tipo de espacio</option>
                                    {types.map((type) => (
                                        <option key={type.id} value={type.id}>
                                            {type.type}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="input-group">
                                <label htmlFor="maxPeople">Capacidad máxima de personas</label>
                                <input
                                    type="number"
                                    id="maxPeople"
                                    value={maxPeople}
                                    onChange={(e) => setMaxPeople(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="input-group">
                                <label htmlFor="buildingId">Edificio</label>
                                <select
                                    id="buildingId"
                                    value={buildingId}
                                    onChange={(e) => {
                                        const currBuildingId = e.target.value;

                                        const selectedBuilding = buildings.find(
                                            building => building.building.id === parseInt(currBuildingId)
                                        );
                                        if (selectedBuilding) { setFilteredLocations(selectedBuilding.locations); }
                                        else { setFilteredLocations([]); }

                                        if (currBuildingId !== "") {
                                            setBuildingId(currBuildingId);
                                        }
                                    }}
                                    required
                                >
                                    <option value="">Seleccione un edificio</option>
                                    {buildings.map((building) => (
                                        <option key={building.building.id} value={building.building.id}>
                                            {building.building.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="input-group">
                                <label htmlFor="buildingLocation">Ubicaciones del edificio</label>
                                <select
                                    id="buildingLocation"
                                    value={buildingLocation}
                                    onChange={(e) => setBuildingLocation(e.target.value)}  // Capture selected location
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

                        <div className="button">
                            <button className="button-5" type="submit" role="button">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
            {/* Success Modal */}
            <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Éxito</Modal.Title>
                </Modal.Header>
                <Modal.Body>El espacio se ha guardado exitosamente!</Modal.Body>
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
                <Modal.Body>Hubo un problema al guardar el espacio. Por favor, intente nuevamente.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AddSpace;
