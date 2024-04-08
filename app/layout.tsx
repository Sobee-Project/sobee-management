import type { Metadata } from "next"
import { Inter, Nunito } from "next/font/google"
import "./globals.css"
import Providers from "./providers"

const inter = Nunito({ subsets: ["latin", "vietnamese"] })

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
