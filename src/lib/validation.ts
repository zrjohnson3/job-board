import { z } from 'zod';

export const jobFilterSchema = z.object({
    search: z.string().optional(),
    type: z.string().optional(),
    location: z.string().optional(),
    remote: z.coerce.boolean().optional(), // Coerce is used to convert string to boolean if needed. It will convert 'true' to true and 'false' to false
});

export type JobFilterValues = z.infer<typeof jobFilterSchema>; // Infer the type of the schema to use in the component (Takes the schema and returns a typescript type)