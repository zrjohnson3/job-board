import React from 'react'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading: boolean;
}

// LoadingButton component that takes a loading prop and displays a loading spinner when the prop is true
export default function LoadingButton({
    children,
    loading,
    ...props
}: LoadingButtonProps) {
    return (
        <Button
            type="submit"
            className="bg-primary text-white font-bold py-2 px-4 rounded"
            {...props}
        >
            <span className="flex items-center justify-center">
                {loading && <Loader2 size={16} className="animate-spin" />}
                {children}
            </span>
        </Button>
    )
}
