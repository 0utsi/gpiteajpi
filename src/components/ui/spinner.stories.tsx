import type { Meta, StoryObj } from "@storybook/react"
import Spinner from "./spinner"

const meta: Meta<typeof Spinner> = {
  title: "Components/ui/Spinner",
  component: Spinner,
  decorators: [
    (Story) => (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px" }}>
        <Story />
      </div>
    ),
  ],
  args: {
    isLoading: true,
  },
  argTypes: {
    size: {
      options: ["sm", "md", "lg"],
      control: { type: "select" },
    },
    color: {
      options: ["white", "black", "primary"],
      control: { type: "select" },
    },
    isLoading: {
      control: { type: "boolean" },
    },
  },
}

type Story = StoryObj<typeof Spinner>

export const Default: Story = {}

export const Small: Story = {
  args: {
    size: "sm",
  },
}

export const Medium: Story = {
  args: {
    size: "md",
  },
}

export const Large: Story = {
  args: {
    size: "lg",
  },
}

export const Black: Story = {
  args: {
    color: "black",
  },
}

export const Primary: Story = {
  args: {
    color: "primary",
  },
}

export const White: Story = {
  args: {
    color: "white",
  },
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
}

export const NotLoading: Story = {
  args: {
    isLoading: false,
  },
}

export const WithCustomClass: Story = {
  args: {
    className: "border-4",
  },
}

export default meta
