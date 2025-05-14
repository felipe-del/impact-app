/**
 * BannerActionButton Component
 * 
 * This component renders a button with an icon and a tooltip.
 * When hovered, it expands to show the text and changes its background color.
 * It is used to perform an action in a user interface.
 */

import {useState} from 'react';
import {IconButton, Tooltip, Typography} from '@mui/material';
import PropTypes from 'prop-types';
import {gradientMapping} from "../../style/codeStyle.js";

/**
 * BannerActionButton component that displays an icon and expands to show text on hover.
 * 
 * @component
 * @param {function} onClick - Function to call when the button is clicked.
 * @param {node} icon - The icon to display inside the button.
 * @param {string} text - The text to display when the button is hovered.
 * @param {string} color - The color of the button (default: "primary").
 * @param {object} style - Additional styles to apply to the button.
 * @param {string} widthWhenIsHover - The width of the button when hovered (default: '100px').
 * * @returns {JSX.Element} The rendered BannerActionButton component.
 */
const BannerActionButton = ({ onClick, icon, text, color = "primary", style = {}, widthWhenIsHover = '100px' }) => {
    const [hover, setHover] = useState(false);

    // Define a mapping for gradient colors
    return (
        <Tooltip title={text} arrow>
            <IconButton
                onClick={onClick}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{
                    width: hover ? widthWhenIsHover : '40px',
                    height: '40px',
                    borderRadius: '8px',
                    padding: '0 8px',
                    background: hover ? gradientMapping[color] : '#005DA4', // Apply gradient on hover
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transition: 'width 0.3s ease-in-out, background 0.3s ease-in-out', // Smooth transition for width and background
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    ...style,
                }}
            >
                {icon && <div style={{ fontSize: '16px', color: 'white', marginRight: hover ? '5px' : '0' }}>{icon}</div>}
                {hover && <Typography variant="caption" style={{ fontFamily: 'Montserrat, sans-serif', color: 'white' }}>{text}</Typography>}
            </IconButton>
        </Tooltip>
    );
};

BannerActionButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    icon: PropTypes.node.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
    style: PropTypes.object,
    widthWhenIsHover: PropTypes.string,
};

export default BannerActionButton;
