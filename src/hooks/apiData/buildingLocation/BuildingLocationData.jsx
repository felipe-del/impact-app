import {useQuery} from "@tanstack/react-query";
import {getAllBuildingLocation} from "../../../api/buildingLocation/buildingLocation_API.js";


const useBuildingLocationData = () => {
    const { data: wrapperResponse, isLoading, isError, refetch} = useQuery({
        queryKey: ['buildingLocation'],
        queryFn: getAllBuildingLocation,
    });

    return {
        buildingLocation: wrapperResponse || [],
        isLoading,
        isError,
        refetch
    };
};


export default useBuildingLocationData;