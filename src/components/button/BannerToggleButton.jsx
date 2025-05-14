/**
 * BannerToggleButton Component
 * 
 * This component renders a button with an icon and a tooltip.
 * When hovered, it expands to show the text and changes its background color.
 * It is used to perform an action in a user interface.
 */

import { useState } from 'react';
import { IconButton, Tooltip, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { gradientMapping } from "../../style/codeStyle.js";

/**
 * BannerToggleButton component that displays an icon and expands to show text on hover.
 * 
 * @component
 * @param {function} onClick - Function to call when the button is clicked.
 * @param {node} icon - The icon to display inside the button.
 * @param {string} text - The text to display when the button is hovered.
 * @param {string} color - The color of the button (default: "primary").
 * @param {object} style - Additional styles to apply to the button.
 * @param {string} widthWhenIsHover - The width of the button when hovered (default: '100px').
 * @returns {JSX.Element} The rendered BannerToggleButton component.
*/
const BannerToggleButton = ({ onClick, icon, text, color = "primary", style = {}, widthWhenIsHover = '100px' }) => {

    const handleClick = () => {
        onClick();
    };

    return (
        <Tooltip title={text} arrow>
            <IconButton
                onClick={handleClick}
                style={{
                    width: widthWhenIsHover,
                    height: '40px',
                    borderRadius: '8px',
                    padding: '0 8px',
                    background: gradientMapping[color],
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transition: 'width 0.3s ease-in-out, background 0.3s ease-in-out',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    ...style,
                }}
            >
                {icon && <div style={{ fontSize: '16px', color: 'white', marginRight: '5px' }}>{icon}</div>}
                <Typography variant="caption" style={{ fontFamily: 'Montserrat, sans-serif', color: 'white' }}>
                    {text}
                </Typography>
            </IconButton>
        </Tooltip>
    );
};

BannerToggleButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    icon: PropTypes.node.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
    style: PropTypes.object,
    widthWhenIsHover: PropTypes.string,
};

export default BannerToggleButton;
