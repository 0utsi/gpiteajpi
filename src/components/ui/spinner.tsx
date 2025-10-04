import * as React from "react"
import { cn } from "@/lib/utils"

export interface SpinnerProps {
  size?: "sm" | "md" | "lg"
  color?: "white" | "black" | "primary"
  isLoading?: boolean
  className?: string
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = "md", color = "white", isLoading = true, className }, ref) => {
    if (!isLoading) return null

    const sizeClasses = {
      sm: "h-4 w-4",
      md: "h-6 w-6",
      lg: "h-8 w-8",
    }

    const colorClasses = {
      white: "text-white",
      black: "text-black",
      primary: "text-brand-primary-blue",
    }

    return (
      <div
        ref={ref}
        className={cn(
          "animate-spin rounded-full border-2 border-current border-t-transparent",
          sizeClasses[size],
          colorClasses[color],
          className
        )}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    )
  }
)
Spinner.displayName = "Spinner"

export default Spinner
