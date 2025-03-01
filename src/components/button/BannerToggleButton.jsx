import { useState } from 'react';
import { IconButton, Tooltip, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { gradientMapping } from "../../style/codeStyle.js";

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
