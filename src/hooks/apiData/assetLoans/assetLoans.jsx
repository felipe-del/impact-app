/**
 * assetLoans component
 * 
 * This component is a custom hook that fetches asset loans data from the API using React Query.
 * It provides a convenient way to access the asset loans data, loading state, error state, and a refetch function.
 * It uses the getAllAssetsLoansStats function from the assetLoan_APIs module to make the API call.
 */
import {useQuery} from "@tanstack/react-query";
import { getAllAssetsLoansStats } from "../../../api/assetLoan/assetLoan_APIs";

/**
 * Custom hook to fetch asset loans data from the API.
 * 
 * @component
 * @returns {object} - An object containing asset loans data, loading state, error state, and refetch function.
 */
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