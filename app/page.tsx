'use client'

import Link from 'next/link'
import LogoScrollBar from '@/components/LogoScrollBar'
import HomeLoading from '@/components/HomeLoading'
import { useEffect, useState } from 'react'

export default function Home() {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    // Show button after loading screen disappears (2 seconds)
    const timer = setTimeout(() => {
      setShowButton(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <HomeLoading />
      <div className="w-full relative min-h-screen flex flex-col">
        <LogoScrollBar />
        
        {/* Centered button below */}
        <div className="flex-1 flex items-center justify-center">
          {showButton && (
            <Link
              href="/posts"
              className="get-in-there-button animate-fade-in"
            >
              GET IN THERE
            </Link>
          )}
        </div>
      </div>
    </>
  )
}

