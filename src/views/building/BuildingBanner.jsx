
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import BannerActionButton from "../../components/button/BannerActionButton.jsx";
import {bannerStyle} from "../../style/codeStyle.js";
import DomainAddIcon from '@mui/icons-material/DomainAdd';

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
