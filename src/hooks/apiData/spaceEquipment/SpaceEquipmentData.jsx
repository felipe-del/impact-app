/**
 * spaceEquipmentData.jsx
 * 
 * This file contains a custom hook that fetches space equipment data using React Query.
 * It provides a convenient way to access the space equipment, loading state, error state, and a refetch function.
 * It uses the getAllSpaceEquipment function from the SpaceEquipment_API module to make the API call.
 */
import {useQuery} from "@tanstack/react-query";
import {getAllSpaceEquipment} from "../../../api/space_equipment/SpaceEquipment_API.js";

/**
 * Custom hook to fetch space equipment from the API.
 * 
 * @component
 * @returns {object} - An object containing space equipment, loading state, error state, and refetch function.
 */
const useSpaceEquipmentData = () => {
    const { data: wrapperResponse, isLoading, isError, refetch} = useQuery({
        queryKey: ['spaceEquipment'],
        queryFn: getAllSpaceEquipment,
    });

    return {
        spaceEquipment: wrapperResponse || [],
        isLoading,
        isError,
        refetch
    };
};


export default useSpaceEquipmentData;