import { useState } from "react";
import { Tooltip, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import PropTypes from "prop-types";

const SaveButton = ({ acceptAction, labelAccept = "Aceptar" }) => {
    const [hover, setHover] = useState(false);

    return (
        <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
            <Tooltip title={labelAccept} arrow>
                <button
                    type={acceptAction ? "button" : "submit"} // Si no hay acción, es un submit
                    onClick={acceptAction || undefined} // Solo si existe la acción
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
                    <SaveIcon style={{ fontSize: "18px", color: "white" }} />
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
                            {labelAccept}
                        </Typography>
                    )}
                </button>
            </Tooltip>
        </div>
    );
};

SaveButton.propTypes = {
    acceptAction: PropTypes.func,
    labelAccept: PropTypes.string,
};

export default SaveButton;
