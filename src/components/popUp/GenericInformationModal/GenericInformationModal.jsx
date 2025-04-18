import {
    Modal,
    Box,
    Typography,
    Button
} from '@mui/material';
import PropTypes from 'prop-types';

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

// Estilos
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

const descriptionStyle = {
    mt: 2,
    mb: 4,
    color: '#444',
    textAlign: 'center',
    fontSize: '16px',
    lineHeight: 1.6,
};

const closeButtonStyle = {
    display: 'block',
    margin: '0 auto',
    borderRadius: '15px',
    backgroundColor: "#005DA4",
    '&:hover': { backgroundColor: "#003B73" },
};

// Props
GenericInformationModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default GenericInformationModal;
