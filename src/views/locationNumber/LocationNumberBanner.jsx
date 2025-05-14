/**
 * LocationNumberBanner Component
 * 
 * This component is used to display a banner for the Location Number management page.
 * It includes a title and action buttons for navigation and creating a new location number.
 * It uses Material-UI for styling and icons.
 */
import { ArrowBack, AddBusiness } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import BannerActionButton from "../../components/button/BannerActionButton.jsx";
import {bannerStyle} from "../../style/codeStyle.js";

/**
 * LocationNumberBanner component that displays a banner for the Location Number management page.
 * 
 * @component
 * @param {string} title - The title of the banner.
 * @param {Array} visibleButtons - The buttons to display on the banner.
 * @param {function} createLocationNumber - The function to call when creating a new location number.
 * @returns {JSX.Element} - The LocationNumberBanner component.
 */
const LocationNumberBanner = ({ title = "", visibleButtons = [""], createLocationNumber}) => {
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
                {visibleButtons.includes("createLocationNumber") && (
                    <BannerActionButton
                        onClick={createLocationNumber}
                        text={"Agregar Número Ubicación"} icon={<AddBusiness  />}
                        color="error"
                        style={styles.button}
                        widthWhenIsHover={"240px"}
                    />
                )}
            </div>
        </div>
    );
};

LocationNumberBanner.propTypes = {
    title: PropTypes.string,
    visibleButtons: PropTypes.arrayOf(PropTypes.string),
    createLocationNumber: PropTypes.func,
};


export default LocationNumberBanner;
