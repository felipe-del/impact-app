/**
 * AssetSubCategoryBanner Component
 * 
 * This component renders a banner for the Asset Sub-Category page.
 * It includes a title and action buttons for navigating back or creating a new asset sub-category.
 * It uses Material-UI for styling and icons.
 * The component is customizable with props for the title and visible buttons.
 */
import { ArrowBack, AddBusiness } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import BannerActionButton from "../../components/button/BannerActionButton.jsx";
import {bannerStyle} from "../../style/codeStyle.js";

/**
 * AssetSubCategoryBanner component that displays a banner with a title and action buttons.
 * 
 * @component
 * @param {string} title - The title of the banner.
 * @param {Array<string>} visibleButtons - An array of strings representing the buttons to be displayed.
 * @param {function} createAssetSubCategory - Function to call when the "Agregar Sub-Categoría de Activo" button is clicked.
 * @returns {JSX.Element} - The AssetSubCategoryBanner component.
 */
const AssetSubCategoryBanner = ({ title = "", visibleButtons = [""], createAssetSubCategory}) => {
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
                {visibleButtons.includes("createAssetSubCategory") && (
                    <BannerActionButton
                        onClick={createAssetSubCategory}
                        text={"Agregar Sub-Categoría de Activo"} icon={<AddBusiness  />}
                        color="error"
                        style={styles.button}
                        widthWhenIsHover={"260px"}
                    />
                )}
            </div>
        </div>
    );
};

AssetSubCategoryBanner.propTypes = {
    title: PropTypes.string,
    visibleButtons: PropTypes.arrayOf(PropTypes.string),
    createAssetSubCategory: PropTypes.func,
};


export default AssetSubCategoryBanner;
