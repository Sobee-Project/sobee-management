import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "react-big-calendar/lib/css/react-big-calendar.css"
import "./globals.css"
import Providers from "./providers"

const inter = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"]
})

export const metadata: Metadata = {
    title: "Sobee Admin Panel",
    description: "Sobee Admin Panel"
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
