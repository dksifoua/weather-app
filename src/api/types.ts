import { z } from "zod"

const GeocodingApiResponseItemSchema = z.object({
    id: z.number(),
    name: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    admin1: z.string(),
    country: z.string(),
})

export const GeocodingApiResponseSchema = z.array(GeocodingApiResponseItemSchema)

export const MatchedLocationSchema = GeocodingApiResponseItemSchema.transform((item: z.infer<typeof GeocodingApiResponseItemSchema>) => ({
    id: item.id,
    city: item.name,
    region: item.admin1,
    country: item.country,
    latitude: item.latitude,
    longitude: item.longitude,
}))

export type MatchedLocation = z.infer<typeof MatchedLocationSchema>
