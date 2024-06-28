"use client"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import H1 from '@/components/ui/h1'
import React from 'react'
import { useForm } from 'react-hook-form'
import { CreateJobValues, createJobSchema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input'
import { Select, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, SelectContent } from '@/components/ui/select'
import { jobTypes } from '@/lib/job-types'
import LocationInput from '@/components/LocationInput'
import { X } from 'lucide-react'


export default function NewJobForm() {

    const form = useForm<CreateJobValues>({
        resolver: zodResolver(createJobSchema)
    });

    // Desctructure form methods
    const {
        handleSubmit,
        watch,
        trigger,
        control,
        setValue,
        setFocus,
        formState: { isSubmitting }
    } = form;

    // Handle form submission
    async function onSubmit(values: CreateJobValues) {
        console.log(JSON.stringify(values, null, 2));
    }

    return (
        <main className='max-w-3xl m-auto my-10 space-y-10'>

            {/* Job Posting Header */}

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

                {/* Form */}

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
                                        {/* <FormDescription>Enter the job title</FormDescription> */}
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
                                        {/* <FormDescription>Enter the company name</FormDescription> */}
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
                                                accept='image/*' // still need to validate on backend to make secure
                                                onChange={(e) => {
                                                    {
                                                        // Get the file from the input and set it as the value of the field in the react-hook-form
                                                        const file = e.target.files?.[0]
                                                        fieldValues.onChange(file)
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                        {/* <FormDescription>Enter the company name</FormDescription> */}
                                        <FormMessage />
                                    </FormItem>

                                )}
                            />


                            <FormField
                                control={control}
                                name='type'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Type</FormLabel>
                                        <FormControl>
                                            <Select {...field}>
                                                <SelectTrigger className="">
                                                    <SelectValue placeholder="Select a Job Type" />
                                                </SelectTrigger>
                                                <SelectContent className='border bg-muted border-black'>
                                                    <SelectGroup>
                                                        <SelectLabel>
                                                            Job Types
                                                        </SelectLabel>
                                                        <SelectItem value='full time'>
                                                            Full Time
                                                        </SelectItem>
                                                        <SelectItem value='part time'>
                                                            Part Time
                                                        </SelectItem>
                                                        <SelectItem value='contract'>
                                                            Contract
                                                        </SelectItem>
                                                        <SelectItem value='internship'>
                                                            Internship
                                                        </SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>

                                )}
                            />

                            {/* location */}
                            <FormField
                                control={control}
                                name='location'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Location</FormLabel>
                                        <FormControl>
                                            <LocationInput
                                                onLocationSelected={field.onChange} // Using our custom location input component to handle location selection -> this will update the value of the field in the react-hook-form by calling the onChange function with the new location value
                                                ref={field.ref}
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



                            {/* location type */}
                            <FormField
                                control={control}
                                name='locationTypes'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Office Location</FormLabel>
                                        <FormControl>
                                            <Select {...field}>
                                                <SelectTrigger className="">
                                                    <SelectValue placeholder="Select a Location Type" />
                                                </SelectTrigger>
                                                <SelectContent className='border bg-muted border-black'>
                                                    <SelectGroup>
                                                        <SelectLabel>
                                                            Location Types
                                                        </SelectLabel>
                                                        <SelectItem value='full time'>
                                                            Remote
                                                        </SelectItem>
                                                        <SelectItem value='part time'>
                                                            Hyrbid
                                                        </SelectItem>
                                                        <SelectItem value='contract'>
                                                            In-Person
                                                        </SelectItem>
                                                        <SelectItem value='internship'>
                                                            Other
                                                        </SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>

                                )}
                            />



                            {/* Application Email */}
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
                                                            // Trigger validation on the email field when the url field changes
                                                            trigger('applicationEmail')
                                                        }}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    {/* <Input
                                    type='email'
                                    placeholder='Email Address'
                                    {...form.register('applicationEmail')}
                                /> */}
                                    <FormMessage />
                                </div>
                            </div>


                            <Button type='submit'>Submit</Button>
                        </form>
                    </Form>
                </div>
            </div>



        </main>
    )
}
