import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { FileDownload, AssignmentInd, ArrowBack, PersonAdd } from "@mui/icons-material";
import { CSVLink } from "react-csv";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const AssetBanner = ({ title, visibleButtons }) => {
    const navigate = useNavigate(); // Hook para la navegación

    return (
        <div className="export-buttons" style={styles.banner}>
            <h3 style={styles.title}>{title}</h3>
            <div style={styles.buttonsContainer}>
                {visibleButtons.includes("goBack") && (
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => navigate(-1)} // Regresar una página atrás
                        startIcon={<ArrowBack />}
                        style={styles.button}
                    >
                        Volver
                    </Button>
                )}

            </div>
        </div>
    );
};

AssetBanner.propTypes = {
    title: PropTypes.string,
    flatUsers: PropTypes.array,
    exportToPDF: PropTypes.func,
    handleOpen: PropTypes.func,
    visibleButtons: PropTypes.arrayOf(PropTypes.string),
};

AssetBanner.defaultProps = {
    visibleButtons: ["csv", "pdf", "roles", "createUser", "export"], // Todos visibles por defecto
};

const styles = {
    banner: {
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 15px",
        marginBottom: "20px",
        backgroundColor: "white",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        position: "sticky",
        borderRadius: "15px",
        top: 0,
        zIndex: 100,
    },
    title: {
        fontFamily: "Montserrat, sans-serif",
        fontSize: "20px",
        margin: 5,
        color: "#333",
    },
    buttonsContainer: {
        display: "flex",
        justifyContent: "flex-end",
        gap: "15px",
    },
    button: {
        fontFamily: "Montserrat, sans-serif",
        borderRadius: "15px",
        textTransform: "none",
        fontSize: "12px",
    },
};

export default AssetBanner;
