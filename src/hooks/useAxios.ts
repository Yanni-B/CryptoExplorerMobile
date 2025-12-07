import { useEffect, useState, useRef } from 'react';
import axios, { AxiosError } from 'axios';

const api = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3',
    timeout: 10000,
});

// Autofecth est un parametre optionnel, 
// true (par defaut): les donnees sont chargées automatiquement 
// false: les donnees ne sont pas chargées automatiquement (Ex: quand l utilistaeur appuie un button > les donnees charge)
export function useAxios<T>(endpoint: string, autoFetch = true, minInterval = 2000) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(autoFetch);
    const [error, setError] = useState<string | null>(null);

    const lastFetchRef = useRef<number>(0);

    const fetchData = async () => {
        const now = Date.now();
        if (now - lastFetchRef.current < minInterval) {
            console.log(`⏳ [useAxios] Requête ignorée pour éviter spam (attendre ${minInterval}ms)`);
            return;
        }
        lastFetchRef.current = now;

        console.log(`🔄 [useAxios] Fetching: ${endpoint}`);
        try {
            setLoading(true);
            const response = await api.get(endpoint);
            setData(response.data);
        } catch (err: any) {
            setError(err?.message || 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (autoFetch) fetchData();
    }, [endpoint]);

    return { data, loading, error, refetch: fetchData };
}
