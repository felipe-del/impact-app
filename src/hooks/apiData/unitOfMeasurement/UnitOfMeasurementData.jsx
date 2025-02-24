import {useQuery} from "@tanstack/react-query";
import {getAllUnitOfMeasurement} from "../../../api/unitOfMeasurement/unitOfMeasurement_API.js";


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