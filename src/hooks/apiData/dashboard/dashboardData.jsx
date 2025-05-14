/**
 * dashboardData.jsx
 * 
 * This file contains a custom hook that fetches asset data based on the purchase date range.
 * It uses React Query to manage the API call and provides a convenient way to access the asset data, loading state, error state, and a refetch function.
 * It uses the getAssetByPurchaseDate function from the asset_API module to make the API call.
 */
import { useQuery } from "@tanstack/react-query";
import { getAssetByPurchaseDate } from "../../../api/asset/asset_API.js";

/**
 * Custom hook to fetch asset data based on purchase date range from the API.
 * 
 * @component
 * @param {string} startDate - The start date for the purchase date range.
 * @param {string} endDate - The end date for the purchase date range.
 * @returns {object} - An object containing asset data, loading state, error state, and refetch function.
 */
const useAssetByPurchaseDate = (startDate, endDate) => {

    const { data: assets, isLoading, isError, refetch } = useQuery({
        queryKey: ['assetsByPurchaseDate', startDate, endDate],
        queryFn: async () => {
            const result = await getAssetByPurchaseDate(startDate, endDate);
            return result;
        },
        enabled: !!startDate && !!endDate,
    });

    return {
        assets: assets || [],
        isLoading,
        isError,
        refetch
    };
};

export default useAssetByPurchaseDate;
