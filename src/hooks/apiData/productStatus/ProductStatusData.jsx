/**
 * productStatusData component
 * 
 * This file contains a custom hook that fetches product status data using React Query.
 * It provides a convenient way to access the product statuses, loading state, error state, and a refetch function.
 * It uses the getAllProductStatus function from the productStatus_API module to make the API call.
 */
import {useQuery} from "@tanstack/react-query";
import {getAllProductStatus} from "../../../api/productStatus/productStatus_API.js";

/**
 * Custom hook to fetch product statuses from the API.
 * 
 * @component
 * @returns {object} - An object containing product statuses, loading state, error state, and refetch function.
 */
const useProductStatusData = () => {
    const { data: wrapperResponse, isLoading, isError, refetch} = useQuery({
        queryKey: ['productStatus'],
        queryFn: getAllProductStatus,
    });

    return {
        productStatus: wrapperResponse || [],
        isLoading,
        isError,
        refetch
    };
};


export default useProductStatusData;