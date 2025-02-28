import {useState, useRef, useEffect} from 'react';
import InputMask from 'react-input-mask';
import { NumericFormat } from 'react-number-format';
import '../../style/createPage.css'
import AssetStatusModal from "../../components/popUp/assetStatusModal/AssetStatusModal.jsx";
import {useQuery} from "@tanstack/react-query";
import {getAllAssetStatus} from "../../api/asset/assetStatus_API.js";
import SaveButton from "../../components/button/SaveButton.jsx";
import GenericModal from "../../components/popUp/generic/GenericModal.jsx";
import {getAllSupplier} from "../../api/supplier/Supplier_API.js";
import {getAllSubCategory} from "../../api/assetSubCategory/subCategory_API.js";
import {getAllUsers} from "../../api/user/user_API.js";
import {getAllBrands} from "../../api/brand/brand_API.js";
import {getAllAssetModels} from "../../api/assetModel/assetModel_API.js";
import {getAllCurrencies} from "../../api/currency/currency_API.js";
import {getAllLocationNumber} from "../../api/locationNumber_API/locationNumber_API.js";
import {saveAsset} from "../../api/asset/asset_API.js";
import {toast} from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import AssetBanner from "../asset/AssetBanner.jsx";
import SpaceBanner from "./SpaceBanner.jsx";
import useLocationNumberData from "../../hooks/apiData/locationNumber/locationNumber.jsx";

const initialData = {
    purchaseDate: '',
    value: '',
    supplier: '',
    brand: '',
    subcategory: '',
    responsible: '',
    status: '',
    currency: '',
    assetModel: '',
    assetSeries: '',
    plateNumber: '',
    locationNumber: '',
};

const CreateSpace = () => {

    const [formData, setFormData] = useState(initialData);
    const [formErrors, setFormErrors] = useState({});


    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const handleShowConfirmationModal = () => setShowConfirmationModal(true);
    const handleHideConfirmationModal = () => setShowConfirmationModal(false);

    const [openStatesAssetModal, setOpenStatesAssetModal] = useState(false);
    const navigate = useNavigate()
    const clearForm = () => {
        setFormData(initialData);
    }

    const handleOpenStatesAssetModal = () => setOpenStatesAssetModal(true);
    const handleCloseStatesAssetModal = () => setOpenStatesAssetModal(false);

    const formRef = useRef(null);

    const [locationNumberData, setlocationNumberData] = useState([]);

    const {locationNumber } = useLocationNumberData()


    useEffect(() => {
       if (locationNumber?.data && Array.isArray(locationNumber.data)) setlocationNumberData(locationNumber.data);
       console.log(locationNumber.data)
    }, [locationNumber])

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prevState => ({ ...prevState, [name]: value }));

        setFormErrors(prevErrors => {
            const newErrors = { ...prevErrors };
            if (newErrors[name]) {
                delete newErrors[name];
            }
            return newErrors;
        });
    };

    const checkErrors = () => {
        const errors = {};
        setFormErrors(errors);

        if (!formData.nameSpace) errors.nameSpace = "El nombre del espacio es obligatorio.";


        setFormErrors(errors);

        // Solo enviar si no hay errores
        if (Object.keys(errors).length === 0) {
            handleShowConfirmationModal();
        }
    }

    const handleSubmit = async () => {
        const requestData = {
            name: formData.nameSpace,
            spaceCode: formData.spaceCode,
        };
        try {
            const response = await saveAsset(requestData);
            toast.success(response.message, { duration: 7000 });
            navigate('/app/assetTable')
            clearForm();
        } catch (error) {
            console.log({ error });
            toast.error(error.message, { duration: 7000 });
        }
    };



    return (
        <>
            <SpaceBanner
                title="Creación de Espacio"
                visibleButtons={["goBack"]}
                handleOpen={handleOpenStatesAssetModal}
            />

            <GenericModal
                show={showConfirmationModal}
                onHide={handleHideConfirmationModal}
                title="¿Desea guardar el activo?"
                bodyText="Si guarda el activo se podrá solicitar posteriormente por otro usuario."
                onButtonClick={handleSubmit}
            />
        </>
    );
};

export default CreateSpace;