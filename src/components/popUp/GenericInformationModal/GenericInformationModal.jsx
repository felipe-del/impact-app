/**
 * GenericInformationModal Component
 * 
 * This component renders a modal that displays a title and description.
 * It includes a close button to hide the modal.
 * It is used to show information in a user-friendly way.
 * The modal can be customized with additional content.
 */
import {
    Modal,
    Box,
    Typography,
    Button
} from '@mui/material';
import PropTypes from 'prop-types';

/**
 * GenericInformationModal component that displays a modal with a title and description.
 * 
 * @component
 * @param {boolean} open - Indicates whether the modal is open or closed.
 * @param {function} onClose - Function to call when the modal is closed.
 * @param {string} title - The title of the modal.
 * @param {string} description - The description of the modal.
 */
const GenericInformationModal = ({ open, onClose, title, description }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="info-modal-title"
            aria-describedby="info-modal-description"
        >
            <Box sx={modalStyle}>
                <Typography id="info-modal-title" variant="h6" component="h2" sx={titleStyle}>
                    {title}
                </Typography>

                <Typography id="info-modal-description" sx={descriptionStyle}>
                    {description}
                </Typography>

                <Button
                    onClick={onClose}
                    variant="contained"
                    sx={closeButtonStyle}
                    style={{ width: '35%' }}
                >
                    Entendido
                </Button>
            </Box>
        </Modal>
    );
};

// Modal styles
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '85%',
    maxWidth: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 3,
};

// Title style
const titleStyle = {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '15px',
    borderBottom: '2px solid #1976d2',
    paddingBottom: '10px',
};

// Description style
const descriptionStyle = {
    mt: 2,
    mb: 4,
    color: '#444',
    textAlign: 'center',
    fontSize: '16px',
    lineHeight: 1.6,
};

// Close button style
const closeButtonStyle = {
    display: 'block',
    margin: '0 auto',
    borderRadius: '15px',
    backgroundColor: "#005DA4",
    '&:hover': { backgroundColor: "#003B73" },
};

GenericInformationModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default GenericInformationModal;
