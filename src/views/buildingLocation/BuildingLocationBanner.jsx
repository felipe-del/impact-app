/**
 * BuildingLocationBanner component.
 * 
 * This component displays a banner for the Building Location page with a title and action buttons.
 * It includes buttons for navigating back and creating a new building location.
 * It uses Material-UI for styling and icons.
 * The component is customizable with props for the title and visible buttons.
 */
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import BannerActionButton from "../../components/button/BannerActionButton.jsx";
import {bannerStyle} from "../../style/codeStyle.js";
import PlusOneIcon from '@mui/icons-material/PlusOne';

/**
 * BuildingLocationBanner component that displays a banner with a title and action buttons.
 * 
 * @component
 * @param {string} title - The title of the banner.
 * @param {Array<string>} visibleButtons - An array of strings representing the buttons to be displayed.
 * @param {function} createBuildingLocation - Function to call when the "Agregar Número de Piso en edificio" button is clicked.
 * @returns {JSX.Element} - The BuildingLocationBanner component.
 */
const BuildingLocationBanner = ({ title = "", visibleButtons = [""], createBuildingLocation}) => {
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
                {visibleButtons.includes("createBuildingLocation") && (
                    <BannerActionButton
                        onClick={createBuildingLocation}
                        text={"Agregar Número de Piso en edificio"} icon={<PlusOneIcon  />}
                        color="error"
                        style={styles.button}
                        widthWhenIsHover={"280px"}
                    />
                )}


            </div>
        </div>
    );
};

BuildingLocationBanner.propTypes = {
    title: PropTypes.string,
    handleOpen: PropTypes.func,
    visibleButtons: PropTypes.arrayOf(PropTypes.string),
    createBuildingLocation: PropTypes.func,
};


export default BuildingLocationBanner;
