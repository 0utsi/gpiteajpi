import NextLink from "next/link"
import { type LinkProps as NextLinkProps } from "next/link"
import * as React from "react"
import { cn } from "../../lib/utils"

export interface LinkProps extends NextLinkProps {
  children: React.ReactNode
  className?: string
  target?: string
  rel?: string
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(({ className, children, ...props }, ref) => {
  return (
    <NextLink className={cn("hover:text-foreground/80 transition-colors", className)} ref={ref} {...props}>
      {children}
    </NextLink>
  )
})
Link.displayName = "Link"

export default Link
