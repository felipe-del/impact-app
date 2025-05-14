/**
 * BrandData component
 * 
 * This component is a custom hook that fetches brand data from the API using React Query.
 * It provides a convenient way to access the brand data, loading state, error state, and a refetch function.
 * It uses the getAllBrands function from the brand_API module to make the API call.
 */
import {useQuery} from "@tanstack/react-query";
import {getAllBrands} from "../../../api/brand/brand_API.js";

/**
 * Custom hook to fetch brand data from the API.
 * 
 * @component
 * @returns {object} - An object containing brand data, loading state, error state, and refetch function.
 */
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