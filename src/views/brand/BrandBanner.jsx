/**
 * BrandBanner Component
 * 
 * This component renders a banner for the Brand page.
 * It includes a title and action buttons for navigating back, creating a new brand, and exporting data.
 * It uses Material-UI for styling and icons.
 * The component is customizable with props for the title, visible buttons, and export functionality.
 */
import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import {FileDownload, ArrowBack, AddBusiness } from "@mui/icons-material";
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import { CSVLink } from "react-csv";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import BannerActionButton from "../../components/button/BannerActionButton.jsx";
import {bannerStyle} from "../../style/codeStyle.js";

/**
 * BrandBanner component that displays a banner with a title and action buttons.
 * 
 * @component
 * @param {string} title - The title of the banner.
 * @param {Array<string>} visibleButtons - An array of strings representing the buttons to be displayed.
 * @param {function} exportToPDF - Function to call when the "Exportar a PDF" button is clicked.
 * @param {Array} flatBrands - Array of brand data to be exported.
 * @param {function} createBrandMethod - Function to call when the "Agregar Marca" button is clicked.
 * @returns {JSX.Element} - The BrandBanner component.
 */
const BrandBanner = ({ title = "", visibleButtons = [""], exportToPDF, flatBrands, createBrandMethod}) => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    /**
     * Handles the click event for the export button.
     * 
     * @param {object} event - The click event.
     * @returns {void}
     */
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    /**
     * Handles the close event for the menu.
     * 
     * @param {void}
     * @returns {void}
     */
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
                        color={"error"}
                        style={styles.button}
                    />

                )}
                {visibleButtons.includes("createBrand") && (
                    <BannerActionButton
                        onClick={createBrandMethod}
                        text={"Agregar Marca"} icon={<AddBusiness  />}
                        color="error"
                        style={styles.button}
                        widthWhenIsHover={"150px"}
                    />
                )}
                {visibleButtons.includes("export") && (
                    <BannerActionButton
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
                            data={flatBrands}
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

BrandBanner.propTypes = {
    title: PropTypes.string,
    flatBrands: PropTypes.array,
    exportToPDF: PropTypes.func,
    handleOpen: PropTypes.func,
    visibleButtons: PropTypes.arrayOf(PropTypes.string),
    createBrandMethod: PropTypes.func,
};


export default BrandBanner;
