import { XCircleIcon } from 'lucide-react'
import Link from 'next/link'

export default function CancelComponent() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md text-center">
      <XCircleIcon className="mx-auto h-16 w-16 text-red-500 mb-4" />
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Pago Cancelado</h1>
      <p className="text-gray-600 mb-4">
        Tu pago ha sido cancelado. Si tuviste algún problema, por favor intenta de nuevo.
      </p>
      <Link 
        href="/"
        className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        Volver al inicio
      </Link>
    </div>
  )
}