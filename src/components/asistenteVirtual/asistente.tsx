'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { MessageCircle, Send } from 'lucide-react'
import Link from 'next/link'

export function VirtualAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState('inicio')

  const handleClose = () => {
    setIsOpen(false)
    setStep('inicio')
  }

  return (
    <>
      <Button
        className="fixed bottom-4 right-4 rounded-full p-4 bg-amber-600 hover:bg-amber-700 text-white shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className="h-6 w-6" />
        <span className="sr-only">Abrir asistente virtual</span>
      </Button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-amber bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full sm:max-w-[425px]">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Asistente Virtual de Le Gourmet Exquisit</h3>
              <Button onClick={handleClose} className="text-gray-500 bg-secondary text-white hover:text-gray-700">X</Button>
            </div>
            <p className="text-sm text-gray-600">¿En qué puedo ayudarte hoy?</p>

           
            {step === 'inicio' && (
              <div className="grid gap-4 py-4 ">
                <Button onClick={() => setStep('reserva')} className='bg-secondary text-white'>Informacion sobre reserva</Button>
                <Button onClick={() => setStep('menu')} className='bg-secondary text-white'>Informacion sobre el menú</Button>
                <Button onClick={() => setStep('pregunta')} className='bg-secondary text-white'>Hacer una pregunta</Button>
              </div>
            )}
            {step === 'reserva' && <ReservaInfo onBack={() => setStep('inicio')} />}
            {step === 'menu' && <MenuInfo onBack={() => setStep('inicio')} />}
            {step === 'pregunta' && <PreguntaForm onBack={() => setStep('inicio')} />}
          </div>
        </div>
      )}
    </>
  )
}

function ReservaInfo({ onBack }: { onBack: () => void }) {
  return (
    <div className="grid gap-4 py-4">
      <h3 className="text-lg font-semibold">Información de Reservas</h3>
      <p>En Le Gourmet Exquisit, nos encanta ofrecer una experiencia culinaria única a nuestros comensales. Para hacer una reserva:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Elija la fecha y hora deseada</li>
        <li>Indique el número de comensales</li>
        <li>Seleccione un numero de mesa deseada</li>
      </ul>
      <p>Recomendamos hacer su reserva con al menos 24 horas de antelación para garantizar disponibilidad.</p>
      <div className="flex justify-between mt-4">
        <Button variant="outline" onClick={onBack}>Volver</Button>
        <Link href="/reservations" passHref>
          <Button className='bg-secondary text-white'>Hacer Reserva</Button>
        </Link>
      </div>
    </div>
  )
}

function MenuInfo({ onBack }: { onBack: () => void }) {
  return (
    <div className="grid gap-4 py-4">
      <h3 className="text-lg font-semibold">Nuestro Menú</h3>
      <p>Disfrute de nuestra selección de platos gourmet:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Hamburguesa Gourmet</li>
        <li>Pollo Tikka Masala</li>
        <li>Falafel</li>
        <li>Ceviche</li>
      </ul>
      <p className="text-sm text-gray-500">El menú puede cambiar semanalmente, por favor consulte a menudo.</p>
      <div className="flex justify-between mt-4">
        <Button variant="outline" onClick={onBack}>Volver</Button>
        <Link href="/Menu" passHref>
          <Button className='bg-secondary text-white'>Ver Menú Completo</Button>
        </Link>
      </div>
    </div>
  )
}

function PreguntaForm({ onBack }: { onBack: () => void }) {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([])
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim() === '') return

    // Add user message
    setMessages(prev => [...prev, { text: inputValue, isUser: true }])

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue)
      setMessages(prev => [...prev, { text: botResponse, isUser: false }])
    }, 1000)

    setInputValue('')
  }

  const getBotResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase()
    if (lowerQuestion.includes('horario') || lowerQuestion.includes('hora')) {
      return 'Nuestro horario es de martes a domingo, de 13:00 a 23:00.'
    } else if (lowerQuestion.includes('reserva')) {
      return 'Puede hacer una reserva llamando al 383422954 o seleccionando la opción "Hacer una reserva" en este asistente virtual.'
    } else if (lowerQuestion.includes('menu') || lowerQuestion.includes('platos')) {
      return 'Nuestro menú cambia semanalmente. Puede ver las opciones actuales seleccionando "Ver el menú" en nuestro asistente virtual.'
    } else {
      return 'Lo siento, no entiendo su pregunta. ¿Puede reformularla o elegir una de las opciones disponibles en el asistente (prueba: menu, platos, hora?'
    }
  }

  return (
    <div className="grid gap-4 py-4 h-[400px] flex flex-col">
      <div className="flex-grow overflow-y-auto mb-4">
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 ${message.isUser ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded-lg ${message.isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
              {message.text}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Escriba su pregunta aquí"
          className="flex-grow"
        />
        <Button type="submit" size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </form>
      <Button variant="outline" onClick={onBack}>Volver</Button>
    </div>
  )
}
