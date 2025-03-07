import { PropsWithChildren } from "react"
import { cn } from "../utils"

interface ChatProps extends PropsWithChildren {
  className?: string
}

interface ChatProfileProps {
  className?: string,
  url?: string,
  status: "active" | "hidden" | "left"
}

interface ChatUsernameProps extends PropsWithChildren {
  className?: string
}

export function ChatItem({ className, children }: ChatProps) {
  return (
    <div className={cn("w-full flex items-center gap-2 p-3", className)}>
      {children}
    </div>
  )
}

ChatItem.Profile = function({ className, url, status } : ChatProfileProps) {
  return (
    <div className={cn("profile relative bg-rose-200 rounded-full", className)}>
      <img src={url || "/Avatar.png"} alt="chat" className="w-7 h-7" />

      <span className={cn(
        "status-bulble absolute -bottom-0 -right-0 h-2 w-2 rounded-full",
        status === "active" && "bg-green-500",
        status === "left" && "bg-yellow-500",
        status === "hidden" && "hidden",
      )} />
    </div>
  )
}

ChatItem.Username = function({ children, className } : ChatUsernameProps) {
  return (
    <p className={cn("text-base text-light", className)}>{children}</p>
  )
}