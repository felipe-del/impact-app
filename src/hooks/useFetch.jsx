import { useState } from 'react';

const useFetch = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async (url, options) => {
        setIsLoading(true);
        try {
            const defaultOptions = {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                ...options,
            };

            const response = await fetch(url, defaultOptions);

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            setError('Algo ha salido mal');
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, error, fetchData };
};

export default useFetch;
