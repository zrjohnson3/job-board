import { z } from 'zod';
import { jobTypes, locationTypes } from './job-types';
import { describe } from 'node:test';
import path from 'path';

// Custom schema for required string
const requiredString = z.string().min(1, "Required");

// Custom schema for required numeric string
const numericRequiredString = requiredString.regex(/^\d+$/, "Must be a number");

// Custom schema for file upload (company logo)
const companyLogoSchema = z.custom<File | undefined>() // Custom schema for file upload
    .refine(file => !file || (file instanceof File && file.type.startsWith("image/")), // Check if the file is an image (zod does not have a built-in schema for file upload)
        "Must be an image file")
    .refine(file => {
        return !file || file.size < 1024 * 1024 * 2
    }, // Check if the file is less than 2MB
        "File size must be less than 2MB");


// Application schema: Either application email or application URL is required 
const applicationSchema = z.object({
    applicationEmail: z.string().max(100).email().optional().or(z.literal("")),
    applicationUrl: z.string().max(100).email().optional().or(z.literal("")),
})
    .refine(data => {
        data.applicationEmail || data.applicationUrl,
        {
            message: "Either application email or application URL is required",
            path: ["applicationEmail"]
        }
    })


// Location schema for job location
export const locationSchema = z.object({
    locationTypes: requiredString.refine(
        value => locationTypes.includes(value),
        "Invalid location type"
    ),
    location: z.string().max(100).optional(),
})
    .refine(
        data => !data.locationTypes || data.locationTypes === "remote" || data.location,
        {
            message: "Location is required for on-site jobs",
            path: ["location"]
        }
    )

// Create Job schema (for creating a new job)
export const createJobSchema = z.object({
    title: requiredString,
    type: requiredString.refine(
        value => jobTypes.includes(value),
        "Invalid job type"
    ),
    companyName: requiredString.max(100),
    companyLogo: companyLogoSchema,
    description: z.string().max(5000).optional(),
    salary: numericRequiredString.max(9, "Number can't be longer than 9 digits"),
})
    .and(applicationSchema) // Combine the application schemas
    .and(locationSchema); // Combine the location schemas


export type CreateJobValues = z.infer<typeof createJobSchema>; // Infer the type of the schema to use in the component (Takes the schema and returns a typescript type)

// Job Filter schema for filtering jobs (search)
export const jobFilterSchema = z.object({
    q: z.string().optional(),
    type: z.string().optional(),
    location: z.string().optional(),
    remote: z.coerce.boolean().optional(), // Coerce is used to convert string to boolean if needed. It will convert 'true' to true and 'false' to false
});

export type JobFilterValues = z.infer<typeof jobFilterSchema>; // Infer the type of the schema to use in the component (Takes the schema and returns a typescript type)