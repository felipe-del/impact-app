import { useState } from 'react';
import { IconButton, Tooltip, Box } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { gradientMapping } from "../../style/codeStyle.js";

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
