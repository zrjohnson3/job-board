'use client';
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import LoadingButton from "./LoadingButton";

export default function FormSubmitButton(
    props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {

    const { pending } = useFormStatus(); // Get the form status (New hook in React 18, used to track the form status)

    return (
        <LoadingButton loading={pending} {...props} type="submit" /> // Pass the pending status to the LoadingButton component
    );
}