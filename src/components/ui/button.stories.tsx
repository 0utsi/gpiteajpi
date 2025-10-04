import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "./button"

const meta: Meta<typeof Button> = {
  title: "Components/ui/button",
  component: Button,
  decorators: [
    (Story) => (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px" }}>
        <Story />
      </div>
    ),
  ],
  args: {
    variant: "default",
    size: "default",
    children: "Button",
    isOnDark: false,
  },
  argTypes: {
    variant: {
      options: ["default", "outlined", "outlinedWhite", "text", "textNoUnderline", "disabled", "ghost", "link"],
      control: { type: "select" },
    },
    size: {
      options: ["default", "sm", "icon", "verySmall"],
      control: { type: "select" },
    },
    isOnDark: {
      control: { type: "boolean" },
    },
    isLoading: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    href: {
      control: { type: "text" },
    },
  },
}

type Story = StoryObj<typeof Button>

export const Default: Story = {}

export const Outlined: Story = {
  args: {
    variant: "outlined",
  },
}

export const Text: Story = {
  args: {
    variant: "text",
    isOnDark: true,
  },
}

export const Loading: Story = {
  args: {
    isLoading: true,
  },
}

export const WithIcons: Story = {
  args: {
    startIcon: "←",
    endIcon: "→",
  },
}

export const AsLink: Story = {
  args: {
    href: "/example",
    children: "Go to example",
  },
}

export const OnDark: Story = {
  args: {
    isOnDark: true,
  },
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export default meta
