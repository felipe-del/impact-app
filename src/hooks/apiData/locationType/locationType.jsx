/**
 * locationType component
 * 
 * This file contains a custom hook that fetches location type data using React Query.
 * It provides a convenient way to access the location types, loading state, error state, and a refetch function.
 * It uses the getAllLocationType function from the locationType_API module to make the API call.
 */
import {useQuery} from "@tanstack/react-query";
import {getAllLocationType} from "../../../api/locationType/locationType_API.js";

/**
 * Custom hook to fetch location types from the API.
 * 
 * @component
 * @returns {object} - An object containing location types, loading state, error state, and refetch function.
 */
const useLocationTypeData = () => {
    const { data: wrapperResponse, isLoading, isError, refetch} = useQuery({
        queryKey: ['locationType'],
        queryFn: getAllLocationType,
    });

    return {
        locationType: wrapperResponse || [],
        isLoading,
        isError,
        refetch
    };
};


export default useLocationTypeData;