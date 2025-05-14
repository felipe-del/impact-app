/**
 * EntityTypeData component
 * 
 * This file contains a custom hook that fetches entity type data using React Query.
 * It provides a convenient way to access the entity types, loading state, error state, and a refetch function.
 * It uses the getAllEntityType function from the entityType_API module to make the API call.
 */
import {useQuery} from "@tanstack/react-query";
import {getAllEntityType} from "../../../api/entityType/entityType_API.js";

/**
 * Custom hook to fetch entity types from the API.
 * 
 * @component
 * @returns {object} - An object containing entity types, loading state, error state, and refetch function.
 */
const useEntityTypeData = () => {
    const { data: wrapperResponse, isLoading, isError} = useQuery({
        queryKey: ['entityTypes'],
        queryFn: getAllEntityType,
    });

    return {
        entityTypes: wrapperResponse || [],
        isLoading,
        isError,
    };
};


export default useEntityTypeData;