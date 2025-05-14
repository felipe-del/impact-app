/**
 * BuildingLocationData component
 * 
 * This file contains a custom hook that fetches building location data using React Query.
 * It provides a convenient way to access the building locations, loading state, error state, and a refetch function.
 * It uses the getAllBuildingLocation function from the buildingLocation_API module to make the API call.
 */
import {useQuery} from "@tanstack/react-query";
import {getAllBuildingLocation} from "../../../api/buildingLocation/buildingLocation_API.js";

/** 
 * Custom hook to fetch building locations from the API.
 * 
 * @component
 * @returns {object} - An object containing building locations, loading state, error state, and refetch function.
 */
const useBuildingLocationData = () => {
    const { data: wrapperResponse, isLoading, isError, refetch} = useQuery({
        queryKey: ['buildingLocation'],
        queryFn: getAllBuildingLocation,
    });

    return {
        buildingLocations: wrapperResponse || [],
        isLoading,
        isError,
        refetch
    };
};


export default useBuildingLocationData;