
import { ArrowBack, AddBusiness } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import BannerActionButton from "../../components/button/BannerActionButton.jsx";
import {bannerStyle} from "../../style/codeStyle.js";

const AssetCategoryBanner = ({ title = "", visibleButtons = [""], createAssetCategory}) => {
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
                {visibleButtons.includes("createAssetCategory") && (
                    <BannerActionButton
                        onClick={createAssetCategory}
                        text={"Agregar Categoría de Activo"} icon={<AddBusiness  />}
                        color="error"
                        style={styles.button}
                        widthWhenIsHover={"240px"}
                    />
                )}
            </div>
        </div>
    );
};

AssetCategoryBanner.propTypes = {
    title: PropTypes.string,
    visibleButtons: PropTypes.arrayOf(PropTypes.string),
    createAssetCategory: PropTypes.func,
};


export default AssetCategoryBanner;
