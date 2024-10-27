import React, {useEffect, useState} from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { usePage } from '../../../context/pageContext';
import {API_URLS} from "../../../declarations/apiConfig.js";
import ConfirmationModal from "../../../components/confirmation/ConfirmationModal.jsx";
import SuccessModal from "../../../components/modal/success/SuccessModal.jsx";
import ErrorModal from "../../../components/modal/error/ErrorModal.jsx";

const AddBuildingLocation = () => {
    const { setPageName } = usePage();
    const [buildings, setBuildings] = useState([]);
    const [buildingId, setBuildingId] = useState('');
    const [floorId, setFloorId] = useState('');

    // Modal states
    const [showCancellationModal, setShowCancellationModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    useEffect(() => {
        setPageName("Agregar Ubicacion dentro de edificio");

        fetch(API_URLS.COMMON_SPACE.GET_BUILDINGS, { method: 'GET',  credentials: 'include' })
            .then(response => response.json())
            .then(data => { setBuildings(data); })
            .catch(error => console.error('Fetch error:', error));
    }, [setPageName]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowConfirmationModal(true);
    };

    const verifyCancel = () => setShowCancellationModal(true);

    const handleConfirm = () => {
        console.log(buildingId);
        console.log(floorId);
        const newBuildingLocation = {
            id: 0,
            buildingId,
            floorId: floorId
        };

        fetch(API_URLS.COMMON_SPACE.CREATE_BUILDING_LOCATION, { method: 'POST', credentials: 'include',
            headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newBuildingLocation) })
            .then(response => {
                if (!response.ok) { throw new Error('Network response was not ok'); }
                return response.json();
            })
            .then(() => {
                handleCancel();
            })
            .catch(error => {
                console.error('Error adding building location:', error);
            });
    }

    const handleRegisterBld = () => {
        window.location.href = 'addBuilding';
    };

    const handleRegisterSp = () => {
        window.location.href = 'addSpace';
    };

    const handleCancel = () => {
      setBuildingId('');
      setFloorId('');
    };

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/app">Inicio</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Registro de Ubicaciones en Edificios</li>
                </ol>
            </nav>
            <div className="mt-5 d-flex justify-content-center">
                <div className="card p-5 shadow-lg" style={{minWidth: "50vw", maxWidth: "70vw", maxHeight: "75vh", borderRadius: "2vh"}}>
                    <h1 className="text-center mb-5">Registrar ubicaciones en edificios</h1>
                    <div className="mb-4">
                        <div className="mb-4 row justify-content-center align-items-center">
                            <div className="col-sm-6">
                                <Button className="btn btn-lg btn-custom w-100 shadow-sm" role="button" onClick={handleRegisterBld}>
                                    <i className="fas fa-building"></i> Registro de edificios
                                </Button>
                            </div>
                            <div className="col-sm-6">
                                <Button className="btn btn-lg btn-custom w-100 shadow-sm" role="button" onClick={handleRegisterSp}>
                                    <i className="fas fa-map-marker-alt"></i> Registro de espacios
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="container2">
                        <div className="container3">
                            <h3>Detalles de la ubicación</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4 row align-items-center">
                                    <label htmlFor="buildingId"
                                           className="col-sm-4 col-form-label form-label text-black">
                                        <i className="fas fa-building"></i> Edificio
                                        <span className="ml-2 text-danger fw-bold">*</span>
                                    </label>
                                    <div className="col-sm-8">
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
                                <div className="mb-5 row align-items-center">
                                    <label htmlFor="floorId" className="col-sm-4 col-form-label form-label text-black">
                                        <i className="fas fa-map-marker-alt"></i> Nombre de la ubicación
                                        <span className="ml-2 text-danger fw-bold">*</span>
                                    </label>
                                    <div className="col-sm-8">
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
                                <div className="mb-4 row align-items-center">
                                    <div className="col-sm-6">
                                        <Button className="btn btn-danger btn-lg w-100 shadow-sm btn-custom" id='cancel'
                                                onClick={verifyCancel}>
                                            <i className="fas fa-times"></i> Cancelar
                                        </Button>
                                    </div>
                                    <div className="col-sm-6">
                                        <Button className="btn btn-lg btn-custom w-100 shadow-sm" type="submit"
                                                role="button">
                                            <i className="fas fa-save"></i> Guardar
                                        </Button>
                                    </div>
                                </div>
                            </form>

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
                                message="La ubicación se ha guardado correctamente."
                            />

                            {/* Error Modal */}
                            <ErrorModal
                                show={showErrorModal}
                                onHide={() => setShowErrorModal(false)}
                                title="Error"
                                message="Hubo un problema al guardar la ubicación. Por favor, intenta nuevamente."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default AddBuildingLocation;
