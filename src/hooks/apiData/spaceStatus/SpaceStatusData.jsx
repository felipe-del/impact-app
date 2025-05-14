/**
 * spaceStatusData component
 * 
 * This file contains a custom hook that fetches space status data using React Query.
 * It provides a convenient way to access the space statuses, loading state, error state, and a refetch function.
 * It uses the getAllSpaceStatus function from the spaceStatus_API module to make the API call.
 */
import {useQuery} from "@tanstack/react-query";
import {getAllSpaceStatus} from "../../../api/spaceStatus/spaceStatus_API.js";

/**
 * Custom hook to fetch space statuses from the API.
 * 
 * @component
 * @returns {object} - An object containing space statuses, loading state, error state, and refetch function.
 */
const useSpaceStatusData = () => {
    const { data: wrapperResponse, isLoading, isError, refetch} = useQuery({
        queryKey: ['spaceStatus'],
        queryFn: getAllSpaceStatus,
    });

    return {
        spaceStatus: wrapperResponse || [],
        isLoading,
        isError,
        refetch
    };
};


export default useSpaceStatusData;