/**
 * AssetData component  
 * 
 * This component is a custom hook that fetches asset data from the API using React Query.
 * It provides a convenient way to access the asset data, loading state, error state, and a refetch function.
 * It uses the getAllAssets function from the asset_API module to make the API call.
 */
import {useQuery} from "@tanstack/react-query";
import {getAllAssets} from "../../../api/asset/asset_API.js";

/**
 * Custom hook to fetch asset data from the API.
 * 
 * @component
 * @returns {object} - An object containing asset data, loading state, error state, and refetch function.
 */
const useAssetData = () => {
    const { data: wrapperResponse, isLoading, isError, refetch} = useQuery({
        queryKey: ['assets'],
        queryFn: getAllAssets,
    });

    return {
        assets: wrapperResponse || [],
        isLoading,
        isError,
        refetch
    };
};


export default useAssetData;