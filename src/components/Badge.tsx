interface BadgeProps {
    children: React.ReactNode;
}

export default function Badge({ children }: BadgeProps) {
    return <span className="rounded-full boarder bg-muted px-2 py-0.5 text-sm font-semibold text-gray-100 bg-blue-500">{children}</span>
}