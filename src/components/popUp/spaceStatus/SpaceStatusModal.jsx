/**
 * SpaceStatusModal Component
 * 
 * This component renders a modal that displays the status of spaces in a table format.
 * It includes a title, a table with space statuses, and a close button.
 * It is used to show information about space statuses in a user-friendly way.
 * The modal can be customized with additional content.
 */
import { Modal, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import PropTypes from 'prop-types';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

/**
 * SpaceStatusModal component that displays a modal with space statuses.
 * 
 * @component
 * @param {boolean} open - Indicates whether the modal is open or closed.
 * @param {function} onClose - Function to call when the modal is closed.
 * @param {Array} spaceStatuses - Array of space statuses to display in the modal.
 * @returns {JSX.Element} The rendered SpaceStatusModal component.
 */
const SpaceStatusModal = ({ open, onClose, spaceStatuses }) => {
    return (
        <Modal open={open} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description">
            <Box sx={modalStyle}>
                <Typography id="modal-title" variant="h6" component="h2" sx={titleStyle}>
                    Estados de Espacio
                </Typography>

                <TableContainer component={Paper} sx={tableContainerStyle}>
                    <Table aria-label="asset status table">
                        <TableHead className="table-head">
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Descripción</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {spaceStatuses.map((status) => (
                                <TableRow key={status.id}>
                                    <TableCell>{status.id}</TableCell>
                                    <TableCell>{status.name}</TableCell>
                                    <TableCell>{status.description}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Button
                    onClick={onClose}
                    variant="contained"
                    sx={{ marginTop: '20px', width: '25%', borderRadius: '15px', float: 'right', backgroundColor: "#005DA4", '&:hover': { backgroundColor: "#003B73" } }}
                    startIcon={<VisibilityOffIcon />}
                >
                    Ocultar
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
    width: '90%',
    maxWidth: 750,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

// Styles for the title
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

// Styles for the table container
const tableContainerStyle = {
    maxHeight: '300px',
    overflowX: 'auto',
};

SpaceStatusModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    spaceStatuses: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    })).isRequired,
};

export default SpaceStatusModal;
