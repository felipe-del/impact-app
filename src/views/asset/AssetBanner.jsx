/**
 * AssetBanner component.
 * 
 * This component displays a banner with export buttons and other actions related to assets.
 * It includes options to export data to CSV or PDF, view asset information, and navigate back.
 */
import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import {FileDownload, ArrowBack, PersonAdd} from "@mui/icons-material";
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import { CSVLink } from "react-csv";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import BannerActionButton from "../../components/button/BannerActionButton.jsx";
import {bannerStyle} from "../../style/codeStyle.js";
import InfoIcon from '@mui/icons-material/Info';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';

/**
 * AssetBanner component that displays a banner with export buttons and other actions related to assets.
 * 
 * @component
 * @param {string} title - The title of the banner.
 * @param {Array} visibleButtons - Array of buttons to be displayed in the banner.
 * @param {function} exportToPDF - Function to export data to PDF.
 * @param {Array} flatAssets - Array of asset objects to be exported.
 * @param {Array} flatRequests - Array of request objects to be exported.
 * @param {function} preparePDF - Function to prepare data for PDF export.
 * @param {number} inventoryValue - The current inventory value.
 * @param {function} handleOpen - Function to open a modal or perform an action.
 * @param {function} assetInfo - Function to display asset information.
 * @returns {JSX.Element} - The AssetBanner component.
 */
const AssetBanner = ({ title = "",
                         visibleButtons = ["csv", "pdf", "statusModal", "export", "createAsset"],
                         exportToPDF,
                         flatAssets,
                         flatRequests,
                         preparePDF,
                         inventoryValue,
                         handleOpen,
                     assetInfo}) => {
    const navigate = useNavigate(); // Hook para la navegación
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
                {visibleButtons.includes("assetInfo") && (
                    <BannerActionButton
                        onClick={assetInfo}
                        text={"Información del Activo"}
                        icon={<InfoIcon />}
                        color={"warning"}
                        style={styles.button}
                        widthWhenIsHover={"200px"}
                    />

                )}

                {visibleButtons.includes("createAsset") && (
                    <BannerActionButton
                        onClick={() => navigate("/app/createAsset")}
                        text={"Crear Activo"} icon={<AddToQueueIcon />}
                        color="error"
                        style={styles.button}
                        widthWhenIsHover={"150px"}
                    />
                )}
                {visibleButtons.includes("statusModal") && (
                    <BannerActionButton
                        onClick={handleOpen}
                        text={"Estados del Activo"}
                        icon={<ManageHistoryIcon />}
                        color="warning"
                        style={styles.button}
                        widthWhenIsHover={"170px"}
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
                            // Agregar encabezado para activos
                            ['ID', 'Placa', 'Valor', 'Usuario Responsable', 'Proveedor', 'Categoría', 'Subcategoría','Marca', 'Estado','Modelo','Serie','Ubicación'],
                            ...flatAssets.map(asset => [
                                asset.id,
                                asset.plateNumber,
                                asset.value,
                                asset.user?.email,  
                                asset.supplier?.name || 'N/A',
                                asset.category?.name || 'N/A',
                                asset.subcategory?.description || 'N/A',
                                asset.brand?.name || 'N/A',
                                asset.status?.name || 'N/A',
                                asset.model?.modelName || 'N/A',
                                asset.assetSeries || 'N/A',
                                asset.locationNumber?.locationTypeName || 'N/A',
                            ]),
                            // Agregar una línea separadora o título para solicitudes
                            [''],  // Dejar una fila vacía para separar las secciones
                            ['Valor actual del inventario: '+ `${inventoryValue[0]?.amount} colones`],
                            [''],
                            ["Fecha de solicitud", "Activo", "Placa", "Usuario", "Razón", "Estado"], // Encabezado para solicitudes
                            ...flatRequests.map(req => [
                                req.createdAt, req.asset.subcategory.description, req.asset.plateNumber, req.user.name, req.reason, req.status.name
                            ]),
                        ]}
                            filename="Informe_de_Activos.csv"
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

AssetBanner.propTypes = {
    title: PropTypes.string,
    flatAssets: PropTypes.array,
    exportToPDF: PropTypes.func,
    handleOpen: PropTypes.func,
    visibleButtons: PropTypes.arrayOf(PropTypes.string),
    assetInfo: PropTypes.func,
};


export default AssetBanner;
