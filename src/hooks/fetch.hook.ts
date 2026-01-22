import type { Nullable, Result } from "@/types"
import { useEffect, useState } from "react"

export function useFetch<T, U>(
    apiCallFunction: (fetchParameter: T, signal: AbortSignal) => Promise<Result<U>>
): [Result<U>, (data: Nullable<U>) => void, boolean, Nullable<T>, (data: T) => void] {
    const [fetchParameter, setFetchParameter] = useState<Nullable<T>>(null)

    const [data, setData] = useState<Nullable<Result<U>>>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        if (!fetchParameter) return

        const abortController = new AbortController()
        const signal = abortController.signal

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

        setData({ success: false, error: new Error() })
    }

    if (!data) {
        return [{ success: false, error: new Error(`No data received`) }, setDataWithValidation, isLoading, fetchParameter, setFetchParameter]
    }

    return [data, setDataWithValidation, isLoading, fetchParameter, setFetchParameter]
}