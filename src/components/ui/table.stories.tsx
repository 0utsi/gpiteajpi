import type { Meta, StoryObj } from "@storybook/react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./table"

const meta: Meta<typeof Table> = {
  title: "Components/ui/Table",
  component: Table,
  decorators: [
    (Story) => (
      <div
        style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px", padding: "20px" }}
      >
        <Story />
      </div>
    ),
  ],
}

type Story = StoryObj<typeof Table>

const sampleData = [
  { name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
  { name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active" },
  { name: "Bob Johnson", email: "bob@example.com", role: "User", status: "Inactive" },
  { name: "Alice Brown", email: "alice@example.com", role: "Moderator", status: "Active" },
]

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV002</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell>PayPal</TableCell>
          <TableCell className="text-right">$150.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV003</TableCell>
          <TableCell>Unpaid</TableCell>
          <TableCell>Bank Transfer</TableCell>
          <TableCell className="text-right">$350.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
}

export const Users: Story = {
  render: () => (
    <Table>
      <TableCaption>User management table</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleData.map((user, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>
              <span
                className={`rounded-full px-2 py-1 text-xs ${
                  user.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {user.status}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

export const Simple: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Stock</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Laptop</TableCell>
          <TableCell>$999.00</TableCell>
          <TableCell>12</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Mouse</TableCell>
          <TableCell>$29.99</TableCell>
          <TableCell>45</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Keyboard</TableCell>
          <TableCell>$79.99</TableCell>
          <TableCell>23</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
}

export default meta
