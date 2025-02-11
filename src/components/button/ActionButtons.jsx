import { useState } from 'react';
import { IconButton, Tooltip, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from "prop-types";

const ActionButtons = ({ saveChanges, cancelEditing, row }) => {
    const [hover, setHover] = useState(null);

    return (
        <div style={{ display: 'flex', gap: '0' }}>
            {/* Botón Guardar */}
            <Tooltip title="Guardar" arrow>
                <IconButton
                    onClick={() => saveChanges(row.original.id)}
                    color="success"
                    onMouseEnter={() => setHover('save')}
                    onMouseLeave={() => setHover(null)}
                    style={{
                        width: hover === 'save' ? '80px' : '30px',
                        height: '30px',
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
                    {hover === 'save' && <Typography variant="caption" style={{ color: 'white', fontSize: '12px' }}>Guardar</Typography>}
                </IconButton>
            </Tooltip>

            {/* Botón Cancelar */}
            <Tooltip title="Cancelar" arrow>
                <IconButton
                    onClick={cancelEditing}
                    color="error"
                    onMouseEnter={() => setHover('cancel')}
                    onMouseLeave={() => setHover(null)}
                    style={{
                        width: hover === 'cancel' ? '80px' : '30px',
                        height: '30px',
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
                    {hover === 'cancel' && <Typography variant="caption" style={{ color: 'white', fontSize: '12px' }}>Cancelar</Typography>}
                </IconButton>
            </Tooltip>
        </div>
    );
};

ActionButtons.propTypes = {
    saveChanges: PropTypes.func.isRequired,
    cancelEditing: PropTypes.func.isRequired,
    row: PropTypes.shape({
        original: PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        }).isRequired,
    }).isRequired,
};

export default ActionButtons;
