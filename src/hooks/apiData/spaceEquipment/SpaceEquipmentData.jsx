import {useQuery} from "@tanstack/react-query";
import {getAllSpaceEquipment} from "../../../api/space_equipment/SpaceEquipment_API.js";


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