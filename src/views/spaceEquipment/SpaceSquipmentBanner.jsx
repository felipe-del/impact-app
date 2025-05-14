/**
 * SpaceEquipmentBanner Component
 * 
 * This component is used to display a banner for the Space Equipment management page.
 * It includes a title and action buttons for navigation and creating new space equipment.
 * It uses Material-UI for styling and icons.
 * It also includes a modal for displaying general information.
 */
import { ArrowBack, AddBusiness } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import BannerActionButton from "../../components/button/BannerActionButton.jsx";
import {bannerStyle} from "../../style/codeStyle.js";

/**
 * SpaceEquipmentBanner component that displays a banner for the Space Equipment management page.
 * 
 * @component
 * @param {string} title - The title of the banner.
 * @param {Array} visibleButtons - The buttons to display on the banner.
 * @param {function} createSpaceEquipment - The function to call when the create space equipment button is clicked.
 * @return {JSX.Element} - The SpaceEquipmentBanner component.
 */
const SpaceEquipmentBanner = ({ title = "", visibleButtons = [""], createSpaceEquipment}) => {
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
                {visibleButtons.includes("createSpaceEquipment") && (
                    <BannerActionButton
                        onClick={createSpaceEquipment}
                        text={"Agregar Equipamiento de Espacio"} icon={<AddBusiness  />}
                        color="error"
                        style={styles.button}
                        widthWhenIsHover={"270px"}
                    />
                )}

            </div>
        </div>
    );
};

SpaceEquipmentBanner.propTypes = {
    title: PropTypes.string,
    visibleButtons: PropTypes.arrayOf(PropTypes.string),
    createSpaceEquipment: PropTypes.func,
};


export default SpaceEquipmentBanner;
