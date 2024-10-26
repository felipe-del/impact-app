import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap CSS
import './Register.css';
import { usePage } from '../../../context/pageContext';

const Register = () => {
    const [types, setTypes] = useState([]);
    const [measureU, setMeasureU] = useState([]);
    const [name, setName] = useState(''); // State for name
    const [minQuantity, setMinQuantity] = useState(''); // State for min quantity
    const [type, setType] = useState(''); // State for product type
    const [measureUnit, setMeasureUnit] = useState(''); // State for unit of measurement
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [confirmAction, setConfirmAction] = useState('');

    const formRef = useRef(null);
    const { setPageName } = usePage();

    useEffect(() => {
        setPageName("Agregar categoria de producto");
    }, [setPageName]);

    useEffect(() => {
        fetch('http://localhost:8080/product/units', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                setMeasureU(data);
                if (data.length > 0) {
                    setMeasureUnit(data[0].id);
                }
            })
            .catch(error => console.error('Fetch error:', error));

        fetch('http://localhost:8080/product/types', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                setTypes(data);
                if (data.length > 0) {
                    setType(data[0].id);
                }
            })
            .catch(error => console.error('Fetch error:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        setConfirmAction('Guardar'); 
        setShowConfirmModal(true);

    };

    const handleCancel = () => {
        setConfirmAction('Cancelar'); 
        setShowConfirmModal(true);
    };

    const handleConfirm = () => {
        if (confirmAction === 'Guardar') {
            const newCategory = {
                name,
                cantidadMinima: minQuantity,
                categoryType: type,
                unit_of_measurement: measureUnit
            };
            fetch('http://localhost:8080/product', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCategory)
            })
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    setShowSuccessModal(true);
                    // Reset form fields
                    setName('');
                    setMinQuantity('');
                    setType('');
                    setMeasureUnit('');
                    formRef.current && formRef.current.reset();
                })
                .catch(error => setShowErrorModal(true));
        } else if (confirmAction === 'Cancelar') {
            setName('');
            setMinQuantity('');
            setType(types.length > 0 ? types[0].id : '');
            setMeasureUnit(measureU.length > 0 ? measureU[0].id : '');
            formRef.current && formRef.current.reset();
        }
        setShowConfirmModal(false); 
    };

    const handleRegisterP = () => {
        window.location.href = 'productRegister';
    };


    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/app">Inicio</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Registro de Categorías</li>
                </ol>
            </nav>

        <div className="mt-5 d-flex justify-content-center">
            <div className="card p-5 shadow-lg" style={{ maxWidth: "700px", borderRadius: "10px" }}>
                <h1 className="title text-center mb-5">Registro de Categorías</h1>
                <div className="text-center mb-4">
                    <Button className="btn btn-lg btn-custom btn-space shadow-sm" role="button" onClick={handleRegisterP}>
                        <i className="fas fa-box"></i> Registro de productos
                    </Button>
                </div>

                <div className="container2">
                    <div className="container3">
                        <h3 className="text-center mb-4 subtitle">Datos de la Categoría</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4 row align-items-center">
                                <label htmlFor="name" className="col-sm-4 col-form-label form-label">
                                    <i className="fas fa-tag"></i> Nombre del producto
                                </label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        id="name"
                                        className="form-control border-primary"
                                        placeholder="Nombre del producto"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-4 row align-items-center">
                                <label htmlFor="min-quantity" className="col-sm-4 col-form-label form-label">
                                    <i className="fas fa-sort-numeric-up"></i> Cantidad mínima
                                </label>
                                <div className="col-sm-8">
                                    <input
                                        type="number"
                                        id="min-quantity"
                                        className="form-control border-primary"
                                        value={minQuantity}
                                        min={1}
                                        onChange={(e) => setMinQuantity(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-4 row align-items-center">
                                <label htmlFor="type" className="col-sm-4 col-form-label form-label">
                                    <i className="fas fa-cube"></i> Tipo del producto
                                </label>
                                <div className="col-sm-8">
                                    <select
                                        id="type"
                                        className="form-control border-primary"
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                        required
                                    >
                                        {types.map((type) => (
                                            <option key={type.id} value={type.id}>
                                                {type.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="mb-4 row align-items-center">
                                <label htmlFor="measure_unit" className="col-sm-4 col-form-label form-label">
                                    <i className="fas fa-ruler"></i> Unidad de medida
                                </label>
                                <div className="col-sm-8">
                                    <select
                                        id="measure_unit"
                                        className="form-control border-primary"
                                        value={measureUnit}
                                        onChange={(e) => setMeasureUnit(e.target.value)}
                                        required
                                    >
                                        {measureU.map((measure) => (
                                            <option key={measure.id} value={measure.id}>
                                                {measure.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="text-center buttons">
                                <Button className="btn btn-danger btn-lg w-100 shadow-sm btn-custom" id='cancel' onClick={handleCancel}>
                                    <i className="fas fa-times"></i> Cancelar
                                </Button>
                                <Button className="btn btn-lg btn-custom w-100 shadow-sm btn_test" type="submit">
                                    <i className="fas fa-save"></i> Guardar
                                </Button>
                            </div>
                            
                        </form>
                    </div>
                </div>

                 {/* Confirmación Modal */}
                 <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirmación</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>¿Está seguro de que desea {confirmAction.toLowerCase()} los cambios?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>No</Button>
                            <Button variant="primary" onClick={handleConfirm}>Sí</Button>
                        </Modal.Footer>
                    </Modal>

                {/* Success Modal */}
                <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Éxito</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>La categoría se ha guardado exitosamente.</Modal.Body>
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
                    <Modal.Body>Hubo un problema al guardar la categoría. Por favor, intente nuevamente.</Modal.Body>
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

export default Register;
