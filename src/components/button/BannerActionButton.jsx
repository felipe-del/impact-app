import { useState } from 'react';
import { IconButton, Tooltip, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const BannerActionButton = ({ onClick, icon, text, color = "primary", style = {}, widthWhenIsHover = '100px' }) => {
    const [hover, setHover] = useState(false);

    // Define a mapping for gradient colors
    const gradientMapping = {
        primary: 'linear-gradient(45deg, #1976d2, #42a5f5)', // Primary Gradient
        secondary: 'linear-gradient(45deg, #dc004e, #f73378)', // Secondary Gradient
        error: 'linear-gradient(45deg, #d32f2f, #f44336)', // Error Gradient
        warning: 'linear-gradient(45deg, #f57c00, #ff9800)', // Warning Gradient
        info: 'linear-gradient(45deg, #0288d1, #03a9f4)', // Info Gradient
        success: 'linear-gradient(45deg, #388e3c, #4caf50)', // Success Gradient
    };

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
