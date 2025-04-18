import PropTypes from "prop-types";

import { ArrowBack, InfoOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import BannerActionButton from "../../components/button/BannerActionButton.jsx";
import GenericInformationModal from "../../components/popUp/GenericInformationModal/GenericInformationModal.jsx";
import {bannerStyle} from "../../style/codeStyle.js";


const AssetRenewalBanner = ({
                                     title = "",
                                     visibleButtons = ["goBack", "info"],
                                 }) => {
    const styles = bannerStyle;
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

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

                {visibleButtons.includes("info") && (
                    <BannerActionButton
                        onClick={handleOpenModal}
                        text={"Información"}
                        icon={<InfoOutlined />}
                        color={"primary"}
                        style={styles.button}
                    />
                )}
            </div>

            {/* Modal de información */}
            <GenericInformationModal
                open={isModalOpen}
                onClose={handleCloseModal}
                title="Información general"
                description="Este apartado muestra las solicitudes de renovación de activos, que son aquellos recursos previamente asignados y que los usuarios desean mantener o extender su uso. Los gestores o administradores tienen la capacidad de revisar estas solicitudes y decidir si aprueban o deniegan la renovación según las políticas y necesidades del sistema."
            />
        </div>
    );
};

AssetRenewalBanner.propTypes = {
    title: PropTypes.string,
    visibleButtons: PropTypes.arrayOf(PropTypes.string),
};

export default AssetRenewalBanner;
