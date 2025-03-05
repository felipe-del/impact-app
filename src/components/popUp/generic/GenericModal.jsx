import { Modal, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import ActionButtons from "../../button/ActionButtons.jsx";

const GenericModal = ({
                          show,
                          onHide,
                          title,
                          bodyText,
                          buttonText = 'Aceptar',
                          onButtonClick,
                          customContent,
                      }) => {

    const handleButtonClick = async () => {
        try {
            await onButtonClick();
            onHide(); // Close the modal after executing the action
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
                    width: { xs: '90%', sm: 450 }, // 90% width on small screens, 450px on larger screens
                    maxWidth: 600, // Maximum width
                    bgcolor: 'linear-gradient(to right, #6a11cb, #2575fc)', // Futuristic gradient background
                    boxShadow: 10,
                    p: 4,
                    borderRadius: 4, // Rounded corners
                    backdropFilter: 'blur(10px)', // Add a subtle blur effect to the background
                    overflow: 'hidden',
                    transition: 'all 0.3s ease-in-out', // Smooth transition

                    '@media (max-width: 600px)': {
                        padding: 2, // Reduce padding on smaller screens
                    },
                }}
            >
                <Typography id="modal-title" variant="h5" component="h2" sx={{ fontWeight: 'bold', color: 'white', letterSpacing: '0.5px', fontFamily: 'Montserrat' }}>
                    {title}
                </Typography>

                {/* Add a sleek horizontal line */}
                <Box
                    sx={{
                        height: '2px',
                        bgcolor: 'white',
                        my: 2, // Add vertical margin
                        opacity: 0.6,
                    }}
                />

                <Typography
                    id="modal-description"
                    sx={{ color: 'white', mt: 2, fontSize: '16px', lineHeight: 1.5, fontFamily: 'Montserrat' }}
                    dangerouslySetInnerHTML={{ __html: bodyText }}
                />
                     <Box sx={{ mt: 2 }}>
                        {customContent}
                     </Box>

                {/* Action Buttons styled to match futuristic theme */}
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <ActionButtons
                        acceptAction={handleButtonClick}
                        cancelAction={onHide}
                        labelAcept={buttonText}
                        labelCancel="Cancelar"
                    />
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
    buttonText: PropTypes.string,
    onButtonClick: PropTypes.func.isRequired,
    customContent: PropTypes.node,
};

export default GenericModal;
