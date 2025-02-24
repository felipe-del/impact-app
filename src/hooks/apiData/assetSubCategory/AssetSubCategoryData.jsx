import {useQuery} from "@tanstack/react-query";
import {getAllSubCategory} from "../../../api/assetSubCategory/subCategory_API.js";


const useAssetSubCategory = () => {
    const { data: wrapperResponse, isLoading, isError, refetch} = useQuery({
        queryKey: ['assetSubCategory'],
        queryFn: getAllSubCategory,
    });

    return {
        assetSubCategory: wrapperResponse || [],
        isLoading,
        isError,
        refetch
    };
};


export default useAssetSubCategory;