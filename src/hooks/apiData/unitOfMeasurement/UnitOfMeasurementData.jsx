/**
 * unitOfMeasurementData component
 * 
 * This file contains a custom hook that fetches unit of measurement data using React Query.
 * It provides a convenient way to access the unit of measurements, loading state, error state, and a refetch function.
 * It uses the getAllUnitOfMeasurement function from the unitOfMeasurement_API module to make the API call.
 */
import {useQuery} from "@tanstack/react-query";
import {getAllUnitOfMeasurement} from "../../../api/unitOfMeasurement/unitOfMeasurement_API.js";

/**
 * Custom hook to fetch unit of measurements from the API.
 * 
 * @component
 * @returns {object} - An object containing unit of measurements, loading state, error state, and refetch function.
 */
const useUnitOfMeasurementData = () => {
    const { data: wrapperResponse, isLoading, isError, refetch} = useQuery({
        queryKey: ['unitOfMeasurements'],
        queryFn: getAllUnitOfMeasurement,
    });

    return {
        unitOfMeasurements: wrapperResponse || [],
        isLoading,
        isError,
        refetch
    };
};


export default useUnitOfMeasurementData;