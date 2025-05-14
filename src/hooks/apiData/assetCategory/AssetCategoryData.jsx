/**
 * AssetCategoryData component
 * 
 * This component is a custom hook that fetches asset categories from the API using React Query.
 * It provides a convenient way to access the asset categories, loading state, error state, and a refetch function.
 * It uses the getAllAssetCategories function from the assetCategory_API module to make the API call.
 */
import {useQuery} from "@tanstack/react-query";
import {getAllAssetCategories} from "../../../api/assetCategory/assetCategory_API.js";

/** 
 * Custom hook to fetch asset categories from the API.
 * 
 * @component
 * @returns {object} - An object containing asset categories, loading state, error state, and refetch function.
 */
const useAssetCategory = () => {
    const { data: wrapperResponse, isLoading, isError, refetch} = useQuery({
        queryKey: ['assetCategories'],
        queryFn: getAllAssetCategories,
    });

    return {
        assetCategories: wrapperResponse || [],
        isLoading,
        isError,
        refetch
    };
};


export default useAssetCategory;