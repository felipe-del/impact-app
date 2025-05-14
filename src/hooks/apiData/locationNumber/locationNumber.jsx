/**
 * locationNumber component
 * 
 * This file contains a custom hook that fetches location number data using React Query.
 * It provides a convenient way to access the location numbers, loading state, error state, and a refetch function.
 * It uses the getAllLocationNumber function from the locationNumber_API module to make the API call.
 */
import {useQuery} from "@tanstack/react-query";
import {getAllLocationNumber} from "../../../api/locationNumber_API/locationNumber_API.js";

/**
 * Custom hook to fetch location numbers from the API.
 * 
 * @component
 * @returns {object} - An object containing location numbers, loading state, error state, and refetch function.
 */
const useLocationNumberData = () => {
    const { data: wrapperResponse, isLoading, isError, refetch} = useQuery({
        queryKey: ['locationNumber'],
        queryFn: getAllLocationNumber,
    });

    return {
        locationNumber: wrapperResponse || [],
        isLoading,
        isError,
        refetch
    };
};


export default useLocationNumberData;