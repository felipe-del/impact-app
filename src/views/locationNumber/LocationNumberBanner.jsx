
import { ArrowBack, AddBusiness } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import BannerActionButton from "../../components/button/BannerActionButton.jsx";
import {bannerStyle} from "../../style/codeStyle.js";

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
