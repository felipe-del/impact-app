/**
 * ProductCategoryBanner Component
 * 
 * This component is used to display a banner for the Product Category management page.
 * It includes a title and action buttons for navigation and creating a new product category.
 * It uses Material-UI for styling and icons.
 */
import { ArrowBack, AddBusiness } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import BannerActionButton from "../../components/button/BannerActionButton.jsx";
import {bannerStyle} from "../../style/codeStyle.js";

/**
 * ProductCategoryBanner component that displays a banner for the Product Category management page.
 * 
 * @component
 * @param {string} title - The title of the banner.
 * @param {Array} visibleButtons - The buttons to display on the banner.
 * @param {function} createProductCategory - The function to call when creating a new product category.
 * @return {JSX.Element} - The ProductCategoryBanner component.
 */
const ProductCategoryBanner = ({ title = "", visibleButtons = [""], createProductCategory}) => {
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
                {visibleButtons.includes("createProductCategory") && (
                    <BannerActionButton
                        onClick={createProductCategory}
                        text={"Agregar Categoría de Producto"} icon={<AddBusiness  />}
                        color="error"
                        style={styles.button}
                        widthWhenIsHover={"260px"}
                    />
                )}
            </div>
        </div>
    );
};

ProductCategoryBanner.propTypes = {
    title: PropTypes.string,
    visibleButtons: PropTypes.arrayOf(PropTypes.string),
    createProductCategory: PropTypes.func,
};


export default ProductCategoryBanner;
