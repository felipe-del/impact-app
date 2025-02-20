import {useQuery} from "@tanstack/react-query";
import {getAllEntityType} from "../../../api/entityType/entityType_API.js";

const useEntityTypeData = () => {
    const { data: wrapperResponse, isLoading, isError} = useQuery({
        queryKey: ['entityTypes'],
        queryFn: getAllEntityType,
    });

    return {
        entityTypes: wrapperResponse || [],
        isLoading,
        isError,
    };
};


export default useEntityTypeData;