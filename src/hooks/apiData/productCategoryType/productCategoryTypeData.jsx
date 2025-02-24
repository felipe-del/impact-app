import {useQuery} from "@tanstack/react-query";
import {getAllProductCategoryType} from "../../../api/productCategoryType/productCategoryType_API.js";

const useProductCategoryTypeData = () => {
    const { data: wrapperResponse, isLoading, isError, refetch} = useQuery({
        queryKey: ['productCategoryTypes'],
        queryFn: getAllProductCategoryType,
    });

    return {
        productCategoryTypes: wrapperResponse || [],
        isLoading,
        isError,
        refetch
    };
};


export default useProductCategoryTypeData;