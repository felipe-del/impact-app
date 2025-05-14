/**
 * RenewalButton Component
 * 
 * This component renders a button with a renewal icon and a tooltip.
 * When hovered, it expands to show the text "Renovar".
 * It is used to renew a row in a table or list.
 */
import { useState } from "react";
import { IconButton, Tooltip, Typography } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import PropTypes from "prop-types";

/**
 * RenewalButton component that displays a renewal icon and expands to show text on hover.
 * 
 * @component
 * @param {function} renewAction - Function to call when the button is clicked.
 * @param {object} row - The row data associated with the button.
 * @returns {JSX.Element} The rendered RenewalButton component.
 */
const RenewalButton = ({ renewAction, row }) => {
    const [hover, setHover] = useState(false);

    return (
        <Tooltip title="Renovar" arrow>
            <IconButton
                onClick={() => renewAction(row)}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{
                    width: hover ? '90px' : '28px',
                    height: '24px',
                    borderRadius: '8px',
                    padding: '0 8px',
                    background: hover ? '#008000' : '#005DA4',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transition: 'width 0.2s ease-in-out',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                }}
            >
                <AutorenewIcon style={{ fontSize: '16px', color: 'white', marginRight: hover ? '5px' : '0' }} />
                {hover && <Typography variant="caption" style={{ color: 'white', fontFamily: 'Montserrat' }}>Renovar</Typography>}
            </IconButton>
        </Tooltip>
    );
};

RenewalButton.propTypes = {
    renewAction: PropTypes.func.isRequired,
    row: PropTypes.object.isRequired
};

export default RenewalButton;
