/**
 * User Banner Component
 * 
 * This component is used to display a banner for the User management page.
 * It includes a title and action buttons for navigation and exporting data.
 * It uses Material-UI for styling and icons.
 * It also includes a modal for displaying roles and states.
 */
import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import LockResetIcon from '@mui/icons-material/LockReset';
import { FileDownload, AssignmentInd, ArrowBack, PersonAdd } from "@mui/icons-material";
import { CSVLink } from "react-csv";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import BannerActionButton from "../../components/button/BannerActionButton.jsx";
import {bannerStyle} from "../../style/codeStyle.js";

/**
 * UserBanner component that displays a banner for the User management page.
 * 
 * @component
 * @param {string} title - The title of the banner.
 * @param {Array} flatUsers - The list of users to export.
 * @param {function} exportToPDF - The function to call when exporting to PDF.
 * @param {function} handleOpen - The function to call when opening the roles and states modal.
 * @param {Array} visibleButtons - The list of buttons to display on the banner.
 * @param {function} showChangePasswordForm - The function to call when showing the change password form.
 * @return {JSX.Element} - The UserBanner component.
 */
const UserBanner = ({ title = "", flatUsers, exportToPDF, handleOpen,
                        visibleButtons = ["csv", "pdf", "roles", "createUser", "export"], showChangePasswordForm }) => {
    const navigate = useNavigate(); 
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const styles = bannerStyle;

    return (
        <div className="export-buttons" style={styles.banner}>
            <h3 style={styles.title}>{title}</h3>
            <div style={styles.buttonsContainer}>
                {visibleButtons.includes("goBack") && (
                    <BannerActionButton
                        onClick={() => navigate(-1)}
                        text={"Volver"}
                        icon={<ArrowBack />}
                        color="error"
                        style={styles.button}
                    />
                )}
                {visibleButtons.includes("changePassword") && (
                    <BannerActionButton
                        onClick={showChangePasswordForm}
                        text={"Restablecer Contraseña"}
                        icon={<LockResetIcon />}
                        color="warning"
                        style={styles.button}
                        widthWhenIsHover={"200px"}
                    />
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
    showChangePasswordForm: PropTypes.func,
};

export default UserBanner;
