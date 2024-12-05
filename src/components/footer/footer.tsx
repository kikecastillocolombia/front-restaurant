"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Clock } from "lucide-react";
import { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: -34.61315, 
  lng: -58.37723, 
};

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scheduleData = [
    { day: "Lunes", hours: "14:00 - 22:00" },
    { day: "Martes", hours: "13:30 - 21:30" },
    { day: "Miércoles", hours: "15:00 - 23:00" },
    { day: "Jueves", hours: "14:30 - 22:30" },
    { day: "Viernes", hours: "13:00 - 23:00" },
    { day: "Sábado", hours: "15:30 - 23:00" },
    { day: "Domingo", hours: "14:00 - 21:00" },
  ];

  return (
    <footer className="bg-secondary text-amber-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Contáctanos</h3>
            <p>Avenida Belgrano , 766</p>
            <p>Buenos Aires, CP 1000</p>
            <p>Teléfono: (54) 383422954</p>
            <p>Email: legourmet@gmail.com</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/Menu" className="hover:text-primary">
                  Menú
                </Link>
              </li>
              <li>
                <Link href="/Reservations" className="hover:text-primary">
                  Reservas
                </Link>
              </li>
              <li>
                <Link href="/Sobre-nosotros" className="hover:text-primary">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/Contacto" className="hover:text-primary">
                  Contacto
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center space-x-2 text-amber-100 hover:text-primary"
                >
                  <Clock size={24} />
                  <span>Horario de Atención</span>
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                <Facebook size={24} />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                <Instagram size={24} />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                <Twitter size={24} />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
        </div>

        {/* Mapa con Google Maps */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Nuestra Ubicación</h3>
          <div className="h-80 w-full rounded-lg overflow-hidden">
          <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
          <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
              >
                <Marker position={center} title="¡Estamos aquí!" />
              </GoogleMap>
            </LoadScript>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p>&copy; {new Date().getFullYear()} SendFood.</p>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-secondary text-amber-100 p-6 rounded-lg max-w-md w-full relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-amber-100 hover:text-primary"
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-4">Horario de Atención</h2>
            <div className="space-y-2">
              {scheduleData.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span>{item.day}</span>
                  <span>{item.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
