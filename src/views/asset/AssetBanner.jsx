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

const AssetBanner = ({ title = "",
                         visibleButtons = ["csv", "pdf", "statusModal", "export", "createAsset"],
                         exportToPDF,
                         flatAssets,
                         handleOpen,
                     assetInfo}) => {
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
    assetInfo: PropTypes.func,
};


export default AssetBanner;
