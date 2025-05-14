/**
 * BuildingBanner component
 * 
 * This component displays a banner for the building management page.
 * It includes a title and action buttons for navigating back or creating a new building.
 * It uses Material-UI for styling and icons.
 * The component is customizable with props for the title and visible buttons.
 */
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import BannerActionButton from "../../components/button/BannerActionButton.jsx";
import {bannerStyle} from "../../style/codeStyle.js";
import DomainAddIcon from '@mui/icons-material/DomainAdd';

/**
 * BuildingBanner component that displays a banner with a title and action buttons.
 * 
 * @component
 * @param {string} title - The title of the banner.
 * @param {Array<string>} visibleButtons - An array of strings representing the buttons to be displayed.
 * @param {function} createBuilding - Function to call when the "Agregar Edificio" button is clicked.
 * @returns {JSX.Element} - The BuildingBanner component.
 */
const BuildingBanner = ({ title = "", visibleButtons = [""], createBuilding}) => {
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
                {visibleButtons.includes("createBuilding") && (
                    <BannerActionButton
                        onClick={createBuilding}
                        text={"Agregar Edificio"} icon={<DomainAddIcon  />}
                        color="error"
                        style={styles.button}
                        widthWhenIsHover={"150px"}
                    />
                )}


            </div>
        </div>
    );
};

BuildingBanner.propTypes = {
    title: PropTypes.string,
    handleOpen: PropTypes.func,
    visibleButtons: PropTypes.arrayOf(PropTypes.string),
    createBuilding: PropTypes.func,
};


export default BuildingBanner;
