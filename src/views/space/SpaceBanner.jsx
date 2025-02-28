import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import BannerActionButton from "../../components/button/BannerActionButton.jsx";
import {bannerStyle} from "../../style/codeStyle.js";
import AddLocationIcon from '@mui/icons-material/AddLocation';

const SpaceBanner = ({ title = "", visibleButtons = [""]}) => {
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
                {visibleButtons.includes("createSpace") && (
                    <BannerActionButton
                        onClick={() => navigate("/app/createSpace")}
                        text={"Agregar Espacio"} icon={<AddLocationIcon  />}
                        color="error"
                        style={styles.button}
                        widthWhenIsHover={"170px"}
                    />
                )}

            </div>
        </div>
    );
};

SpaceBanner.propTypes = {
    title: PropTypes.string,
    visibleButtons: PropTypes.arrayOf(PropTypes.string),
    createSpace: PropTypes.func,
};


export default SpaceBanner;
