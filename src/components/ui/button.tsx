import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { type LinkProps } from "next/link"
import * as React from "react"

import Link from "./link"
import Spinner, { type SpinnerProps } from "./spinner"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-base-black text-base-white font-medium hover:bg-base-white hover:text-base-black hover:outline hover:outline-1 hover:outline-base-black focus-visible:ring-4 focus-visible:ring-brand-primary-blue",
        outlined:
          "outline outline-1 font-medium outline-base-black text-base-black hover:bg-base-black hover:text-base-white hover:outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-base-black focus-visible:ring-4 focus-visible:ring-brand-primary-blue",
        outlinedWhite:
          "outline outline-1 font-medium outline-base-black text-base-black hover:bg-base-black hover:text-base-white hover:outline focus-visible:outline focus-visible:outline-1 focus-visible:outline-base-black focus-visible:ring-4 focus-visible:ring-brand-primary-blue",
        text: "bg-transparent [&&]:p-0 h-auto font-semibold text-base-black underline underline-offset-[5px] hover:no-underline hover:bg-transparent focus-visible:ring-2 focus-visible:ring-brand-primary-blue focus-visible:rounded-md focus-visible:no-underline",
        textNoUnderline:
          "bg-transparent p-0 h-auto font-semibold text-base-black no-underline hover:underline hover:underline-offset-[5px] hover:bg-transparent focus-visible:ring-2 focus-visible:ring-brand-primary-blue focus-visible:rounded-md",
        disabled: "bg-gray-400 text-base-white font-500 cursor-not-allowed pointer-events-none outline-0",
        ghost: "hover:bg-transparent",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-[48px] px-5 py-3 text-md",
        sm: "h-[44px] px-4 py-3 text-sm",
        icon: "size-9",
        verySmall: "h-[32px] text-sm px-3",
      },
      isOnDark: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        isOnDark: true,
        className:
          "bg-base-white text-base-black hover:bg-transparent hover:text-base-white hover:outline hover:outline-1 hover:outline-base-white focus-visible:ring-4 focus-visible:ring-brand-primary-blue",
      },
      {
        variant: "outlined",
        isOnDark: true,
        className:
          "outline outline-1 outline-base-white text-base-white hover:bg-base-white hover:text-base-black hover:outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-base-white focus-visible:ring-4 focus-visible:ring-brand-primary-blue",
      },
      {
        variant: "outlinedWhite",
        isOnDark: true,
        className:
          "outline outline-1 outline-base-white text-base-white hover:bg-base-white hover:text-base-black hover:outline focus-visible:outline focus-visible:outline-1 focus-visible:outline-base-white focus-visible:ring-4 focus-visible:ring-brand-primary-blue",
      },
      {
        variant: "text",
        className: "text-base-white p-0 h-auto disabled:bg-transparent",
        isOnDark: true,
      },
      {
        variant: "textNoUnderline",
        className: "text-base-white p-0 h-auto",
        isOnDark: true,
      },
      {
        variant: "default",
        className: "disabled:bg-gray-400 disabled:text-base-white",
      },
      {
        variant: "default",
        isOnDark: true,
        className: "disabled:bg-gray-200 disabled:text-gray-600",
      },
      {
        variant: "outlined",
        className: "disabled:text-gray-400 disabled:outline-gray-400 disabled:bg-transparent",
      },
      {
        variant: "text",
        className: "disabled:text-gray-400 disabled:bg-transparent",
      },
      {
        variant: "textNoUnderline",
        className: "disabled:text-gray-400 disabled:bg-transparent",
      },
      {
        variant: "text",
        className: "text-base-white p-0 h-auto",
        isOnDark: true,
      },
      {
        variant: "textNoUnderline",
        className: "p-0 h-auto",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      isOnDark: false,
    },
  }
)

export interface ButtonProps extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isOnDark?: boolean
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  href?: string
  isLoading?: boolean
  testId?: string
  spinnerColor?: SpinnerProps["color"]
  linkProps?: Omit<LinkProps, "href">
  buttonIdClassname?: string
  target?: string
  rel?: string
  notAllowed?: boolean
}

function Button({
  className,
  buttonIdClassname = "",
  variant,
  size,
  isOnDark = false,
  asChild = false,
  startIcon,
  endIcon,
  children,
  type,
  href,
  isLoading = false,
  testId,
  spinnerColor = "white",
  linkProps,
  target,
  rel,
  notAllowed = false,
  ...props
}: Readonly<ButtonProps>) {
  const classNames = cn(buttonVariants({ variant, size, isOnDark, className }))

  if (asChild || href) {
    const Comp = Slot
    return (
      <Comp className={classNames} {...props}>
        {href ? (
          <Link {...linkProps} href={href} target={target} rel={rel}>
            {startIcon && <span className="inline-flex shrink-0 items-center justify-center">{startIcon}</span>}
            {children}
            {endIcon && <span className="inline-flex shrink-0 items-center justify-center">{endIcon}</span>}
          </Link>
        ) : (
          children
        )}
      </Comp>
    )
  }

  return (
    <button
      data-testid={testId ?? "button-default"}
      className={cn(
        classNames,
        buttonIdClassname,
        className,
        notAllowed && "cursor-not-allowed",
        (isLoading || props.disabled) && variant !== "text" && buttonVariants({ variant, size, isOnDark, className })
      )}
      {...props}
      disabled={isLoading || props.disabled}
      type={type ?? "button"}
    >
      {isLoading && (
        <span className="inline-flex shrink-0 items-center justify-center">
          <Spinner color={spinnerColor} size="sm" isLoading={isLoading} />
        </span>
      )}

      {startIcon && !isLoading && <span className="inline-flex shrink-0 items-center justify-center">{startIcon}</span>}
      {href ? (
        <Link href={href} target={target} rel={rel}>
          {children}
        </Link>
      ) : (
        children
      )}
      {endIcon && <span className="inline-flex shrink-0 items-center justify-center">{endIcon}</span>}
    </button>
  )
}

export { Button, buttonVariants }
