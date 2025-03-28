import { useQuery } from "@tanstack/react-query";
import { getAssetByPurchaseDate } from "../../../api/asset/asset_API.js";

const useAssetByPurchaseDate = (startDate, endDate) => {
   

    const { data: assets, isLoading, isError, refetch } = useQuery({
        queryKey: ['assetsByPurchaseDate', startDate, endDate],
        queryFn: async () => {
            const result = await getAssetByPurchaseDate(startDate, endDate);
            return result;
        },
        enabled: !!startDate && !!endDate, // Solo ejecuta la consulta si hay fechas
    });

    return {
        assets: assets || [],
        isLoading,
        isError,
        refetch
    };
};

export default useAssetByPurchaseDate;
