import { cn } from "@/lib/utils"

interface InputProps extends React.ComponentProps<"input"> {
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  testId?: string
  endIconAsButton?: React.ReactNode
  startIconClassName?: string
  containerClassName?: string
}

function Input({
  className,
  type,
  startIcon,
  endIcon,
  testId,
  endIconAsButton,
  startIconClassName,
  containerClassName,
  ...props
}: Readonly<InputProps>) {
  return (
    <div className={cn("relative w-full", containerClassName)}>
      {startIcon && (
        <span
          className={cn(
            "[&>*]:h-5[&>*]:w-5 absolute top-1/2 left-3 -translate-y-1/2 [&>*]:text-gray-500",
            startIconClassName
          )}
        >
          {startIcon}
        </span>
      )}
      <input
        data-testid={testId ?? "input-default"}
        type={type}
        data-slot="input"
        className={cn(
          `border-input text-base-black file:text-base-black font-regular flex h-12 w-full min-w-0 rounded-md border bg-transparent px-3 outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 disabled:pointer-events-none disabled:cursor-not-allowed`,
          `aria-invalid:focus-visible:border-destructive focus-visible:border-ring focus-visible:ring-ring focus-visible:ring-[1px]`,
          "aria-invalid:ring-destructive aria-invalid:border-destructive",
          "hover:border-base-black hover:ring-base-black hover:ring-[1px]",
          "h-12 leading-12",
          "ellipsis",
          "disabled:border-gray-300 disabled:bg-gray-50 disabled:text-gray-500",
          startIcon ? "pl-10" : "",
          endIcon ? "pr-10" : "",
          endIconAsButton ? "pr-40" : "",
          className
        )}
        {...props}
      />
      {endIcon && (
        <span className="absolute top-1/2 right-3 flex -translate-y-1/2 items-center justify-center [&>*]:h-5 [&>*]:w-5 [&>*]:text-gray-500">
          {endIcon}
        </span>
      )}
      {endIconAsButton && <span className="absolute top-1/2 right-3 -translate-y-1/2">{endIconAsButton}</span>}
    </div>
  )
}

export default Input
