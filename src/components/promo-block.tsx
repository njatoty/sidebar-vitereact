import { PropsWithChildren } from "react"
import { cn } from "../utils"

interface PromBlockProps extends PropsWithChildren{
    className?: string
}

export function PromoBlock({ children, className } : PromBlockProps) {
    return (
        <div className={cn("rounded-[26px] bg-[#331516] border border-[#462329] flex flex-col items-center p-4", className)}>
            {children}
        </div>
    )
}

export function YellowButton({ children, className } : PromBlockProps) {
    return (
        <button className={cn("rounded-[12px] bg-[#E0822D] text-white py-2 px-4 hover:cursor-pointer", className)}>
            {children}
        </button>
    )
}

