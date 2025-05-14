/**
 * inventoryValueData component
 * 
 * This file contains a custom hook that fetches inventory value data using React Query.
 * It provides a convenient way to access the inventory value, loading state, error state, and a refetch function.
 * It uses the assetInventoryValue function from the asset_API module to make the API call.
 */
import {useQuery} from "@tanstack/react-query";
import {assetInventoryValue} from "../../../api/asset/asset_API.js";

/**
 * Custom hook to fetch inventory value from the API.
 * 
 * @component
 * @param {object} params - The parameters for the query.
 * @param {string} params.startDate - The start date for the inventory value query.
 * @param {string} params.endDate - The end date for the inventory value query.
 * @returns {object} - An object containing inventory value, loading state, error state, and refetch function.
 */
const useInventoryValueData = ({startDate, endDate}) => {
    const {data: wrapperResponse, isLoading, isError, refetch} = useQuery({
        queryKey: ['inventoryValue', { startDate, endDate }],
        queryFn: ({ queryKey }) => {
            const [_key, {startDate, endDate}] = queryKey;
            return assetInventoryValue(startDate, endDate);
        },
        enabled: startDate !== '' && endDate !== '',
    });

    return {
        inventoryValue: wrapperResponse || [] ,
        isLoading,
        isError,
        refetch
    }
}

export default useInventoryValueData;