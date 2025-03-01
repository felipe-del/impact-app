import {useQuery} from "@tanstack/react-query";
import {getAllSpaceStatus} from "../../../api/spaceStatus/spaceStatus_API.js";


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