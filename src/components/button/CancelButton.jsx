import { useState } from 'react';
import { IconButton, Tooltip, Typography } from '@mui/material';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';

import PropTypes from 'prop-types';
import {gradientMapping} from "../../style/codeStyle.js";

const CancelButton = ({ handleCancel, row }) => {
    const [hover, setHover] = useState(false);

    return (
        <Tooltip title="Cancelar" arrow>
            <IconButton
                onClick={() => handleCancel(row)}
                color="primary"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{
                    width: hover ? '90px' : '24px',
                    height: '24px',
                    borderRadius: '8px',
                    padding: '0 8px',
                    background: hover ? gradientMapping['error'] : '#005DA4',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transition: 'width 0.2s ease-in-out',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                }}
            >
                <DoDisturbIcon style={{ fontSize: '16px', color: 'white', marginRight: hover ? '5px' : '0' }} />
                {hover && <Typography variant="caption" style={{ color: 'white', fontFamily: 'Montserrat' }}>Cancelar</Typography>}
            </IconButton>
        </Tooltip>
    );
};

CancelButton.propTypes = {
    handleCancel: PropTypes.func.isRequired,
    row: PropTypes.object.isRequired,
};

export default CancelButton;
