import { ArrowBack, AddBusiness } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import BannerActionButton from "../../components/button/BannerActionButton.jsx";
import {bannerStyle} from "../../style/codeStyle.js";

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
