/**
 * productEntries component
 * 
 * This file contains a custom hook that fetches product entry data using React Query.
 * It provides a convenient way to access the product entries, loading state, error state, and a refetch function.
 * It uses the getAllProductEntries function from the productEntry_APIs module to make the API call.
 */
import {useQuery} from "@tanstack/react-query";
import {getAllProductEntries} from "../../../api/productEntries/productEntry_APIs.jsx";

/**
 * Custom hook to fetch product entries from the API.
 * 
 * @component
 * @returns {object} - An object containing product entries, loading state, error state, and refetch function.
 */
const useProductEntryData = () => {
    const { data: wrapperResponse, isLoading, isError, refetch} = useQuery({
        queryKey: ['productEntries'],
        queryFn: getAllProductEntries,
    });

    return {
        productEntries: wrapperResponse || [],
        isLoading,
        isError,
        refetch
    };
};


export default useProductEntryData;