import { Button, Modal, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const GenericModal = ({
                          show,
                          onHide,
                          title,
                          bodyText,
                          buttonText,
                          onButtonClick
                      }) => {

    const handleButtonClick = async () => {
        try {
            // Ejecuta la función pasada como prop (puede ser una función personalizada para manejar logout, etc.)
            await onButtonClick();
            onHide(); // Cierra el modal después de ejecutar la acción
        } catch (error) {
            console.error('Error executing button action:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <Modal
            open={show}
            onClose={onHide}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: '90%', sm: 400 }, // 90% width on small screens, 400px on larger screens
                    maxWidth: 600, // Maximum width
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    '@media (max-width: 600px)': {
                        padding: 2, // Reduce padding on smaller screens
                    },
                }}
            >
                <Typography id="modal-title" variant="h6" component="h2">
                    {title}
                </Typography>
                <Typography id="modal-description" sx={{ mt: 2 }}>
                    {bodyText}
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="outlined" onClick={onHide} sx={{ mr: 1 }}>
                        Cancelar
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleButtonClick}>
                        {buttonText}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

GenericModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    bodyText: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    onButtonClick: PropTypes.func.isRequired,
};

export default GenericModal;
