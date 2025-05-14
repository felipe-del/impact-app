/**
 * BuildingData component
 * 
 * This file contains a custom hook that fetches building data using React Query.
 * It provides a convenient way to access the buildings, loading state, error state, and a refetch function.
 * It uses the getAllBuilding function from the building_API module to make the API call.
 */
import {useQuery} from "@tanstack/react-query";
import {getAllBuilding} from "../../../api/building/building_API.js";

/**
 * Custom hook to fetch building data from the API.
 * 
 * @component
 * @returns {object} - An object containing buildings, loading state, error state, and refetch function.
 */
const useBuildingData = () => {
    const { data: wrapperResponse, isLoading, isError, refetch} = useQuery({
        queryKey: ['building'],
        queryFn: getAllBuilding,
    });

    return {
        building: wrapperResponse || [],
        isLoading,
        isError,
        refetch
    };
};


export default useBuildingData;