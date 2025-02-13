import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { FileDownload, AssignmentInd, ArrowBack, PersonAdd } from "@mui/icons-material";
import { CSVLink } from "react-csv";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import BannerActionButton from "../../components/button/BannerActionButton.jsx";
import {bannerStyle} from "../../style/codeStyle.js";

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

    const styles = bannerStyle;

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
                    <BannerActionButton
                        onClick={() => navigate("/app/createUser")}
                        text={"Crear Usuario"}
                        icon={<PersonAdd />}
                        color="error"
                        style={styles.button}
                        widthWhenIsHover={"150px"}
                    />

                )}
                {visibleButtons.includes("roles") && (
                    <BannerActionButton
                        onClick={handleOpen} text={"Roles y Estados"}
                        icon={<AssignmentInd />}
                        color="warning"
                        style={styles.button}
                        widthWhenIsHover={"150px"}
                    />
                )}
               {visibleButtons.includes("export") && (
                   <BannerActionButton
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

export default UserBanner;
