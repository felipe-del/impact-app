import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { FileDownload, AssignmentInd, ArrowBack, PersonAdd } from "@mui/icons-material";
import { CSVLink } from "react-csv";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import ActionButton from "../../components/button/ActionButton.jsx";

const UserBanner = ({ title = "", flatUsers, exportToPDF, handleOpen,
                        visibleButtons = ["csv", "pdf", "roles", "createUser", "export"] }) => {
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
                {visibleButtons.includes("createUser") && (
                    <ActionButton
                        onClick={() => navigate("/app/createUser")}
                        text={"Crear Usuario"}
                        icon={<PersonAdd />}
                        color="error"
                        style={styles.button}
                        widthWhenIsHover={"150px"}
                    />

                )}
                {visibleButtons.includes("roles") && (
                    <ActionButton
                        onClick={handleOpen} text={"Roles y Estados"}
                        icon={<AssignmentInd />}
                        color="warning"
                        style={styles.button}
                        widthWhenIsHover={"150px"}
                    />
                )}
               {visibleButtons.includes("export") && (
                   <ActionButton
                       onClick={handleClick}
                       icon={<FileDownload />}
                       text="Exportar" color="info"
                       style={styles.button}
                   />
               )}
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                    {visibleButtons.includes("csv") && (
                        <CSVLink
                            data={flatUsers}
                            filename="usuarios.csv"
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

UserBanner.propTypes = {
    title: PropTypes.string,
    flatUsers: PropTypes.array,
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

export default UserBanner;
