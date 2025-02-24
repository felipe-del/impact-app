import {useQuery} from "@tanstack/react-query";
import {getAllLocationType} from "../../../api/locationType/locationType_API.js";

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