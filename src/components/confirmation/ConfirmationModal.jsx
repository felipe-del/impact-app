// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types'; // Importa PropTypes para validar los props
import { Modal, Button } from 'react-bootstrap';

const ConfirmationModal = ({ 
    show,               // Boolean to control modal visibility
    onHide,             // Function to close the modal
    confirmAction,      // Action description (e.g., "guardar", "eliminar")
    onConfirm           // Function to handle confirmation action
}) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmación</Modal.Title>
            </Modal.Header>
            <Modal.Body>¿Está seguro de que desea {confirmAction.toLowerCase()} los cambios?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>No</Button>
                <Button variant="primary" onClick={onConfirm}>Sí</Button>
            </Modal.Footer>
        </Modal>
    );
};

// Definición de tipos para los props
ConfirmationModal.propTypes = {
    show: PropTypes.bool.isRequired,                // `show` es un booleano obligatorio
    onHide: PropTypes.func.isRequired,              // `onHide` es una función obligatoria
    confirmAction: PropTypes.string.isRequired,     // `confirmAction` es una cadena obligatoria
    onConfirm: PropTypes.func.isRequired            // `onConfirm` es una función obligatoria
};

export default ConfirmationModal;
