"use client"
import { VirtualAssistant } from "@/components/asistenteVirtual/asistente"
import ChefsSectionComponent from "@/components/nuestros-chefs/nuestros-chefs"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-amber-50">
   
      <div
        className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('https://res.cloudinary.com/dcxlhj8h3/image/upload/v1731939110/pexels-pixabay-260922_unrn30.jpg')" }} 
      >
        <div
          className="absolute inset-0 bg-cover bg-center filter brightness-80 blur-[4px]"
          style={{
            /* backgroundImage: "url('/images/mesa.jpg')" */
          }}
        ></div>

        <div className="absolute inset-0 bg-black opacity-70"></div>

        <div className="container mx-auto px-4 flex items-center justify-between relative z-10">
          <div className="max-w-xl">
            <h1 className="text-5xl md:text-7xl font-bold text-amber-100 mb-6">
              Sabores que Cuentan Historias
            </h1>
            <p className="text-xl text-amber-100 mb-8">
              Descubre una experiencia culinaria única donde cada plato es una obra maestra creada con pasión y los mejores ingredientes.
            </p>
            <Button className="bg-secondary hover:bg-primary text-amber-100 px-8 py-6 text-lg rounded-full">
            <Link href="/reservations">
              Reserva Ahora
            </Link>
            </Button>
          </div>

      
          <div className="hidden md:block relative">
            <div className="w-[350px] h-[350px] rounded-full bg-amber-500 shadow-2xl overflow-hidden">
              <div className="animate-spin-slow w-full h-full flex items-center justify-center">
                <Image
                  src="https://res.cloudinary.com/dcxlhj8h3/image/upload/v1731679400/platillo-rotativo_aeihxi.webp"
                  alt="Plato destacado"
                  width={600}
                  height={450}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
            </div>


            <div className="absolute -top-4 -left-4 w-24 h-24 bg-amber-200 rounded-full -z-10" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary rounded-full -z-10" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-4xl font-bold text-secondary text-center mb-8">
          Platos Destacados
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image src="https://res.cloudinary.com/dcxlhj8h3/image/upload/v1733102600/pexels-valeriya-28701169_cj8ctn.jpg" alt="Plato destacado 1" width={300} height={200} className="w-full" />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-amber-900 mb-2">Ramen</h3>
              <p className="text-gray-600">Una deliciosa creación de nuestro chef que incluye sopa japonesa con fideos, cerdo y huevo</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image src="https://res.cloudinary.com/dcxlhj8h3/image/upload/v1733102330/pexels-nano-erdozain-120534369-28503601_s1btl7.jpg" alt="Plato destacado 2" width={300} height={195} className="w-full" />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-amber-900 mb-2">Paella</h3>
              <p className="text-gray-600">Sabores únicos que te sorprenderán de arroz con mariscos y azafrán</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image src="https://res.cloudinary.com/dcxlhj8h3/image/upload/v1733102444/pexels-cristian-rojas-8279981_iwrajc.jpg" alt="Plato destacado 3" width={300} height={200} className="w-full" />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-amber-900 mb-2">Asado argentino</h3>
              <p className="text-gray-600">Una experiencia gastronómica de sabor argenta,Carne de res a la parrilla.</p>
            </div>
          </div>
        </div>
      </div>


        <section className="py-20 bg-amber-100">
       <ChefsSectionComponent/>
      </section>
      <section className="py-20 bg-amber-100">
       <VirtualAssistant/>
      </section>

      <style jsx global>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  )
}
