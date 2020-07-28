import {useCallback, useEffect, useMemo, useState} from "react";

interface AsyncData<T> {
    result?: T;
    loading: boolean;
    error?: Error;
}

type useAsyncReturnType<T> =  AsyncData<T> & {refetch: () => void};

export function useAsync<T>(call: () => Promise<T>): useAsyncReturnType<T> {
    const [data, setData] = useState<AsyncData<T>>({
        loading: true
    });

    const fetch = useCallback(async () => {
        setData(prev => ({
            loading: true,
            result: prev.result
        }));
        try {
            const res = await call();
            setData({
                result: res,
                loading: false
            });
        } catch (e) {
            setData({
                error: e,
                loading: false
            });
        }
    }, [call]);

    useEffect(() => {
        fetch().then();
    }, [fetch]);

    return useMemo((): useAsyncReturnType<T> => ({
        ...data,
        refetch: fetch
    }), [data, fetch]);
}