import {useQuery} from "@tanstack/react-query";
import {getAllSupplier} from "../../../api/supplier/Supplier.js";

const useSupplierData = () => {
    const { data: wrapperResponse, isLoading, isError, refetch} = useQuery({
        queryKey: ['suppliers'],
        queryFn: getAllSupplier,
    });

    return {
        suppliers: wrapperResponse || [],
        isLoading,
        isError,
        refetch
    };
};


export default useSupplierData;