'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"

const ChefCard = ({ name, role, description, imageSrc, videoSrc }: {
  name: string
  role: string
  description: string
  imageSrc: string
  videoSrc: string
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card 
      className="overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <CardContent className="p-0">
        {isHovered ? (
          <video 
            src={videoSrc} 
            className="w-full h-64 object-cover"
            autoPlay 
            loop 
            muted 
            playsInline
          />
        ) : (
          <Image
            src={imageSrc}
            alt={`Chef ${name}`}
            width={400}
            height={300}
            className="w-full h-64 object-cover"
          />
        )}
        <div className="p-6">
          <h3 className="text-xl font-bold text-secondary mb-2">{name}</h3>
          <p className="text-secondary font-semibold">{role}</p>
          <p className="mt-4 text-secondary">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ChefsSection() {
  return (
    <section className="py-20 bg-amber-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-secondary mb-12">
          Nuestros Chefs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ChefCard
            name="Manuel Girardi"
            role="Chef Ejecutivo"
            description="Con más de 15 años de experiencia, Manuel trae la esencia de la cocina mediterránea a cada plato."
            imageSrc="https://res.cloudinary.com/dcxlhj8h3/image/upload/v1731703831/monica_ystqtp.webp"
            videoSrc="https://res.cloudinary.com/dcxlhj8h3/video/upload/v1731702022/3296569-uhd_4096_2160_25fps_h8nbip.mp4"
          />
          <ChefCard
            name="Carlos Rodríguez"
            role="Chef de Cocina Oriental"
            description="Carlos es un maestro en el arte de los platillos orientales, creando combinaciones que complementan perfectamente cada comida."
            imageSrc="https://res.cloudinary.com/dcxlhj8h3/image/upload/v1731703869/peladin_bzrw1z.webp"
            videoSrc="https://res.cloudinary.com/dcxlhj8h3/video/upload/v1731701999/3295852-uhd_4096_2160_25fps_lfmobc.mp4"
          />
          <ChefCard
            name="Omar Martinez"
            role="Chef de Cocina Fusión"
            description="Omar se especializa en la fusión de sabores internacionales, creando platos innovadores que sorprenden el paladar."
            imageSrc="https://res.cloudinary.com/dcxlhj8h3/image/upload/v1731689952/omar-algo-anda-mal_mjlqpu.webp"
            videoSrc="https://res.cloudinary.com/dcxlhj8h3/video/upload/v1731701992/3296290-uhd_4096_2160_25fps_bxkzzc.mp4"
          />
        </div>
      </div>
    </section>
  )
}