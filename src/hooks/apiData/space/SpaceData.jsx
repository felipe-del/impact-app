/**
 * spaceData component
 * 
 * This file contains a custom hook that fetches space data using React Query.
 * It provides a convenient way to access the spaces, loading state, error state, and a refetch function.
 * It uses the getAllSpace function from the space_API module to make the API call.
 */
import {useQuery} from "@tanstack/react-query";
import {getAllSpace} from "../../../api/space/space_API.js";

/**
 * Custom hook to fetch spaces from the API.
 * 
 * @component
 * @returns {object} - An object containing spaces, loading state, error state, and refetch function.
 */
const useSpaceData = () => {
    const { data: wrapperResponse, isLoading, isError, refetch} = useQuery({
        queryKey: ['spaces'],
        queryFn: getAllSpace,
    });

    return {
        spaces: wrapperResponse || [],
        isLoading,
        isError,
        refetch
    };
};


export default useSpaceData;