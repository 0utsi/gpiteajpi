import type { Meta, StoryObj } from "@storybook/react"
import { Chart } from "./chart"

const meta: Meta<typeof Chart> = {
  title: "Components/ui/Chart",
  component: Chart,
  decorators: [
    (Story) => (
      <div
        style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px", padding: "20px" }}
      >
        <Story />
      </div>
    ),
  ],
  args: {
    data: [
      { name: "Jan", value: 400 },
      { name: "Feb", value: 300 },
      { name: "Mar", value: 200 },
      { name: "Apr", value: 278 },
      { name: "May", value: 189 },
      { name: "Jun", value: 239 },
    ],
  },
  argTypes: {
    type: {
      options: ["bar", "line", "pie"],
      control: { type: "select" },
    },
    height: {
      control: { type: "number", min: 100, max: 500 },
    },
    showLabels: {
      control: { type: "boolean" },
    },
    showValues: {
      control: { type: "boolean" },
    },
  },
}

type Story = StoryObj<typeof Chart>

export const BarChart: Story = {
  args: {
    type: "bar",
  },
}

export const LineChart: Story = {
  args: {
    type: "line",
  },
}

export const PieChart: Story = {
  args: {
    type: "pie",
    data: [
      { name: "Desktop", value: 45, color: "#8884d8" },
      { name: "Mobile", value: 30, color: "#82ca9d" },
      { name: "Tablet", value: 25, color: "#ffc658" },
    ],
  },
}

export const SalesData: Story = {
  args: {
    type: "bar",
    data: [
      { name: "Q1", value: 12000, color: "#3b82f6" },
      { name: "Q2", value: 19000, color: "#10b981" },
      { name: "Q3", value: 3000, color: "#f59e0b" },
      { name: "Q4", value: 5000, color: "#ef4444" },
    ],
    height: 250,
  },
}

export const WebsiteTraffic: Story = {
  args: {
    type: "line",
    data: [
      { name: "Mon", value: 4000 },
      { name: "Tue", value: 3000 },
      { name: "Wed", value: 2000 },
      { name: "Thu", value: 2780 },
      { name: "Fri", value: 1890 },
      { name: "Sat", value: 2390 },
      { name: "Sun", value: 3490 },
    ],
    height: 300,
  },
}

export const RevenueBreakdown: Story = {
  args: {
    type: "pie",
    data: [
      { name: "Product Sales", value: 60, color: "#22c55e" },
      { name: "Services", value: 25, color: "#3b82f6" },
      { name: "Subscriptions", value: 15, color: "#f59e0b" },
    ],
    height: 200,
  },
}

export default meta
