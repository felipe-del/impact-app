import {useQuery} from "@tanstack/react-query";
import {assetInventoryValue} from "../../../api/asset/asset_API.js";

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