/**
 * ProductBanner Component
 * 
 * This component is used to display a banner for the Product management page.
 * It includes a title and action buttons for navigation, creating a new product,
 * exporting data to CSV and PDF, and displaying product information.
 * It uses Material-UI for styling and icons.
 */
import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { FileDownload, ArrowBack, VideoCall } from "@mui/icons-material";
import { CSVLink } from "react-csv";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import BannerActionButton from "../../components/button/BannerActionButton.jsx";
import { bannerStyle } from "../../style/codeStyle.js";
import InfoIcon from "@mui/icons-material/Info.js";

/**
 * ProductBanner component that displays a banner for the Product management page.
 * 
 * @component
 * @param {string} title - The title of the banner.
 * @param {Array} visibleButtons - The buttons to display on the banner.
 * @param {function} productInfo - The function to call when displaying product information.
 * @param {function} exportToPDF - The function to call when exporting data to PDF.
 * @param {function} preparePDF - The function to call when preparing data for PDF export.
 * @param {Array} productData - The data to export to CSV.
 * @return {JSX.Element} - The ProductBanner component.
 */
const ProductBanner = ({
    title = "",
    visibleButtons = ["export", "csv", "pdf", "createProduct"],
    productInfo,
    exportToPDF,
    preparePDF, 
    productData
}) => {
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
                        color={"error"}
                        style={styles.button}
                    />
                )}
                {visibleButtons.includes("createProduct") && (
                    <BannerActionButton
                        onClick={() => navigate("/app/createProduct")}
                        text={"Agregar Producto"}
                        icon={<VideoCall />}
                        color="error"
                        style={styles.button}
                        widthWhenIsHover={"170px"}
                    />
                )}
                {visibleButtons.includes("productInfo") && (
                    <BannerActionButton
                        onClick={productInfo}
                        text={"Información del Producto"}
                        icon={<InfoIcon />}
                        color={"warning"}
                        style={styles.button}
                        widthWhenIsHover={"200px"}
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
                            data={[
                                ["ID", "Nombre", "Fecha de Compra", "Estado", "Unidad de Medida", "Categoría"],
                                ...productData.map(product => [
                                    product.id,
                                    product.category?.name || "N/A",
                                    product.purchaseDate,
                                    product.status?.name || "N/A",
                                    product.category?.unitOfMeasurement?.name || "N/A",
                                    product.category?.categoryType?.name || "N/A"
                                ])
                            ]}
                            filename="Productos.csv"
                            style={{ textDecoration: "none", color: "black" }}
                        >
                            <MenuItem onClick={() => {
                                preparePDF();
                                handleClose();
                            }}>Exportar a CSV</MenuItem>
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

ProductBanner.propTypes = {
    title: PropTypes.string,
    visibleButtons: PropTypes.arrayOf(PropTypes.string),
    productInfo: PropTypes.func,
    exportToPDF: PropTypes.func,
    preparePDF: PropTypes.func,
    productData: PropTypes.array
};

export default ProductBanner;
