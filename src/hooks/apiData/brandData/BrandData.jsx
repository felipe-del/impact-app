import {useQuery} from "@tanstack/react-query";
import {getAllBrands} from "../../../api/brand/brand_API.js";


const useBrandData = () => {
    const { data: wrapperResponse, isLoading, isError, refetch} = useQuery({
        queryKey: ['brands'],
        queryFn: getAllBrands,
    });

    return {
        brands: wrapperResponse || [],
        isLoading,
        isError,
        refetch
    };
};


export default useBrandData;