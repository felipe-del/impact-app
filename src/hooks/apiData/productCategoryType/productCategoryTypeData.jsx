/**
 * productCategoryTypeData component
 * 
 * This file contains a custom hook that fetches product category type data using React Query.
 * It provides a convenient way to access the product category types, loading state, error state, and a refetch function.
 * It uses the getAllProductCategoryType function from the productCategoryType_API module to make the API call.
 */
import {useQuery} from "@tanstack/react-query";
import {getAllProductCategoryType} from "../../../api/productCategoryType/productCategoryType_API.js";

/**
 * Custom hook to fetch product category types from the API.
 * 
 * @component
 * @returns {object} - An object containing product category types, loading state, error state, and refetch function.
 */
const useProductCategoryTypeData = () => {
    const { data: wrapperResponse, isLoading, isError, refetch} = useQuery({
        queryKey: ['productCategoryTypes'],
        queryFn: getAllProductCategoryType,
    });

    return {
        productCategoryTypes: wrapperResponse || [],
        isLoading,
        isError,
        refetch
    };
};


export default useProductCategoryTypeData;