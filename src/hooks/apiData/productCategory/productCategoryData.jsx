/**
 * productCategoryData component
 * 
 * This file contains a custom hook that fetches product category data using React Query.
 * It provides a convenient way to access the product categories, loading state, error state, and a refetch function.
 * It uses the getAllProductCategory function from the productCategory_API module to make the API call.
 */
import {useQuery} from "@tanstack/react-query";
import {getAllProductCategory} from "../../../api/productCategory/productCategory_API.js";

/**
 * Custom hook to fetch product categories from the API.
 * 
 * @component
 * @returns {object} - An object containing product categories, loading state, error state, and refetch function.
 */
const useProductCategoryData = () => {
    const { data: wrapperResponse, isLoading, isError, refetch} = useQuery({
        queryKey: ['productCategories'],
        queryFn: getAllProductCategory,
    });

    return {
        productCategories: wrapperResponse || [],
        isLoading,
        isError,
        refetch
    };
};


export default useProductCategoryData;