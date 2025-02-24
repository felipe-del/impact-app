import {useQuery} from "@tanstack/react-query";
import {getAllAssetModels} from "../../../api/assetModel/assetModel_API.js";


const useAssetModel = () => {
    const { data: wrapperResponse, isLoading, isError, refetch} = useQuery({
        queryKey: ['assetModels'],
        queryFn: getAllAssetModels,
    });

    return {
        assetModels: wrapperResponse || [],
        isLoading,
        isError,
        refetch
    };
};


export default useAssetModel;