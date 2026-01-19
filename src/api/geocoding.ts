import { GeocodingApiResponseSchema, type MatchedLocation, MatchedLocationSchema } from "@/api/types"

export async function getMatchingLocation(searchTerm: string): Promise<{ matchedLocations: MatchedLocation[], error?: string }> {
    const params = new URLSearchParams({
        name: searchTerm,
        count: "20",
        language: "en",
        format: "json"
    })
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?${params}`)
    if (response.status !== 200) {
        return { matchedLocations: [], error: "Failed to fetch geocoding data." }
    }

    const content = await response.json()
    if (!content["results"]) {
        return { matchedLocations: [], error: "No geocoding results found." }
    }

    const result = GeocodingApiResponseSchema.safeParse(content["results"])
    if (!result.success) {
        return { matchedLocations: [], error: result.error.message }
    }

    return { matchedLocations: result.data.map((item): MatchedLocation => MatchedLocationSchema.parse(item)) }
}