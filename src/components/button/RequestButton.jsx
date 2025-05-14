/**
 * RequestButton Component
 * 
 * This component renders a button with a check and cancel icon and a tooltip.
 * When hovered, it expands to show the text "Aprobar o Denegar".
 * It is used to approve or deny a row in a table or list.
 */
import { useState } from 'react';
import { IconButton, Tooltip, Box } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { gradientMapping } from "../../style/codeStyle.js";

/**
 * RequestButton component that displays a check and cancel icon and expands to show text on hover.
 * 
 * @component
 * @param {function} handleEdit - Function to call when the button is clicked.
 * @param {object} row - The row data associated with the button.
 * @returns {JSX.Element} The rendered RequestButton component.
 */
const RequestButton = ({ handleEdit, row }) => {
    const [hover, setHover] = useState(false);

    return (
        <Tooltip title="Aprobar o Denegar" arrow>
            <Box
                onClick={() => handleEdit(row)}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                    width: hover ? '80px' : '60px',
                    height: '34px',
                    borderRadius: '8px',
                    background: hover ? gradientMapping['secondary'] : '#005DA4',
                    transition: 'all 0.2s ease-in-out',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    px: 1
                }}
            >
                <DoneIcon sx={{ color: 'white', fontSize: '18px' }} />
                <CloseIcon sx={{ color: 'white', fontSize: '18px' }} />
            </Box>
        </Tooltip>
    );
};

RequestButton.propTypes = {
    handleEdit: PropTypes.func.isRequired,
    row: PropTypes.object.isRequired,
};

export default RequestButton;
