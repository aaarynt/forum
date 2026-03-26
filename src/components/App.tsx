// src/App.tsx
import Navbar from './layout/navbar'
import Main from './layout/main/index'
import Footer from './layout/footer'
import { Toaster } from './ui/sonner'

export default function App() {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col gap-4">
      <Toaster position="top-center" duration={1500} />
      <Navbar />
      <Main />
      <Footer />
    </div>
  )
}
