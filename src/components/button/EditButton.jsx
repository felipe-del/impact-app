/**
 * EditButton Component
 * 
 * This component renders an edit button with a tooltip and an icon.
 * When hovered, it expands to show the text "Editar".
 * It is used to edit a row in a table or list.
 */
import { useState } from 'react';
import { IconButton, Tooltip, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import PropTypes from 'prop-types';
import {gradientMapping} from "../../style/codeStyle.js";

/**
 * EditButton component that displays an edit icon and expands to show text on hover.
 * 
 * @component
 * @param {function} handleEdit - Function to call when the button is clicked.
 * @param {object} row - The row data associated with the button.
 * @returns {JSX.Element} The rendered EditButton component.
 */
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
