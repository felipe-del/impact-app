import { useState } from 'react';
import { IconButton, Tooltip, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from "prop-types";

const TableApproveOrCancelButtons = ({ confirmationModal, cancelEditing, row }) => {
    const [hover, setHover] = useState('save');

    return (
        <div style={{ display: 'flex', gap: '0' }}>
            {/* Botón Guardar */}
            <Tooltip title="Aprobar" arrow>
                <IconButton
                    onClick={confirmationModal}
                    color="success"
                    onMouseEnter={() => setHover('save')}
                    onMouseLeave={() => setHover('save')}
                    style={{
                        width: hover === 'save' ? '90px' : '40px',
                        height: '34px',
                        borderRadius: '8px 0 0 8px',
                        padding: '0',
                        backgroundColor: '#4caf50',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        transition: 'width 0.2s ease-in-out',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                    }}
                >
                    <CheckIcon style={{ fontSize: '16px', color: 'white', marginRight: hover === 'save' ? '6px' : '0' }} />
                    {hover === 'save' && <Typography variant="caption" style={{ color: 'white', fontSize: '12px', fontFamily: 'Montserrat' }}>Aprobar</Typography>}
                </IconButton>
            </Tooltip>

            {/* Botón Cancelar */}
            <Tooltip title="Denegar" arrow>
                <IconButton
                    onClick={cancelEditing}
                    color="error"
                    onMouseEnter={() => setHover('cancel')}
                    onMouseLeave={() => setHover('save')}
                    style={{
                        width: hover === 'cancel' ? '90px' : '40px',
                        height: '34px',
                        borderRadius: '0 8px 8px 0',
                        padding: '0',
                        backgroundColor: '#f44336',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        transition: 'width 0.2s ease-in-out',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                    }}
                >
                    <CloseIcon style={{ fontSize: '16px', color: 'white', marginRight: hover === 'cancel' ? '6px' : '0' }} />
                    {hover === 'cancel' && <Typography variant="caption" style={{ color: 'white', fontSize: '12px', fontFamily: 'Montserrat' }}>Denegar</Typography>}
                </IconButton>
            </Tooltip>
        </div>
    );
};

TableApproveOrCancelButtons.propTypes = {
    confirmationModal: PropTypes.func.isRequired,
    cancelEditing: PropTypes.func.isRequired,
    row: PropTypes.shape({
        original: PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        }).isRequired,
    }).isRequired,
};

export default TableApproveOrCancelButtons;
