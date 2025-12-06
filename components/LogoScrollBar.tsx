import Image from 'next/image'

export default function LogoScrollBar() {
  return (
    <>
      {/* Horizontal scrolling logo bar at the top */}
      <div className="w-full overflow-hidden relative">
        <div className="flex items-center gap-8 py-4">
          <div className="flex items-center gap-8 animate-scroll">
            {Array.from({ length: 20 }).map((_, i) => (
              <Image
                key={i}
                src="/nfass-logo.JPG"
                alt="n/fäss"
                width={200}
                height={80}
                className="h-16 w-auto flex-shrink-0"
              />
            ))}
            {/* Duplicate for seamless loop */}
            {Array.from({ length: 20 }).map((_, i) => (
              <Image
                key={`dup-${i}`}
                src="/nfass-logo.JPG"
                alt="n/fäss"
                width={200}
                height={80}
                className="h-16 w-auto flex-shrink-0"
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Creative red underline */}
      <div className="w-full relative">
        <div className="creative-red-underline"></div>
      </div>
    </>
  )
}

