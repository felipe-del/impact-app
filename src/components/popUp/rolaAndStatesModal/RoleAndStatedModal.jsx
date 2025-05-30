/**
 * RoleAndStateModal Component
 * 
 * This component renders a modal that displays user roles and states.
 * It includes a title, two sections for roles and states, and a close button.
 * It is used to show information about user roles and states in a user-friendly way.
 * The modal can be customized with additional content.
 */
import { Modal, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import PropTypes from 'prop-types';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {StatusTranslator} from "../../../util/Translator.js";

/**
 * RoleAndStateModal component that displays a modal with user roles and states.
 * 
 * @component
 * @param {boolean} open - Indicates whether the modal is open or closed.
 * @param {function} onClose - Function to call when the modal is closed.
 * @param {Array} roles - Array of user roles to display in the modal.
 * @param {Array} states - Array of user states to display in the modal.
 * @returns {JSX.Element} The rendered RoleAndStateModal component.
 */
const RoleAndStateModal = ({ open, onClose, roles, states }) => {
    return (
        <Modal open={open} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description">
            <Box sx={modalStyle}>
                {/* Título */}
                <Typography id="modal-title" variant="h6" component="h2" sx={titleStyle}>
                    Información de Roles y Estados
                </Typography>

                {/* Sección Roles */}
                <div style={{ marginTop: '15px' }}>
                    <Typography variant="subtitle1" sx={sectionTitleStyle}>Roles de Usuario</Typography>
                    <TableContainer component={Paper} sx={tableContainerStyle}>
                        <Table aria-label="roles table">
                            <TableHead className="table-head">
                                <TableRow className="table-row">
                                    <TableCell>ID</TableCell>
                                    <TableCell>Nombre de Rol</TableCell>
                                    <TableCell>Descripción</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {roles.map((role) => (
                                    <TableRow key={role.id}>
                                        <TableCell>{role.id}</TableCell>
                                        <TableCell>{StatusTranslator.translate(role.roleName)}</TableCell>
                                        <TableCell>{role.description}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

                {/* Sección Estados */}
                <div style={{ marginTop: '15px' }}>
                    <Typography variant="subtitle1" sx={sectionTitleStyle}>Estados de Usuario</Typography>
                    <TableContainer component={Paper} sx={tableContainerStyle}>
                        <Table aria-label="states table">
                            <TableHead className="table-head">
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Nombre de Estado</TableCell>
                                    <TableCell>Descripción</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {states.map((state) => (
                                    <TableRow key={state.id}>
                                        <TableCell>{state.id}</TableCell>
                                        <TableCell>{StatusTranslator.translate(state.stateName)}</TableCell>
                                        <TableCell>{state.description}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

                {/* Botón de cierre */}
                <Button
                    onClick={onClose}
                    variant="contained"
                    sx={{ marginTop: '20px', width: '25%', borderRadius: '15px', float: 'right',backgroundColor: "#005DA4", '&:hover': { backgroundColor: "#003B73" } }}
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

// Styles for the section titles
const sectionTitleStyle = {
    fontSize: '16px',
    fontWeight: '500',
    color: '#333',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    paddingBottom: '5px',
};

// Styles for the table container
const tableContainerStyle = {
    maxHeight: '300px', 
    overflowX: 'auto',  
};

RoleAndStateModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    roles: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        roleName: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    })).isRequired,
    states: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        stateName: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    })).isRequired,
};

export default RoleAndStateModal;
