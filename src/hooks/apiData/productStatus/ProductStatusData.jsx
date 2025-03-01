import {useQuery} from "@tanstack/react-query";
import {getAllProductStatus} from "../../../api/productStatus/productStatus_API.js";


const useProductStatusData = () => {
    const { data: wrapperResponse, isLoading, isError, refetch} = useQuery({
        queryKey: ['productStatus'],
        queryFn: getAllProductStatus,
    });

    return {
        productStatus: wrapperResponse || [],
        isLoading,
        isError,
        refetch
    };
};


export default useProductStatusData;