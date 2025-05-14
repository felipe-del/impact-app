/**
 * AssetCategoryBanner component
 * 
 * This component displays a banner with a title and action buttons for managing asset categories.
 * It includes buttons for navigating back and creating a new asset category.
 * It uses Material-UI for styling and icons.
 * The component is customizable with props for the title and visible buttons.
 */
import { ArrowBack, AddBusiness } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import BannerActionButton from "../../components/button/BannerActionButton.jsx";
import {bannerStyle} from "../../style/codeStyle.js";

/**
 * AssetCategoryBanner component that displays a banner with a title and action buttons.
 * 
 * @component
 * @param {string} title - The title of the banner.
 * @param {Array<string>} visibleButtons - An array of strings representing the buttons to be displayed.
 * @param {function} createAssetCategory - Function to call when the "Agregar Categoría de Activo" button is clicked.
 * @returns {JSX.Element} - The AssetCategoryBanner component.
 */
const AssetCategoryBanner = ({ title = "", visibleButtons = [""], createAssetCategory}) => {
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
                {visibleButtons.includes("createAssetCategory") && (
                    <BannerActionButton
                        onClick={createAssetCategory}
                        text={"Agregar Categoría de Activo"} icon={<AddBusiness  />}
                        color="error"
                        style={styles.button}
                        widthWhenIsHover={"240px"}
                    />
                )}
            </div>
        </div>
    );
};

AssetCategoryBanner.propTypes = {
    title: PropTypes.string,
    visibleButtons: PropTypes.arrayOf(PropTypes.string),
    createAssetCategory: PropTypes.func,
};


export default AssetCategoryBanner;
