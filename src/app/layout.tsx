import "@/styles/tailwind.css"
import localFont from "next/font/local"

const montserrat = localFont({
  src: [
    { path: "../assets/fonts/Montserrat/Montserrat-VariableFont_wght.ttf", weight: "100 900", style: "normal" },
    { path: "../assets/fonts/Montserrat/Montserrat-Italic-VariableFont_wght.ttf", weight: "100 900", style: "italic" },
  ],
  variable: "--font-montserrat",
  display: "swap",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={montserrat.variable}>{children}</body>
    </html>
  )
}
