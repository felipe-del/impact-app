import { useState } from 'react';
import { IconButton, Tooltip, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import PropTypes from 'prop-types';
import {gradientMapping} from "../../style/codeStyle.js";

const EditButton = ({ handleEdit, row }) => {
    const [hover, setHover] = useState(false);

    return (
        <Tooltip title="Editar" arrow>
            <IconButton
                onClick={() => handleEdit(row)}
                color="primary"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{
                    width: hover ? '84px' : '24px',  // Se expande al hacer hover
                    height: '24px',
                    borderRadius: '8px',
                    padding: '0 8px',
                    background: hover ? gradientMapping['secondary'] : '#005DA4',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transition: 'width 0.2s ease-in-out', // Suaviza la animación
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                }}
            >
                <EditIcon style={{ fontSize: '16px', color: 'white', marginRight: hover ? '5px' : '0' }} />
                {hover && <Typography variant="caption" style={{ color: 'white', fontFamily: 'Montserrat' }}>Editar</Typography>}
            </IconButton>
        </Tooltip>
    );
};

EditButton.propTypes = {
    handleEdit: PropTypes.func.isRequired,
    row: PropTypes.object.isRequired,
};

export default EditButton;
