import { z } from "zod"

const GeoLocationApiResponseSchema = z.object({
    id: z.number(),
    name: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    admin1: z.string().optional(),
    country: z.string(),
})
export type GeoLocationApiResponse = z.infer<typeof GeoLocationApiResponseSchema>

export const GeoLocationsApiResponseSchema = z.array(GeoLocationApiResponseSchema)

export const GeoLocationSchema = GeoLocationApiResponseSchema.transform((item: z.infer<typeof GeoLocationApiResponseSchema>) => ({
    id: item.id,
    city: item.name,
    region: item.admin1 ?? "",
    country: item.country,
    latitude: item.latitude,
    longitude: item.longitude,
}))
export type GeoLocation = z.infer<typeof GeoLocationSchema>
