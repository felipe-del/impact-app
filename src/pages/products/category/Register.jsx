import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap CSS
import './Register.css';

const Register = () => {
    const [types, setTypes] = useState([]);
    const [measureU, setMeasureU] = useState([]);
    const [name, setName] = useState(''); // State for name
    const [minQuantity, setMinQuantity] = useState(''); // State for min quantity
    const [type, setType] = useState(''); // State for product type
    const [measureUnit, setMeasureUnit] = useState(''); // State for unit of measurement
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    const formRef = useRef(null);

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

        const newCategory = {
            name,
            cantidadMinima: minQuantity,
            categoryType: type,
            unit_of_measurement: measureUnit
        };
        console.log(newCategory);

        fetch('http://localhost:8080/product', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCategory)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                setShowSuccessModal(true);
                // Reset form fields and form reference
                setName('');
                setMinQuantity('');
                setType('');
                setMeasureUnit('');
                if (formRef.current) {
                    formRef.current.reset();
                }
            })
            .catch(error => {
                console.error('Error al guardar categoría:', error);
                setShowErrorModal(true);
            });

    };

    const handleRegisterP = () => {
        window.location.href = 'productRegister';
    };

    return (
        <div className="main-container">
            <div className="button-container">
                <h1>Registro de categorías</h1>
                <div className="ver-inventario">
                    <button className="button-5" role="button" onClick={handleRegisterP}>Registro productos</button>
                </div>
            </div>
            <div className="container2">
                <div className="container3">
                    <h3>Datos de la categoría</h3><br></br>
                    <form ref={formRef} onSubmit={handleSubmit}>
                        <div className="form-group">
                            <div className="input-group">
                                <label htmlFor="name">Nombre del producto</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="min-quantity">Cantidad mínima</label>
                                <input
                                    type="number"
                                    id="min-quantity"
                                    value={minQuantity}
                                    min={1}
                                    onChange={(e) => setMinQuantity(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="input-group">
                                <label htmlFor="type">Tipo del producto</label>
                                <select
                                    id="type"
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
                            <div className="input-group">
                                <label htmlFor="measure_unit">Unidad de medida</label>
                                <select
                                    id="measure_unit"
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
    );
};

export default Register;
