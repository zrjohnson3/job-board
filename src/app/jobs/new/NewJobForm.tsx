"use client"
"use client";

import LoadingButton from "@/components/LoadingButton";
import LocationInput from "@/components/LocationInput";
import RichTextEditor from "@/components/RichTextEditor";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import H1 from "@/components/ui/h1";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Select from "@/components/Select";
import { jobTypes, locationTypes } from "@/lib/job-types";
import { CreateJobValues, createJobSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { draftToMarkdown } from "markdown-draft-js";
import { useForm } from "react-hook-form";

export default function NewJobForm() {

    const form = useForm<CreateJobValues>({
        resolver: zodResolver(createJobSchema),
    });

    const {
        handleSubmit,
        watch,
        trigger,
        control,
        setValue,
        setFocus,
        formState: { isSubmitting },
    } = form;


    async function onSubmit(values: CreateJobValues) {
        try {
            console.log('Submitting form...')
            console.log(JSON.stringify(values, null, 2));
            // Add your submission logic here
            alert('Form submitted successfully!');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error submitting form. Check console for details.');
        }
    }

    return (
        <main className='max-w-3xl m-auto my-10 space-y-10'>
            <div className='space-y-5 text-center'>
                <H1>Find the perfect candidate!</H1>
                <p>Post a new position and let the candidates come to you.</p>
                <p className='text-muted-foreground'>Thousands of job seekers. Thousands of clients.</p>
            </div>

            <div className='space-y-4 border p-4 bg-muted'>
                <div>
                    <h2 className='font-semibold'>Post a new job</h2>
                    <p className='text-muted-foreground'>Fill out the form below to post a new job.</p>
                </div>

                <div>
                    <Form {...form}>
                        <form
                            noValidate
                            onSubmit={handleSubmit(onSubmit)}
                            className='z-auto w-auto space-y-6'
                        >
                            <FormField
                                control={control}
                                name='title'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Job Title</FormLabel>
                                        <FormControl>
                                            <Input {...field} type='text' placeholder='Job Title' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={control}
                                name='companyName'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Company Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} type='text' placeholder='Apple, Google, Meta, etc..' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={control}
                                name='companyLogo'
                                render={({ field: { value, ...fieldValues } }) => (
                                    <FormItem>
                                        <FormLabel>Company Logo</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...fieldValues}
                                                type='file'
                                                placeholder='Insert Company Logo File'
                                                accept='image/*'
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    fieldValues.onChange(file);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Job type</FormLabel>
                                        <FormControl>
                                            <Select {...field} defaultValue="">
                                                <option value="" hidden>
                                                    Select an option
                                                </option>
                                                {jobTypes.map((jobType) => (
                                                    <option key={jobType} value={jobType}>
                                                        {jobType}
                                                    </option>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={control}
                                name='location'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Location</FormLabel>
                                        <FormControl>
                                            <LocationInput
                                                onLocationSelected={field.onChange}
                                            />
                                        </FormControl>
                                        {watch('location') && (
                                            <div className='flex items-center gap-1'>
                                                <button
                                                    type='button'
                                                    onClick={() => {
                                                        setValue('location', '', { shouldValidate: true })
                                                    }}
                                                >
                                                    <X size={20} />
                                                </button>
                                                <span className='text-sm'>{watch('location')}</span>
                                            </div>
                                        )}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={control}
                                name="locationType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Location</FormLabel>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                defaultValue=""
                                                onChange={(e: any) => {
                                                    field.onChange(e);
                                                    if (e.currentTarget.value === "Remote") {
                                                        trigger("location");
                                                    }
                                                }}
                                            >
                                                <option value="" hidden>
                                                    Select an option
                                                </option>
                                                {locationTypes.map((locationType) => (
                                                    <option key={locationType} value={locationType}>
                                                        {locationType}
                                                    </option>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className='space-y-2'>
                                <FormLabel>How to Apply</FormLabel>
                                <div className='flex justify-between'>
                                    <FormField
                                        control={control}
                                        name='applicationEmail'
                                        render={({ field }) => (
                                            <FormItem className='grow'>
                                                <FormControl>
                                                    <div className='flex items-center'>
                                                        <Input
                                                            {...field}
                                                            type='email'
                                                            id='applicationEmail'
                                                            placeholder='Email Address'
                                                        />
                                                        <span className='mx-2'>or</span>
                                                    </div>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={control}
                                        name='applicationUrl'
                                        render={({ field }) => (
                                            <FormItem className='grow'>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type='url'
                                                        id='applicationUrl'
                                                        placeholder='Website Url'
                                                        onChange={(e) => {
                                                            trigger('applicationEmail');
                                                        }}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />


                                </div>
                            </div>

                            <FormField
                                control={control}
                                name='description'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel onClick={() => setFocus('description')}>Description</FormLabel>
                                        <FormControl>
                                            <RichTextEditor
                                                onChange={(draft) => {
                                                    field.onChange(draftToMarkdown(draft));
                                                }}
                                                ref={field.ref}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={control}
                                name='salary'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Salary</FormLabel>
                                        <FormControl>
                                            <Input {...field} type='number' placeholder='$80,000' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <LoadingButton loading={isSubmitting} type="submit" className="bg-primary text-white font-bold py-2 px-4 rounded z-50" />
                        </form>
                    </Form>
                </div>
            </div>
        </main>
    );
}