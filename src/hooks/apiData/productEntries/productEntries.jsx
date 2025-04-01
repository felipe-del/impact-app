import {useQuery} from "@tanstack/react-query";
import {getAllProductEntries} from "../../../api/productEntries/productEntry_APIs.jsx";

const useProductEntryData = () => {
    const { data: wrapperResponse, isLoading, isError, refetch} = useQuery({
        queryKey: ['productEntries'],
        queryFn: getAllProductEntries,
    });

    return {
        productEntries: wrapperResponse || [],
        isLoading,
        isError,
        refetch
    };
};


export default useProductEntryData;