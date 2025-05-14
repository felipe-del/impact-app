/**
 * ActionButtons Component
 * 
 * This component renders two buttons: Accept and Cancel.
 * Each button has an icon and expands to show text on hover.
 * It is used to accept or cancel an action in a user interface.
 */

import { useState } from 'react';
import { IconButton, Tooltip, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

/**
 * ActionButtons component that displays Accept and Cancel buttons with icons.
 * 
 * @component
 * @param {function} acceptAction - Function to call when the Accept button is clicked.
 * @param {function} cancelAction - Function to call when the Cancel button is clicked.
 * @param {string} labelAccept - Label for the Accept button (default: "Aceptar").
 * @param {string} labelCancel - Label for the Cancel button (default: "Cancelar").
 * @returns {JSX.Element} The rendered ActionButtons component.
*/
const ActionButtons = ({ acceptAction, cancelAction, labelAccept = "Aceptar", labelCancel = "Cancelar" }) => {
    const [hover, setHover] = useState(null);

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
            {/* Botón Aceptar */}
            <Tooltip title={labelAccept} arrow>
                <IconButton
                    onClick={acceptAction}
                    color="success"
                    onMouseEnter={() => setHover('accept')}
                    onMouseLeave={() => setHover(null)}
                    style={{
                        width: hover === 'accept' ? '150px' : '80px',
                        height: '50px',
                        borderRadius: '25px',
                        backgroundColor: '#4caf50',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        transition: 'width 0.2s ease-in-out, background-color 0.2s ease-in-out',
                        padding: '0',
                        overflow: 'hidden',
                    }}
                >
                    <CheckIcon style={{ fontSize: '18px', color: 'white' }} />
                    {hover === 'accept' && (
                        <Typography
                            variant="body2"
                            style={{
                                color: 'white',
                                fontSize: '14px',
                                fontFamily: 'Montserrat',
                                marginLeft: '8px',
                            }}
                        >
                            {labelAccept}
                        </Typography>
                    )}
                </IconButton>
            </Tooltip>

            {/* Botón Cancelar */}
            <Tooltip title={labelCancel} arrow>
                <IconButton
                    onClick={cancelAction}
                    color="error"
                    onMouseEnter={() => setHover('cancel')}
                    onMouseLeave={() => setHover(null)}
                    style={{
                        width: hover === 'cancel' ? '150px' : '80px',
                        height: '50px',
                        borderRadius: '25px',
                        backgroundColor: '#f44336',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        transition: 'width 0.2s ease-in-out, background-color 0.2s ease-in-out',
                        padding: '0',
                        overflow: 'hidden',
                    }}
                >
                    <CloseIcon style={{ fontSize: '18px', color: 'white' }} />
                    {hover === 'cancel' && (
                        <Typography
                            variant="body2"
                            style={{
                                color: 'white',
                                fontSize: '14px',
                                fontFamily: 'Montserrat',
                                marginLeft: '8px',
                            }}
                        >
                            Cancelar
                        </Typography>
                    )}
                </IconButton>
            </Tooltip>
        </div>
    );
};

ActionButtons.propTypes = {
    acceptAction: PropTypes.func.isRequired,
    cancelAction: PropTypes.func.isRequired,
    labelAccept: PropTypes.string,
    labelCancel: PropTypes.string,
};

export default ActionButtons;
