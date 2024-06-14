'use client';
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

export default function FormSubmitButton(
    props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {

    const { pending } = useFormStatus(); // Get the form status (New hook in React 18, used to track the form status)

    return (
        <Button
            type="submit"
            className="bg-primary text-white font-bold py-2 px-4 rounded"
            {...props}
        >
            <span className="flex items-center justify-center">
                {pending && <Loader2 size={16} className="animate-spin" />}
                {props.children}
            </span>
        </Button>
    );
}