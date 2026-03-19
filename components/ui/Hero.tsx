import React from 'react'
import dynamic from 'next/dynamic'

const NewsTicker = dynamic(() => import('./NewsTicker'), { ssr: false })

type HeroProps = {
  title: string
  subtitle?: string
  image: string
  height?: string
  showTicker?: boolean
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, image, height = '340px', showTicker = true }) => {
  return (
    <>
      <section className="relative w-full" style={{ height }}>
        <div
          aria-label={title}
          className="absolute inset-0"
          style={{
            backgroundImage: `url('${image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
        <div className="relative z-10 h-full flex items-center justify-center pt-20 md:pt-28">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3">{title}</h1>
            {subtitle && <p className="text-lg md:text-xl text-gray-200">{subtitle}</p>}
          </div>
        </div>
      </section>
      {showTicker && <NewsTicker />}
    </>
  )
}

export default Hero
