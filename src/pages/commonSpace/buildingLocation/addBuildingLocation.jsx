import React, {useEffect, useState} from 'react';
import { Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './addBuildingLocation.css';

const AddBuildingLocation = () => {
    const [buildings, setBuildings] = useState([]);
    const [buildingId, setBuildingId] = useState('');
    const [floorId, setFloorId] = useState('');
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8080/common-space/building', { method: 'GET',  credentials: 'include' })
        .then(response => response.json())
        .then(data => { setBuildings(data); })
        .catch(error => console.error('Fetch error:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(buildingId);
        console.log(floorId);
        const newBuildingLocation = {
            id: 0,
            buildingId,
            floorId: floorId
        };

        fetch('http://localhost:8080/common-space/create/building-location', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBuildingLocation)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(() => {
                setShowSuccessAlert(true);
                setFloorId('');
            })
            .catch(error => {
                console.error('Error adding building location:', error);
                setShowErrorAlert(true);
            });
    };

    const handleRegisterBld = () => {
        window.location.href = 'addBuilding';
    };
    const handleRegisterSp = () => {
        window.location.href = 'addSpace';
    };

    return (
        <div className="mt-5 d-flex justify-content-center">
            <div className="card p-5 shadow-lg" style={{ maxWidth: "700px", borderRadius: "10px" }}>
                <h1 className="text-center mb-5">Registrar ubicaciones en edificios</h1>
                <div className="button-container text-center mb-4">
                    <div>
                        <Button className="btn btn-lg btn-custom btn-space shadow-sm" role="button" onClick={handleRegisterBld}>
                            <i className="fas fa-building"></i> Registro de edificios
                        </Button>
                        <Button className="btn btn-lg btn-custom btn-space shadow-sm" role="button" onClick={handleRegisterSp}>
                            <i className="fas fa-map-marker-alt"></i> Registro de espacios
                        </Button>
                    </div>
                </div>
                <div className="container2">
                    <div className="container3">
                        <h3>Detalles de la ubicación</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4 row align-items-center">
                                <label htmlFor="buildingId" className="col-sm-4 col-form-label form-label">
                                    <i className="fas fa-building" id="icon-name"></i> Edificio
                                </label>
                                <div className="col-sm-8 w-100 mb-4">
                                    <select
                                        id="buildingId"
                                        className="form-control border-primary"
                                        value={buildingId}
                                        onChange={(e) => setBuildingId(e.target.value)}
                                        required
                                    >
                                        <option>Seleccione un edificio</option>
                                        {buildings.map((building) => (
                                            <option key={building.id} value={building.id}>
                                                {building.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="mb-4 row align-items-center">
                                <label htmlFor="floorId" className="col-sm-4 col-form-label form-label">
                                    <i className="fas fa-map-marker-alt" id="icon-name"></i> Nombre de la ubicación
                                </label>
                                <div className="col-sm-8 w-100 mb-4">
                                    <input
                                        type="text"
                                        id="floorId"
                                        className="form-control border-primary"
                                        placeholder="Ej. Piso, facultad, oficina..."
                                        value={floorId}
                                        onChange={(e) => setFloorId(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="text-center">
                                <Button className="btn btn-lg btn-custom w-100 shadow-sm" type="submit" role="button">
                                    <i className="fas fa-save"></i> Guardar
                                </Button>
                            </div>
                        </form>

                        {/* Success Alert */}
                        {showSuccessAlert && (
                            <div className="alert alert-success mt-4 text-center" role="alert">
                                Building location added successfully!
                            </div>
                        )}

                        {/* Error Alert */}
                        {showErrorAlert && (
                            <div className="alert alert-danger mt-4 text-center" role="alert">
                                There was an error adding the building location. Please try again.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
    
};

export default AddBuildingLocation;
