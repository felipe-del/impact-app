import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { usePage } from '../../../context/pageContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './productRegister.module.css';

const ProductEdit = () => {
  const { id } = useParams();
  const { setPageName } = usePage();
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().substr(0, 10));
  const [expiryDate, setExpiryDate] = useState('');
  const [isExpiryDisabled, setIsExpiryDisabled] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);


  useEffect(() => {
    setPageName("Edición de productos");
    console.log(id)
  }, [setPageName]);

  const handleSubmit = (e) => {
    e.preventDefault();

    
  };

  return (
    <div className="mt-5 d-flex justify-content-center">
      <div className="card p-5 shadow-lg" style={{ maxWidth: "700px", borderRadius: "10px" }}>
        <div className="button-container">
          <h1 className="title text-center mb-5">Edición de productos</h1>
          <div className="text-center mb-4">
            <Button className="btn btn-lg btn-custom btn-space shadow-sm" role="button" >
              <i className="fas fa-box"></i> Ver inventario productos
            </Button>
          </div>
        </div>
        <div className="container2">
          <form onSubmit={handleSubmit}>
            {/* <h3>Producto seleccionado: {selectedCategory || 'Ninguna seleccionada'}</h3> */}
            <div className="form-group">
              <div className="input-group">
                <label>Fecha de compra:</label>
                <input
                  type="date"
                  value={purchaseDate}
                  required
                  onChange={(e) => setPurchaseDate(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>Fecha de vencimiento:</label>
                <input
                  type="date"
                  value={expiryDate}
                  disabled={isExpiryDisabled} // Deshabilitar si es de tipo "Oficina"
                  required={!isExpiryDisabled} // Hacerlo obligatorio solo si no está deshabilitado
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </div>
            </div>
            {/* <div className="form-group">
              <div className="input-group">
                <label>Cantidad a ingresar:</label>
                <input
                  type="number"
                  value={quantity}
                  min={1}
                  required
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
            </div> */}
            {/* <div className="form-group">
              <button type="button" className="button-5" onClick={handleGoBackToCategorySelection}>
                Cambiar categoría
              </button>
              <button type="submit" className="button-5">Guardar</button>
            </div> */}
          </form>
        </div>
      </div>

      {/* Success Modal */}
      <Modal show={showSuccess} onHide={() => setShowSuccess(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Éxito</Modal.Title>
        </Modal.Header>
        <Modal.Body>Producto guardado exitosamente.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSuccess(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Error Modal */}
      <Modal show={showError} onHide={() => setShowError(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>Hubo un error al guardar el producto. Inténtelo de nuevo.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowError(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductEdit;