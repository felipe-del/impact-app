import { useState } from "react";
import { Tooltip, Typography } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import PropTypes from "prop-types";

const RenewalButton =({renewAction, row}) => {

    const [hover, setHover] = useState(false);
    
    return (
        <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
            <Tooltip title={"Renovar"} arrow>
                <button
                    onClick={() => renewAction(row)} // Solo si existe la acción
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    style={{
                            width: hover ? '90px' : '24px',
                            height: '24px',
                            borderRadius: '8px',
                            padding: '0 8px',
                            background: hover ? "#008000" : '#005DA4',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            transition: 'width 0.2s ease-in-out',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                    }}
                >
                    <AutorenewIcon style={{ fontSize: "18px", color: "white" }} /> {/* Cambiado aquí */}
                    {hover && <Typography variant="caption" style={{ color: 'white', fontFamily: 'Montserrat' }}>Renovar</Typography>}
                </button>
            </Tooltip>
        </div>
    );

};

RenewalButton.propTypes = {
    renewAction: PropTypes.func.isRequired,
    row: PropTypes.object.isRequired
};

export default RenewalButton;