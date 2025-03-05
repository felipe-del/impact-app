import { ArrowBack } from "@mui/icons-material";
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import BannerActionButton from "../../components/button/BannerActionButton.jsx";
import {bannerStyle} from "../../style/codeStyle.js";
import InfoIcon from "@mui/icons-material/Info.js";

const ProductBanner = ({ title = "", visibleButtons = [""], productInfo}) => {
    const navigate = useNavigate();

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
                        text={"Agregar Producto"} icon={<VideoCallIcon  />}
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

            </div>
        </div>
    );
};

ProductBanner.propTypes = {
    title: PropTypes.string,
    visibleButtons: PropTypes.arrayOf(PropTypes.string),
    productInfo: PropTypes.func
};


export default ProductBanner;
