import { useState } from 'react';

const useFetch = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async (url: string, options: RequestInit) => {
        setIsLoading(true);
        try {
            const defaultOptions: RequestInit = {
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
            setError('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, error, fetchData };
};

export default useFetch;
