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
        <div className="main-container">
            <div className="button-container">
                <h1>Registrar ubicaciones en edificios</h1>
                <div>
                    <button className="button-5" role="button" onClick={handleRegisterBld}>Registro de edificios</button>
                    <button className="button-5" role="button" onClick={handleRegisterSp}>Registro de espacios</button>
                </div>
            </div>
            <div className="container2">
                <div className="container3">
                    <h3>Detalles de la ubicación</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <div className="input-group">
                                <label htmlFor="buildingId">Edificio </label>
                                <select
                                    id="buildingId"
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
                            <div className="input-group">
                                <label htmlFor="floorId">Nombre de la ubicación (ej. Piso, facultad, oficina...)</label>
                                <input
                                    type="text"
                                    id="floorId"
                                    value={floorId}
                                    onChange={(e) => setFloorId(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="button">
                            <Button className="button-5" type="submit" role="button">
                                Guardar
                            </Button>
                        </div>
                    </form>

                    {/* Success Alert */}
                    {showSuccessAlert && (
                        <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
                            Building location added successfully!
                        </Alert>
                    )}

                    {/* Error Alert */}
                    {showErrorAlert && (
                        <Alert variant="danger" onClose={() => setShowErrorAlert(false)} dismissible>
                            There was an error adding the building location. Please try again.
                        </Alert>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddBuildingLocation;
