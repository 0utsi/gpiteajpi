import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "./button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card"

const meta: Meta<typeof Card> = {
  title: "Components/ui/Card",
  component: Card,
  decorators: [
    (Story) => (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px" }}>
        <Story />
      </div>
    ),
  ],
}

type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
    </Card>
  ),
}

export const WithFooter: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="name">Name</label>
              <input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="framework">Framework</label>
              <select id="framework">
                <option value="">Select</option>
                <option value="next">Next.js</option>
                <option value="sveltekit">SvelteKit</option>
                <option value="astro">Astro</option>
                <option value="nuxt">Nuxt.js</option>
              </select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outlined">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  ),
}

export const Simple: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardContent className="pt-6">
        <div className="text-2xl font-bold">$45,231.89</div>
        <p className="text-muted-foreground text-xs">+20.1% from last month</p>
      </CardContent>
    </Card>
  ),
}

export const WithImage: Story = {
  render: () => (
    <Card className="w-[350px]">
      <div className="bg-muted aspect-video rounded-t-lg" />
      <CardHeader>
        <CardTitle>Beautiful Sunset</CardTitle>
        <CardDescription>Captured at the beach yesterday</CardDescription>
      </CardHeader>
      <CardContent>
        <p>A stunning view of the sunset over the ocean.</p>
      </CardContent>
    </Card>
  ),
}

export default meta
