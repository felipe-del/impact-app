import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { usePage } from '../../../context/pageContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './productRegister.module.css';

const ProductEdit = () => {
  const { id } = useParams();
  const { setPageName } = usePage();
  const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().substr(0, 10));
  const [expiryDate, setExpiryDate] = useState('');
  const [isExpiryDisabled, setIsExpiryDisabled] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setPageName("Edición de productos");
    console.log('ID:',id);
  }, [setPageName]);

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:8080/product/${id}`, {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => {
        setProduct(data);
        setPurchaseDate(data.purchaseDate ? data.purchaseDate.substr(0, 10) : ''); // Formatea a YYYY-MM-DD
        if (data.category.categorieType.name === 'Oficina') {
          setIsExpiryDisabled(true);
        } else {
          setIsExpiryDisabled(false);
          setExpiryDate(data.expiryDate ? data.expiryDate.substr(0, 10) : '');
        }

        setIsLoading(false);
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setIsLoading(false);
        setShowError(true);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updatedProduct = {
      id,
      purchaseDate,
      expiryDate
    }

    fetch(`http://localhost:8080/product/edit/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedProduct)
  })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          setShowSuccess(true);
      })
      .catch(error => {
          console.error('Error al guardar categoría:', error);
          setShowError(true);
      });
  };

  const handleCancel = () => {
    window.location.href = '/app/productList';
  };
  const handleClose= ()=>{
    setShowSuccessModal(false);
    window.location.href= '/app/inventoryList'
  }
const products = handleCancel;

  return (
    <div>
      <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/app">Inicio</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Edición de productos</li>
                </ol>
            </nav>
  
    <div className="mt-5 d-flex justify-content-center">
      <div className="card p-5 shadow-lg" style={{ maxWidth: "700px", borderRadius: "10px" }}>
        <h1 className="title text-center">Edición de productos</h1>
        {isLoading ? (
          <div className="text-center mb-4">
            <p>Cargando producto...</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-4">
              <Button className="btn btn-lg btn-custom btn-space shadow-sm" role="button" onClick={products}>
                <i className="fas fa-box"></i> Ver productos
              </Button>
            </div>
            <h5 className="title text-center mb-5">Producto: {product.category?.name || 'Ninguna seleccionada'}</h5>
            <div className="container2">
              <form onSubmit={handleSubmit}>
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
                      disabled={isExpiryDisabled}
                      required={!isExpiryDisabled}
                      onChange={(e) => setExpiryDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="text-center buttons">
                  <Button className="me-2 btn btn-danger btn-lg w-100 shadow-sm btn-custom" id='cancel' onClick={handleCancel}>
                    <i className="fas fa-times"></i> Cancelar
                  </Button>
                  <Button className="btn btn-lg btn-custom w-100 shadow-sm" type="submit" >
                    <i className="fas fa-save"></i> Guardar
                  </Button>
                </div>
              </form>
            </div>
            
          </>
        )}

        {/* Success Modal */}
        <Modal show={showSuccess} onHide={() => setShowSuccess(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Éxito</Modal.Title>
          </Modal.Header>
          <Modal.Body>Producto guardado exitosamente.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancel}>
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
    </div>
    </div>  
  </div>
  );
};

export default ProductEdit;
