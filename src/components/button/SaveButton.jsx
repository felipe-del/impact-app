import { useState } from 'react';
import { IconButton, Tooltip, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import PropTypes from 'prop-types';

const SaveButton = ({ acceptAction, labelAccept = "Aceptar"}) => {
    const [hover, setHover] = useState(null);

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
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
                    <SaveIcon style={{ fontSize: '18px', color: 'white' }} />
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
        </div>
    );
};

SaveButton.propTypes = {
    acceptAction: PropTypes.func.isRequired,
    labelAccept: PropTypes.string,
};

export default SaveButton;
