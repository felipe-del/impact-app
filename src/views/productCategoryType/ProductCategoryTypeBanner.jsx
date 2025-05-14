/**
 * ProductCategoryTypeBanner Component
 * 
 * This component is used to display a banner for the Product Category Type management page.
 * It includes a title and action buttons for navigation and creating a new product category type.
 * It uses Material-UI for styling and icons.
 */
import { ArrowBack, AddBusiness } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import BannerActionButton from "../../components/button/BannerActionButton.jsx";
import {bannerStyle} from "../../style/codeStyle.js";

/**
 * ProductCategoryTypeBanner component that displays a banner for the Product Category Type management page.
 * 
 * @component
 * @param {string} title - The title of the banner.
 * @param {Array} visibleButtons - The buttons to display on the banner.
 * @param {function} createProductCategoryType - The function to call when creating a new product category type.
 * @return {JSX.Element} - The ProductCategoryTypeBanner component.
 */
const ProductCategoryTypeBanner = ({ title = "", visibleButtons = [""], createProductCategoryType}) => {
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
                {visibleButtons.includes("createProductCategoryType") && (
                    <BannerActionButton
                        onClick={createProductCategoryType}
                        text={"Agregar Tipo Categoría de Producto"} icon={<AddBusiness  />}
                        color="error"
                        style={styles.button}
                        widthWhenIsHover={"280px"}
                    />
                )}
            </div>
        </div>
    );
};

ProductCategoryTypeBanner.propTypes = {
    title: PropTypes.string,
    visibleButtons: PropTypes.arrayOf(PropTypes.string),
    createProductCategoryType: PropTypes.func,
};


export default ProductCategoryTypeBanner;
