import {useQuery} from "@tanstack/react-query";
import {getAllBuilding} from "../../../api/building/building_API.js";


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