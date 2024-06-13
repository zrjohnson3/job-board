// Custom H1 component
import { cn } from "@/lib/utils"

export default function H1(props: React.HTMLProps<HTMLHeadingElement>) {
    return <h1
        {...props}
        className={cn(
            "font-extrabold text-xl md:text-3xl lg:text-5xl",
            props.className
        )}
    >
        {props.children}
    </h1>
}