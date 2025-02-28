
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import BannerActionButton from "../../components/button/BannerActionButton.jsx";
import {bannerStyle} from "../../style/codeStyle.js";
import PlusOneIcon from '@mui/icons-material/PlusOne';

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
