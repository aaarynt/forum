// src/App.tsx
import Navbar from './layout/navbar'
import Main from './layout/main/index'
import Footer from './layout/footer'
import { Toaster } from './ui/sonner'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-500 text-shadow-neutral-800">
      <Toaster position="top-center" duration={1000} />
      <Navbar />
      <Main />
      <Footer />
    </div>
  )
}
