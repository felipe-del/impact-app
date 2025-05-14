/**
 * productData component
 * 
 * This file contains a custom hook that fetches product data using React Query.
 * It provides a convenient way to access the products, loading state, error state, and a refetch function.
 * It uses the getAllProduct function from the product_API module to make the API call.
 */
import {useQuery} from "@tanstack/react-query";
import {getAllProduct} from "../../../api/product/product_API.js";

/**
 * Custom hook to fetch products from the API.
 * 
 * @component
 * @returns {object} - An object containing products, loading state, error state, and refetch function.
 */
const useProductData = () => {
    const { data: wrapperResponse, isLoading, isError, refetch} = useQuery({
        queryKey: ['products'],
        queryFn: getAllProduct,
    });

    return {
        products: wrapperResponse || [],
        isLoading,
        isError,
        refetch
    };
};


export default useProductData;