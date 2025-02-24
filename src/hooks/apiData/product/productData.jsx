import {useQuery} from "@tanstack/react-query";
import {getAllProduct} from "../../../api/product/product_API.js";

const useProductData = () => {
    const { data: wrapperResponse, isLoading, isError, refetch} = useQuery({
        queryKey: ['products'],
        queryFn: getAllProduct,
    });

    return {
        products: wrapperResponse || [],
        isLoading,
        isError,
        refetch
    };
};


export default useProductData;