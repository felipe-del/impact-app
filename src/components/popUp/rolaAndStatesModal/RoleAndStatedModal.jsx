import { Modal, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button }
    from '@mui/material';

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
                <Typography id="modal-title" variant="h6" component="h2">
                    Información de Roles y Estados
                </Typography>

                <div style={{ marginTop: '20px' }}>
                    <Typography variant="subtitle1">Roles de Usuario</Typography>
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

                <div style={{ marginTop: '20px' }}>
                    <Typography variant="subtitle1">Estados de Usuario</Typography>
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
