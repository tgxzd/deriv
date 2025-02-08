import type { AppProps } from 'next/app'
import { Header } from "@/components/header"
import { Providers } from "@/app/providers"
import "@/app/globals.css"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <div className="relative flex min-h-screen flex-col overflow-hidden">
        <Header />
        <main className="flex-1">
          <Component {...pageProps} />
        </main>
      </div>
    </Providers>
  )
} 