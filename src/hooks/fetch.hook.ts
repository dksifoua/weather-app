import type { Nullable, Result } from "@/types"
import { useEffect, useState } from "react"

export function useFetch<T, U>({ apiCallFunction, fetchParameter }: {
    apiCallFunction: (fetchParameter: T, signal: AbortSignal) => Promise<Result<U>>,
    fetchParameter: T
}): [Result<U>, boolean, (data: Nullable<U>) => void] {
    const [data, setData] = useState<Nullable<Result<U>>>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const abortController = new AbortController()
        const signal= abortController.signal

        const timer = setTimeout(() => {
            setIsLoading(true)
            apiCallFunction(fetchParameter, signal)
                .then((data) => setData(data))
                .finally(() => setIsLoading(false))
        }, 500)

        return () => {
            abortController.abort()
            clearTimeout(timer)
        }
    }, [apiCallFunction, fetchParameter])

    function setDataWithValidation(data: Nullable<U>): void {
        if (data) {
            setData({ success: true, data })
        }

        setData({ success: false, error: new Error()})
    }

    if (!data) {
        return [{ success: false, error: new Error(`No data received`) }, isLoading, setDataWithValidation]
    }

    return [data, isLoading, setDataWithValidation]
}