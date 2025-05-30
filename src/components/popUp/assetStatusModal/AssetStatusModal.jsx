/**
 * AssetStatusModal Component
 * 
 * This component renders a modal that displays a table of asset statuses.
 * It includes a close button to hide the modal.
 * It is used to show asset status information in a user-friendly way.
 */
import { Modal, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import PropTypes from 'prop-types';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {StatusTranslator} from "../../../util/Translator.js";

/**
 * AssetStatusModal component that displays a modal with a table of asset statuses.
 * 
 * @component
 * @param {boolean} open - Indicates whether the modal is open or closed.
 * @param {function} onClose - Function to call when the modal is closed.
 * @param {Array} assetStatuses - Array of asset status objects to display in the table.
 * @returns {JSX.Element} The rendered AssetStatusModal component.
 */
const AssetStatusModal = ({ open, onClose, assetStatuses }) => {
    return (
        <Modal open={open} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description">
            <Box sx={modalStyle}>
                <Typography id="modal-title" variant="h6" component="h2" sx={titleStyle}>
                    Estados de Activo
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
                            {assetStatuses.map((status) => (
                                <TableRow key={status.id}>
                                    <TableCell>{status.id}</TableCell>
                                    <TableCell>{StatusTranslator.translate(status.name)}</TableCell>
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


//Styles for the modal and its components.
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

// Styles for the title of the modal
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

AssetStatusModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    assetStatuses: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    })).isRequired,
};

export default AssetStatusModal;
