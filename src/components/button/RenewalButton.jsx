import { useState } from "react";
import { Tooltip, Typography } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import PropTypes from "prop-types";

const RenewalButton =({renewAction, labelRenew = "Renovar"}) => {

    const [hover, setHover] = useState(false);

    return (
        <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
            <Tooltip title={labelRenew} arrow>
                <button
                    type={renewAction ? "button" : "submit"} // Si no hay acción, es un submit
                    onClick={renewAction || undefined} // Solo si existe la acción
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    style={{
                        width: hover ? "130px" : "80px",
                        height: "50px",
                        borderRadius: "15px",
                        backgroundColor: hover ? "#4caf50" : "#005DA4",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        transition: "width 0.2s ease-in-out, background-color 0.2s ease-in-out",
                        padding: "0",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    <AutorenewIcon style={{ fontSize: "18px", color: "white" }} /> {/* Cambiado aquí */}
                    {hover && (
                        <Typography
                            variant="body2"
                            style={{
                                color: "white",
                                fontSize: "14px",
                                fontFamily: "Montserrat",
                                marginLeft: "8px",
                            }}
                        >
                            {labelRenew}
                        </Typography>
                    )}
                </button>
            </Tooltip>
        </div>
    );

};

RenewalButton.propTypes = {
    renewAction: PropTypes.func,
    labelRenew: PropTypes.string,
};

export default RenewalButton;