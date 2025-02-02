import { Modal, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button }
    from '@mui/material';

import '../../../style/muiTable.css'
import PropTypes from 'prop-types';

const RoleAndStateModal = ({ open, onClose, roles, states }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={modalStyle}>
                {/* Título con diseño personalizado */}
                <Typography
                    id="modal-title"
                    variant="h6"
                    component="h2"
                    sx={{
                        fontSize: '24px',           // Tamaño de fuente para el título
                        fontWeight: '600',          // Peso de la fuente para un título fuerte
                        color: '#333',              // Color oscuro para legibilidad
                        textTransform: 'uppercase', // Hace que el texto sea mayúscula
                        letterSpacing: '2px',       // Espaciado entre letras
                        marginBottom: '15px',       // Espacio abajo
                        borderBottom: '2px solid #1976d2', // Línea debajo para resaltar
                        paddingBottom: '10px',      // Espacio entre el texto y la línea
                    }}
                >
                    Información de Roles y Estados
                </Typography>

                {/* Sección Roles de Usuario */}
                <div style={{ marginTop: '20px' }}>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontSize: '18px',
                            fontWeight: '500',
                            color: '#333',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            paddingBottom: '5px',
                        }}
                    >
                        Roles de Usuario
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="roles table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Nombre de Role</TableCell>
                                    <TableCell>Descripción</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {roles.map((role) => (
                                    <TableRow key={role.id}>
                                        <TableCell>{role.id}</TableCell>
                                        <TableCell>{role.roleName}</TableCell>
                                        <TableCell>{role.description}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

                {/* Sección Estados de Usuario */}
                <div style={{ marginTop: '20px' }}>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontSize: '18px',
                            fontWeight: '500',
                            color: '#333',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            paddingBottom: '5px',
                        }}
                    >
                        Estados de Usuario
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="states table">
                            <TableHead>
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
                                        <TableCell>{state.stateName}</TableCell>
                                        <TableCell>{state.description}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

                {/* Botón de Cierre */}
                <Button
                    onClick={onClose}
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: '20px' }}
                >
                    Ocultar
                </Button>
            </Box>
        </Modal>
    );
};

// Estilo para el modal
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 750,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
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
