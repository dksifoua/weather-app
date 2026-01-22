import type { Nullable, Result } from "@/types"
import { useEffect, useState } from "react"

export function useFetch<T, U>(
    apiCallFunction: (fetchParameter: T, signal: AbortSignal) => Promise<Result<U>>
): [Nullable<U>, (data: Nullable<U>) => void, boolean, Nullable<T>, (data: T) => void] {
    const [fetchParameter, setFetchParameter] = useState<Nullable<T>>(null)

    const [data, setData] = useState<Nullable<U>>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        if (!fetchParameter) return

        const abortController = new AbortController()
        const signal = abortController.signal

        const timer = setTimeout(() => {
            setIsLoading(true)
            apiCallFunction(fetchParameter, signal)
                .then((result: Result<U>): void => {
                    if (!signal.aborted && result.success) setData(result.data)
                })
                .catch((error) => {
                    console.error(error)
                })
                .finally(() => {
                    if (!signal.aborted) setIsLoading(false)
                })
        }, 500)

        return () => {
            abortController.abort()
            clearTimeout(timer)
        }
    }, [apiCallFunction, fetchParameter])

    return [data, setData, isLoading, fetchParameter, setFetchParameter]
}