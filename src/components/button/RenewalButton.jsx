import { useState } from "react";
import { IconButton, Tooltip, Typography } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import PropTypes from "prop-types";

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
