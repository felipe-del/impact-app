import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { usePage } from '../../../context/pageContext';
import {API_URLS} from "../../../declarations/apiConfig.js";
import ConfirmationModal from "../../../components/confirmation/ConfirmationModal.jsx";
import SuccessModal from "../../../components/modal/success/SuccessModal.jsx";
import ErrorModal from "../../../components/modal/error/ErrorModal.jsx";

const AddBuilding = () => {
    const { setPageName } = usePage();
    const [name, setName] = useState('');

    // Modal states
    const [showCancellationModal, setShowCancellationModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    useEffect(() => {
        setPageName("Agregar Edificio");
    }, [setPageName]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowConfirmationModal(true);
    };

    const verifyCancel = () => setShowCancellationModal(true);

    const handleConfirm = () => {
        const newBuilding = {
            id: 0,
            name: name
        };

        fetch(API_URLS.COMMON_SPACE.CREATE_BUILDING, { method: 'POST',  credentials: 'include',
            headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newBuilding) })
            .then(response => {
                if (!response.ok) { throw new Error('Network response was not ok'); }
                return response.json();
            })
            .then(() => {
                setShowSuccessAlert(true);
                setName('');
            })
            .catch(error => {
                console.error('Error adding brand:', error);
                setShowErrorAlert(true);
            });
    }

    const handleRegisterBloc = () => {
        window.location.href = 'addBuildingLocation';
    };

    const handleRegisterSp = () => {
        window.location.href = 'addSpace';
    };

    const handleCancel = () => {
        setName('');
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/app">Inicio</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Registro de Edificios</li>
                </ol>
            </nav>
            <div className="mt-5 d-flex justify-content-center">
                <div className="card p-5 shadow-lg" style={{minWidth:"50vw", maxWidth: "70vw", borderRadius: "2vh"}}>
                    <h1 id="building-title" className="text-center mb-5">Registro de edificios</h1>
                    <div className="mb-4 row justify-content-center align-items-center">
                        <div className="col-sm-6">
                            <Button className="btn btn-lg btn-custom btn-space w-100 shadow-sm" role="button" onClick={handleRegisterBloc}>
                                <i className="fas fa-map-marked-alt"></i> Registro de ubicaciones
                            </Button>
                        </div>
                        <div className="col-sm-6">
                            <Button className="btn btn-lg btn-custom btn-space w-100 shadow-sm" role="button" onClick={handleRegisterSp}>
                                <i className="fas fa-building"></i> Registro de espacios
                            </Button>
                        </div>
                    </div>

                    <div className="container3">
                        <h3 id="building-details-title">Detalles del Edificio</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-4 row align-items-center">
                                <label htmlFor="buildingName" className="col-sm-4 col-form-label form-label text-black">
                                    <i className="fas fa-building"></i> Nombre del Edificio
                                    <span className="ml-2 text-danger fw-bold">*</span>
                                </label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        id="buildingName"
                                        className="form-control border-primary"
                                        placeholder="Ingresa el nombre del edificio"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-4 row justify-content-center align-items-center">
                                <div className="col-sm-6">
                                    <Button className="btn btn-danger btn-lg w-100 shadow-sm btn-custom" id='cancel'
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
                            message="El edificio se ha guardado correctamente."
                        />

                        {/* Error Modal */}
                        <ErrorModal
                            show={showErrorModal}
                            onHide={() => setShowErrorModal(false)}
                            title="Error"
                            message="Hubo un problema al guardar el edificio. Por favor, intenta nuevamente."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBuilding;
