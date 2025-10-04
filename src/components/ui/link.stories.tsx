import type { Meta, StoryObj } from "@storybook/react"
import Link from "./link"

const meta: Meta<typeof Link> = {
  title: "Components/ui/Link",
  component: Link,
  decorators: [
    (Story) => (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px" }}>
        <Story />
      </div>
    ),
  ],
  args: {
    href: "/example",
    children: "Link text",
  },
  argTypes: {
    href: {
      control: { type: "text" },
    },
    target: {
      options: ["_self", "_blank", "_parent", "_top"],
      control: { type: "select" },
    },
    rel: {
      control: { type: "text" },
    },
  },
}

type Story = StoryObj<typeof Link>

export const Default: Story = {}

export const External: Story = {
  args: {
    href: "https://example.com",
    target: "_blank",
    rel: "noopener noreferrer",
    children: "External link",
  },
}

export const WithCustomStyling: Story = {
  args: {
    href: "/styled",
    children: "Styled link",
    className: "text-blue-600 underline hover:text-blue-800",
  },
}

export const ButtonStyle: Story = {
  args: {
    href: "/button-style",
    children: "Button-like link",
    className: "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors",
  },
}

export const Large: Story = {
  args: {
    href: "/large",
    children: "Large link",
    className: "text-xl font-bold",
  },
}

export const WithIcon: Story = {
  args: {
    href: "/with-icon",
    children: "→ Link with arrow",
    className: "flex items-center gap-2",
  },
}

export default meta
