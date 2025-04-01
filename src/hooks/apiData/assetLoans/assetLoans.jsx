import {useQuery} from "@tanstack/react-query";
import { getAllAssetsLoansStats } from "../../../api/assetLoan/assetLoan_APIs";

const useAssetLoanData = () => {
    const { data: wrapperResponse, isLoading, isError, refetch} = useQuery({
        queryKey: ['assetLoans'],
        queryFn: getAllAssetsLoansStats,
    });

    return {
        assetLoans: wrapperResponse || [],
        isLoading,
        isError,
        refetch
    };
}

export default useAssetLoanData;