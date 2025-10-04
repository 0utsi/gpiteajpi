import type { Meta, StoryObj } from "@storybook/react"
import Input from "./input"

const meta: Meta<typeof Input> = {
  title: "Components/form/Input",
  component: Input,
  decorators: [
    (Story) => (
      <div
        style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px", width: "400px" }}
      >
        <Story />
      </div>
    ),
  ],
  args: {
    placeholder: "Enter text...",
  },
  argTypes: {
    type: {
      options: ["text", "email", "password", "number", "tel", "url"],
      control: { type: "select" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    startIcon: {
      control: { type: "text" },
    },
    endIcon: {
      control: { type: "text" },
    },
  },
}

type Story = StoryObj<typeof Input>

export const Default: Story = {}

export const WithStartIcon: Story = {
  args: {
    startIcon: "🔍",
    placeholder: "Search...",
  },
}

export const WithEndIcon: Story = {
  args: {
    endIcon: "✕",
    placeholder: "Clearable input",
  },
}

export const WithBothIcons: Story = {
  args: {
    startIcon: "🔍",
    endIcon: "✕",
    placeholder: "Search with clear",
  },
}

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter password",
  },
}

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "Enter email",
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled input",
  },
}

export const WithValue: Story = {
  args: {
    defaultValue: "Pre-filled value",
  },
}

export default meta
