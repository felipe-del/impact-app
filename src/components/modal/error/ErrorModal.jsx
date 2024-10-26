// ErrorModal.js
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

const ErrorModal = ({ show, onHide, title, message }) => {
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
ErrorModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    title: PropTypes.string,
    message: PropTypes.string
};

// Valores predeterminados para los props
ErrorModal.defaultProps = {
    title: 'Error',
    message: 'Hubo un error al guardar. Inténtelo de nuevo.'
};

export default ErrorModal;
