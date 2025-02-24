import { ArrowBack, AddBusiness } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import BannerActionButton from "../../components/button/BannerActionButton.jsx";
import {bannerStyle} from "../../style/codeStyle.js";

const ProductBanner = ({ title = "", visibleButtons = [""], createProduct}) => {
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
                        onClick={createProduct}
                        text={"Agregar Producto"} icon={<AddBusiness  />}
                        color="error"
                        style={styles.button}
                        widthWhenIsHover={"170px"}
                    />
                )}

            </div>
        </div>
    );
};

ProductBanner.propTypes = {
    title: PropTypes.string,
    visibleButtons: PropTypes.arrayOf(PropTypes.string),
    createProduct: PropTypes.func,
};


export default ProductBanner;
