export type Result<T> =
    | { success: false, error: Error }
    | { success: true, data: T }