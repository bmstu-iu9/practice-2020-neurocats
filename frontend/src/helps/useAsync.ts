import {useEffect, useState} from "react";

interface AsyncData<T> {
    result?: T;
    loading: boolean;
    error?: Error;
}

export function useAsync<T>(call: () => Promise<T>) {
    const [data, setData] = useState<AsyncData<T>>({
        loading: true
    });

    useEffect(() => {
        setData({
            loading: true
        });
        call().then(res => {
            setData({
                result: res,
                loading: false
            });
        }).catch(reason => setData({
            error: reason,
            loading: false
        }));
    }, [call]);

    return data;
}