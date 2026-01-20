import {
    GeoLocationsApiResponseSchema,
    type GeoLocation,
    GeoLocationSchema,
    type GeoLocationApiResponse
} from "@/api/geocoding.schema"
import type { Result } from "@/api/types"

export async function getMatchingLocation(searchTerm: string): Promise<Result<GeoLocation[]>> {
    const params = new URLSearchParams({
        name: searchTerm,
        count: "20",
        language: "en",
        format: "json"
    })
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?${params}`)
    if (response.status !== 200) {
        return { success: false, error: new Error("Failed to fetch geocoding data.") }
    }

    const content = await response.json()
    if (!content["results"]) {
        return { success: false, error: new Error("No geocoding results found.") }
    }

    const result = GeoLocationsApiResponseSchema.safeParse(content["results"])
    if (!result.success) {
        return { success: false, error: result.error }
    }

    const data = result.data.map((location: GeoLocationApiResponse): GeoLocation => GeoLocationSchema.parse(location))
    return { success: true, data }
}