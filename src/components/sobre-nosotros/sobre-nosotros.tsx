"use client"
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-amber-800 mb-8">Sobre Nosotros</h1>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <Image
            src="https://res.cloudinary.com/dcxlhj8h3/image/upload/v1731939110/pexels-pixabay-260922_unrn30.jpg"
            alt="Interior del restaurante"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            Bienvenidos a Le Gourmet Exquisit, donde la pasión por la cocina se encuentra con la tradición y la innovación. Fundado en 2010, nuestro restaurante ha sido un referente en la escena culinaria local, ofreciendo una experiencia gastronómica única que celebra la diversidad de sabores de todo el mundo.
          </p>
          <p className="text-lg text-gray-700">
            Nuestro chef ejecutivo, María Rodríguez, junto con su talentoso equipo, se esfuerza por crear platos que no solo deleiten el paladar, sino que también cuenten una historia. Utilizamos ingredientes frescos y de temporada, apoyando a los productores locales siempre que sea posible.
          </p>
        </div>
      </div>
      <div className="mt-12 grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-amber-700">Nuestra Misión</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Ofrecer una experiencia culinaria excepcional que inspire y conecte a las personas a través de la comida, mientras promovemos la sostenibilidad y el apoyo a nuestra comunidad local.
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-amber-700">Nuestros Valores</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <ul className="list-disc list-inside">
                <li>Calidad sin compromiso</li>
                <li>Innovación constante</li>
                <li>Respeto por los ingredientes</li>
                <li>Servicio excepcional</li>
              </ul>
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-amber-700">Reconocimientos</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <ul className="list-disc list-inside">
                <li>Estrella Michelin 2020</li>
                <li>Premio al Mejor Restaurante Local 2021</li>
                <li>Chef del Año 2022 - María Rodríguez</li>
              </ul>
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


