import {useQuery} from "@tanstack/react-query";
import {getAllAssets} from "../../../api/asset/asset_API.js";


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