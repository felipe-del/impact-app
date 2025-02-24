import {useQuery} from "@tanstack/react-query";
import {getAllProductCategory} from "../../../api/productCategory/productCategory_API.js";

const useProductCategoryData = () => {
    const { data: wrapperResponse, isLoading, isError, refetch} = useQuery({
        queryKey: ['productCategories'],
        queryFn: getAllProductCategory,
    });

    return {
        productCategories: wrapperResponse || [],
        isLoading,
        isError,
        refetch
    };
};


export default useProductCategoryData;