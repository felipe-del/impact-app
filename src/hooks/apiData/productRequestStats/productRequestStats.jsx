import {useQuery} from "@tanstack/react-query";
import {getAllProductRequestStats} from "../../../api/productRequestStats/productRequestStats_APIs.jsx";

const useProductRequestStatsData = () => {
    const { data: wrapperResponse, isLoading, isError, refetch} = useQuery({
        queryKey: ['productRequestStats'],
        queryFn: getAllProductRequestStats,
    });

    return {
        productRequestStats: wrapperResponse || [],
        isLoading,
        isError,
        refetch
    };
};


export default useProductRequestStatsData;