import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

const Select = forwardRef<HTMLSelectElement, React.HTMLProps<HTMLSelectElement>>(
    ({ className, ...props }, ref) => {
        return (
            <div className='relative'>
                <select
                    className={cn(
                        "h-10 w-full appearance-none truncate rounded-md border bg-background border-input py-2 pl-3 pr-8 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                        className,
                    )}
                    ref={ref} // Forward the ref to the native select element
                    {...props} // Pass the rest of the props to the native select element
                />
                <ChevronDown className="absolute right-2 top-2 text-muted-foreground opacity-50" />
            </div>
        )
    }
);

export default Select