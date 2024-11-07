import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { usePage } from '../../../context/pageContext';
import { API_URLS } from '../../../declarations/apiConfig';
import ConfirmationModal from "../../../components/confirmation/ConfirmationModal.jsx";
import SuccessModal from "../../../components/modal/success/SuccessModal.jsx";
import ErrorModal from "../../../components/modal/error/ErrorModal.jsx";


const AddSpaceEquipment = () => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [brand, setBrand] = useState('');
    const [space, setSpace] = useState('');
    const [brands, setBrands] = useState([]);
    const [spaces, setSpaces] = useState([]);
    const { setPageName } = usePage();

    const [showCancellationModal, setShowCancellationModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    useEffect(() => {
        setPageName("Agregar Equipo Tecnológico");

        // Cargar marcas
        const fetchBrands = async () => {
            try {
                const brandResponse = await fetch(API_URLS.BRAND.GET_ALL, { method: 'GET', credentials: 'include' });
                if (!brandResponse.ok) throw new Error('Network response was not ok for brands');
                const brandData = await brandResponse.json();
                setBrands(brandData);
            } catch (error) {
                console.error('Error fetching brands:', error);
            }
        };

        // Cargar espacios
        const fetchSpaces = async () => {
            try {
                const spaceResponse = await fetch('http://localhost:8080/common-space/all', { method: 'GET', credentials: 'include' });
                if (!spaceResponse.ok) throw new Error('Network response was not ok for spaces');
                const spaceData = await spaceResponse.json();
                setSpaces(spaceData);
            } catch (error) {
                console.error('Error fetching spaces:', error);
            }
        };

        fetchBrands();
        fetchSpaces();
    }, [setPageName]);

    const handleRegisterBloc = () => {
        window.location.href = 'addSpace';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowConfirmationModal(true);
    };

    const verifyCancel = () => setShowCancellationModal(true);

    const handleConfirm = () => {
        const newEquipment = {
            id: 0,
            name: name,
            brandId: brand,
            spaceId: space,
            quantity: quantity
        };

        fetch('http://localhost:8080/common-space/create/equipment', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newEquipment)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(() => {
                setShowSuccessModal(true);
                handleCancel();

                setTimeout(() => {
                    setName('');
                    setBrand('');
                    setSpace('');
                    setQuantity(0);
                }, 2000);

                setShowConfirmationModal(false);
            })
            .catch(error => {
                console.error('Error adding equipment:', error);
                setShowErrorModal(true);
            });
    };

    const handleCancel = () => {
        setName('');
        setBrand('');
        setSpace('');
        setQuantity(0);
        setShowCancellationModal(false);
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/app">Inicio</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Registro de Equipo Tecnológico</li>
                </ol>
            </nav>
            <div className="mt-5 d-flex justify-content-center">
                <div className="card p-5 shadow-lg" style={{minWidth:"50vw", maxWidth: "70vw", borderRadius: "2vh"}}>
                    <h1 className="text-center mb-5">Registro de Equipo Tecnológico</h1>
                    <div className="mb-4 row justify-content-center align-items-center">
                        <div className="col-sm-6">
                            <Button className="btn btn-lg btn-custom btn-space w-100 shadow-sm" role="button" onClick={handleRegisterBloc}>
                                <i className="fas fa-map-marked-alt"></i> Registro de espacios
                            </Button>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-4 row align-items-center">
                            <label htmlFor="equipmentName" className="col-sm-4 col-form-label form-label" style={{ color: 'black' }}>
                                <i className="fas fa-laptop" id="icon-name" style={{ color: 'black' }}></i> Nombre del Equipo
                            </label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    id="equipmentName"
                                    className="form-control border-primary"
                                    placeholder="Ingresa el nombre del equipo"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="form-group mb-4 row align-items-center">
                            <label htmlFor="quantity" className="col-sm-4 col-form-label form-label" style={{ color: 'black' }}>
                                <i className="fas fa-cubes" id="icon-quantity"></i> Cantidad
                            </label>
                            <div className="col-sm-8">
                                <input
                                    type="number"
                                    id="quantity"
                                    className="form-control border-primary"
                                    placeholder="Cantidad"
                                    min = "1"
                                    value={quantity}
                                    onChange={(e) => {
                                        const value = Number(e.target.value);
                                            setQuantity(value);
                                    }}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group mb-4 row align-items-center">
                            <label htmlFor="brand" className="col-sm-4 col-form-label form-label" style={{ color: 'black' }}>
                                <i className="fas fa-tag"></i> Marca
                            </label>
                            <div className="col-sm-8">
                                <select
                                    id="brand"
                                    className="form-select border-primary"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                    required
                                    style={{ maxHeight: '150px', overflowY: 'auto' }}
                                >
                                    <option value="">Seleccionar marca</option>
                                    {brands.map((brand) => (
                                        <option key={brand.id} value={brand.id}>
                                            {brand.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-group mb-4 row align-items-center">
                            <label htmlFor="space" className="col-sm-4 col-form-label form-label" style={{ color: 'black' }}>
                                <i className="fas fa-building"></i> Espacio
                            </label>
                            <div className="col-sm-8">
                                <select
                                    id="space"
                                    className="form-select border-primary"
                                    value={space}
                                    onChange={(e) => setSpace(e.target.value)}
                                    required
                                    style={{ maxHeight: '150px', overflowY: 'auto' }}
                                >
                                    <option value="">Seleccionar espacio</option>
                                    {spaces.map((space) => (
                                        <option key={space.id} value={space.id}>
                                            {space.name}
                                        </option>
                                    ))}
                                </select>
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

                    {/*Confirmation modal*/}
                    <ConfirmationModal
                        show={showConfirmationModal}
                        onHide={() => setShowConfirmationModal(false)}
                        confirmAction="guardar"
                        onConfirm={handleConfirm}
                    />

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
                        message="Se ha realizado la edición del espacio correctamente."
                    />

                    {/* Error Modal */}
                    <ErrorModal
                        show={showErrorModal}
                        onHide={() => setShowErrorModal(false)}
                        title="Error"
                        message="Hubo un problema al editar el espacio. Por favor, intenta nuevamente."
                    />
                </div>
            </div>
        </div>
    );
};

export default AddSpaceEquipment;

