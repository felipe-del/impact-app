import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import {FileDownload, ArrowBack, PersonAdd} from "@mui/icons-material";
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import { CSVLink } from "react-csv";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import ActionButton from "../../components/button/ActionButton.jsx";

const AssetBanner = ({ title = "",
                         visibleButtons = ["csv", "pdf", "statusModal", "export", "createAsset"],
                         exportToPDF,
                         flatAssets,
                         handleOpen }) => {
    const navigate = useNavigate(); // Hook para la navegación
    const [anchorEl, setAnchorEl] = useState(null);

    // Abre el menú
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Cierra el menú
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="export-buttons" style={styles.banner}>
            <h3 style={styles.title}>{title}</h3>
            <div style={styles.buttonsContainer}>

                {visibleButtons.includes("createAsset") && (
                    <ActionButton
                        onClick={() => navigate("/app/createAsset")}
                        text={"Crear Activo"} icon={<PersonAdd />}
                        color="error"
                        style={styles.button}
                        widthWhenIsHover={"150px"}
                    />
                )}
                {visibleButtons.includes("statusModal") && (
                    <ActionButton
                        onClick={handleOpen}
                        text={"Estados del Activo"}
                        icon={<ManageHistoryIcon />}
                        color="warning"
                        style={styles.button}
                        widthWhenIsHover={"170px"}
                    />

                )}
                {visibleButtons.includes("goBack") && (
                    <ActionButton
                        onClick={() => navigate(-1)}
                        text={"Volver"}
                        icon={<ArrowBack />}
                        color={"error"}
                        style={styles.button}
                    />

                )}
                {visibleButtons.includes("export") && (
                    <ActionButton
                        onClick={handleClick}
                        icon={<FileDownload />}
                        text="Exportar"
                        color="info"
                        style={styles.button}
                    />
                )}
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                    {visibleButtons.includes("csv") && (
                        <CSVLink
                            data={flatAssets}
                            filename="activos.csv"
                            style={{ textDecoration: "none", color: "black" }}
                        >
                            <MenuItem onClick={handleClose}>Exportar a CSV</MenuItem>
                        </CSVLink>
                    )}
                    {visibleButtons.includes("pdf") && (
                        <MenuItem
                            onClick={() => {
                                exportToPDF();
                                handleClose();
                            }}
                            style={{ color: "black" }}
                        >
                            Exportar a PDF
                        </MenuItem>
                    )}
                </Menu>

            </div>
        </div>
    );
};

AssetBanner.propTypes = {
    title: PropTypes.string,
    flatAssets: PropTypes.array,
    exportToPDF: PropTypes.func,
    handleOpen: PropTypes.func,
    visibleButtons: PropTypes.arrayOf(PropTypes.string),
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
