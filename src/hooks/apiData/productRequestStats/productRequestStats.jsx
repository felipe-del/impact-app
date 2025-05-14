/**
 * productRequestStats component
 * 
 * This file contains a custom hook that fetches product request statistics data using React Query.
 * It provides a convenient way to access the product request statistics, loading state, error state, and a refetch function.
 * It uses the getAllProductRequestStats function from the productRequestStats_APIs module to make the API call.
 */
import {useQuery} from "@tanstack/react-query";
import {getAllProductRequestStats} from "../../../api/productRequestStats/productRequestStats_APIs.jsx";

/**
 * Custom hook to fetch product request statistics from the API.
 * 
 * @component
 * @returns {object} - An object containing product request statistics, loading state, error state, and refetch function.
 */
const useProductRequestStatsData = () => {
    const { data: wrapperResponse, isLoading, isError, refetch} = useQuery({
        queryKey: ['productRequestStats'],
        queryFn: getAllProductRequestStats,
    });

    return {
        productRequestStats: wrapperResponse || [],
        isLoading,
        isError,
        refetch
    };
};


export default useProductRequestStatsData;