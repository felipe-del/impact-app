import {useQuery} from "@tanstack/react-query";
import {getAllAssetCategories} from "../../../api/assetCategory/assetCategory_API.js";


const useAssetCategory = () => {
    const { data: wrapperResponse, isLoading, isError, refetch} = useQuery({
        queryKey: ['assetCategories'],
        queryFn: getAllAssetCategories,
    });

    return {
        assetCategories: wrapperResponse || [],
        isLoading,
        isError,
        refetch
    };
};


export default useAssetCategory;