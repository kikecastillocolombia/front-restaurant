"use client"

import UserReservations from "@/components/mis-reservas/misReservas"

import ReservationSystem from "@/components/reservations/reservations"





export default function ReservationsPage() {
  return (
    <div className="  bg-amber-50">
      <ReservationSystem/>
      <UserReservations/>
      
    </div>
  )
}
