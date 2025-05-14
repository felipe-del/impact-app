/**
 * AssetSubCategoryData component
 * 
 * This file contains a custom hook that fetches asset subcategory data using React Query.
 * It provides a convenient way to access the asset subcategories, loading state, error state, and a refetch function.
 * It uses the getAllSubCategory function from the assetSubCategory_API module to make the API call.
 */
import {useQuery} from "@tanstack/react-query";
import {getAllSubCategory} from "../../../api/assetSubCategory/subCategory_API.js";

/**
 * Custom hook to fetch asset subcategories from the API.
 * 
 * @component
 * @returns {object} - An object containing asset subcategories, loading state, error state, and refetch function.
 */
const useAssetSubCategory = () => {
    const { data: wrapperResponse, isLoading, isError, refetch} = useQuery({
        queryKey: ['assetSubCategory'],
        queryFn: getAllSubCategory,
    });

    return {
        assetSubCategory: wrapperResponse || [],
        isLoading,
        isError,
        refetch
    };
};


export default useAssetSubCategory;