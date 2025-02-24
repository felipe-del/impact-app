import {useQuery} from "@tanstack/react-query";
import {getAllSpace} from "../../../api/space/space_API.js";


const useSpaceData = () => {
    const { data: wrapperResponse, isLoading, isError, refetch} = useQuery({
        queryKey: ['space'],
        queryFn: getAllSpace,
    });

    return {
        space: wrapperResponse || [],
        isLoading,
        isError,
        refetch
    };
};


export default useSpaceData;