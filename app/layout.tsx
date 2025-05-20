import type React from "react"
import type { Metadata } from "next/types"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Disclaimer } from "@/components/disclaimer"
import { cn } from "@/lib/utils"
import "@/styles/globals.scss"
import { AgeVerificationModal } from "@/components/age-verification-modal"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "StormQuest Games - Sosial Spillplattform",
  description: "En morsom sosial spillplattform for underholdning. Ingen ekte penger eller premier involvert.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="no" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AgeVerificationModal />
          <div className="relative flex min-h-screen flex-col">
            <Disclaimer type="top" />
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
