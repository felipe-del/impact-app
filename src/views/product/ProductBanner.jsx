import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { FileDownload, ArrowBack, VideoCall } from "@mui/icons-material";
import { CSVLink } from "react-csv";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import BannerActionButton from "../../components/button/BannerActionButton.jsx";
import { bannerStyle } from "../../style/codeStyle.js";
import InfoIcon from "@mui/icons-material/Info.js";

const ProductBanner = ({
    title = "",
    visibleButtons = ["export", "csv", "pdf", "createProduct"],
    productInfo,
    exportToPDF,
    preparePDF, // Asegurar que preparePDF esté disponible
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
                                preparePDF(); // Llamamos preparePDF antes de cerrar
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
