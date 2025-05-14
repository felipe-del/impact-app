/**
 * supplierData component
 * 
 * This file contains a custom hook that fetches supplier data using React Query.
 * It provides a convenient way to access the suppliers, loading state, error state, and a refetch function.
 * It uses the getAllSupplier function from the supplier_API module to make the API call.
 */
import {useQuery} from "@tanstack/react-query";
import {getAllSupplier} from "../../../api/supplier/Supplier_API.js";

/**
 * Custom hook to fetch suppliers from the API.
 * 
 * @component
 * @returns {object} - An object containing suppliers, loading state, error state, and refetch function.
 */
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