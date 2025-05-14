/**
 * AssetModelBanner component.
 * 
 * This component is used to display a banner with a title and action buttons for asset model management.
 * It includes buttons for going back and creating a new asset model.
 * The component uses Material-UI for styling and icons.
 */
import { ArrowBack, AddBusiness } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import BannerActionButton from "../../components/button/BannerActionButton.jsx";
import {bannerStyle} from "../../style/codeStyle.js";

/**
 * AssetModelBanner component that displays a banner with a title and action buttons.
 * 
 * @component
 * @param {string} title - The title of the banner.
 * @param {Array<string>} visibleButtons - An array of strings representing the buttons to be displayed.
 * @param {function} createAssetModel - Function to call when the "Agregar Modelo de Activo" button is clicked.
 */
const AssetModelBanner = ({ title = "", visibleButtons = [""], createAssetModel}) => {
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
                {visibleButtons.includes("createAssetModel") && (
                    <BannerActionButton
                        onClick={createAssetModel}
                        text={"Agregar Modelo de Activo"} icon={<AddBusiness  />}
                        color="error"
                        style={styles.button}
                        widthWhenIsHover={"220px"}
                    />
                )}
            </div>
        </div>
    );
};

AssetModelBanner.propTypes = {
    title: PropTypes.string,
    visibleButtons: PropTypes.arrayOf(PropTypes.string),
    createAssetModel: PropTypes.func,
};


export default AssetModelBanner;
