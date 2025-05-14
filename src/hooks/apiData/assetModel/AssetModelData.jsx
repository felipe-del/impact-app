/**
 * AssetModelData component
 * 
 * This file contains a custom hook that fetches asset model data using React Query.
 * It provides a convenient way to access the asset models, loading state, error state, and a refetch function.
 * It uses the getAllAssetModels function from the assetModel_API module to make the API call.
 */
import {useQuery} from "@tanstack/react-query";
import {getAllAssetModels} from "../../../api/assetModel/assetModel_API.js";

/**
 * Custom hook to fetch asset models from the API.
 * 
 * @component
 * @returns {object} - An object containing asset models, loading state, error state, and refetch function.
 */
const useAssetModel = () => {
    const { data: wrapperResponse, isLoading, isError, refetch} = useQuery({
        queryKey: ['assetModels'],
        queryFn: getAllAssetModels,
    });

    return {
        assetModels: wrapperResponse || [],
        isLoading,
        isError,
        refetch
    };
};


export default useAssetModel;