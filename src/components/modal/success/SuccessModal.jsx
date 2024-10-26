// SuccessModal.js
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

const SuccessModal = ({ show, onHide, title, message }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

// Definición de tipos para los props
SuccessModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    title: PropTypes.string,
    message: PropTypes.string
};

// Valores predeterminados para los props
SuccessModal.defaultProps = {
    title: 'Éxito',
    message: 'Guardado exitosamente.'
};

export default SuccessModal;
