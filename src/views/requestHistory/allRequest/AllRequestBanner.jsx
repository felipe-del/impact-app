import PropTypes from "prop-types";
import { bannerStyle } from "../../../style/codeStyle.js";
import BannerActionButton from "../../../components/button/BannerActionButton.jsx";
import {ArrowBack} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

const AllRequestBanner = ({
                              title = "",
                              visibleButtons = ["goBack"],
                          }) => {

    const styles = bannerStyle;
    const navigate = useNavigate();
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
            </div>

        </div>
    );
};

AllRequestBanner.propTypes = {
    title: PropTypes.string,
    visibleButtons: PropTypes.arrayOf(PropTypes.string),
};

export default AllRequestBanner;