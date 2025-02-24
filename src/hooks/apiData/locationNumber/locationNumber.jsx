import {useQuery} from "@tanstack/react-query";
import {getAllLocationNumber} from "../../../api/locationNumber_API/locationNumber_API.js";

const useLocationNumberData = () => {
    const { data: wrapperResponse, isLoading, isError, refetch} = useQuery({
        queryKey: ['locationNumber'],
        queryFn: getAllLocationNumber,
    });

    return {
        locationNumber: wrapperResponse || [],
        isLoading,
        isError,
        refetch
    };
};


export default useLocationNumberData;