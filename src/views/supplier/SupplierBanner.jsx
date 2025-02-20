import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import {FileDownload, ArrowBack, AddBusiness } from "@mui/icons-material";
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import { CSVLink } from "react-csv";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import BannerActionButton from "../../components/button/BannerActionButton.jsx";
import {bannerStyle} from "../../style/codeStyle.js";

const SupplierBanner = ({ title = "", visibleButtons = [""], exportToPDF, flatBrands, createBrandMethod}) => {
    const navigate = useNavigate();
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
                {visibleButtons.includes("createSupplier") && (
                    <BannerActionButton
                        onClick={createBrandMethod}
                        text={"Agregar Proveedor"} icon={<AddBusiness  />}
                        color="error"
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
                            data={flatBrands}
                            filename="proveedores.csv"
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

SupplierBanner.propTypes = {
    title: PropTypes.string,
    flatBrands: PropTypes.array,
    exportToPDF: PropTypes.func,
    handleOpen: PropTypes.func,
    visibleButtons: PropTypes.arrayOf(PropTypes.string),
    createBrandMethod: PropTypes.func,
};


export default SupplierBanner;
