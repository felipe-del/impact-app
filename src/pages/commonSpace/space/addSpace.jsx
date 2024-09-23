import React, {useState, useEffect, useRef} from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './addSpace.css';
import { usePage } from '../../../context/pageContext';


const AddSpace = () => {
    const [name, setName] = useState(''); // State for floorId
    const [spaceCode, setSpaceCode] = useState(''); // State for the space code
    const [maxPeople, setMaxPeople] = useState(''); // State for the max people
    const [buildings, setBuildings] = useState([]);
    const [buildingId, setBuildingId] = useState('');
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [buildingLocation, setBuildingLocation] = useState(''); // State for space location
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const { setPageName } = usePage();

    useEffect(() => {
        setPageName("Agregar espacio");
    }, [setPageName]);

    const formRef = useRef(null);

    useEffect(() => {
        fetch('http://localhost:8080/common-space/locations-by-building', { method: 'GET',  credentials: 'include' })
            .then(response => response.json())
            .then(data => { setBuildings(data); })
            .catch(error => console.error('Fetch error:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newSpace = {
            name,
            spaceCode,
            maxPeople,
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
        <div className="mt-5 d-flex justify-content-center">
            <div className="card p-5 shadow-lg" style={{ maxWidth: "700px", borderRadius: "10px" }}>
                <h1 id="space-registration-title" className="text-center mb-5">Registro de Espacios</h1>
    
                <div className="mb-4">
                    <div className="text-center mb-4">
                        <Button className="btn btn-lg btn-custom btn-space shadow-sm" role="button" onClick={handleRegisterSt}>
                            <i className="fas fa-box"></i> Registro tipos de espacio
                        </Button>
                        <Button className="btn btn-lg btn-custom btn-space shadow-sm" role="button" onClick={handleRegisterBld}>
                            <i className="fas fa-building"></i> Registro de edificios
                        </Button>
                        <Button className="btn btn-lg btn-custom btn-space shadow-sm" role="button" onClick={handleRegisterBloc}>
                            <i className="fas fa-map-marker-alt"></i> Registro de ubicaciones
                        </Button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4 row align-items-center">
                            <label htmlFor="name" className="col-sm-4 col-form-label form-label">
                                <i className="fas fa-tag"></i> Nombre del espacio
                            </label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    id="name"
                                    className="form-control border-primary"
                                    placeholder="Ingresa el nombre del espacio"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-4 row align-items-center">
                            <label htmlFor="spaceCode" className="col-sm-4 col-form-label form-label">
                                <i className="fas fa-code"></i> Código del espacio
                            </label>
                            <div className="col-sm-8">
                                <input
                                    type="number"
                                    id="spaceCode"
                                    className="form-control border-primary"
                                    placeholder="Ingresa el código del espacio"
                                    value={spaceCode}
                                    onChange={(e) => setSpaceCode(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-4 row align-items-center">
                            <label htmlFor="maxPeople" className="col-sm-4 col-form-label form-label">
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
                            <label htmlFor="buildingId" className="col-sm-4 col-form-label form-label">
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
                                        if (selectedBuilding) { setFilteredLocations(selectedBuilding.locations); }
                                        else { setFilteredLocations([]); }
                                        setBuildingId(currBuildingId);
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
                        </div>
                        <div className="mb-4 row align-items-center">
                            <label htmlFor="buildingLocation" className="col-sm-4 col-form-label form-label">
                                <i className="fas fa-map-marker"></i> Ubicaciones del edificio
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
                        <div className="text-center">
                            <Button className="btn btn-lg btn-custom w-100 shadow-sm" type="submit">
                                <i className="fas fa-save"></i> Guardar
                            </Button>
                        </div>
                    </form>

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
            </div>
        </div>
    );
};

export default AddSpace;
