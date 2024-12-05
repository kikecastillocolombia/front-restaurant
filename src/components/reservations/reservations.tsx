import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import {
  addReservation,
  fetchReservationsRequest,
} from "@/redux/slices/reservationsSlice";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export interface IReservation {
  reservIdentification: string;
  day: Date;
  startTime: string;
  tableNumber: string;
  guests: number;
  status: string;
}

export default function ReservationSystem() {
  const dispatch = useDispatch();

  const [currentReservation, setCurrentReservation] = useState<IReservation>({
    reservIdentification: "",
    day: new Date(),
    startTime: "",
    tableNumber: "1",
    guests: 1,
    status: "pending",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [reservIdentification, setReservationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPayPal, setShowPayPal] = useState(false); 
  const [totalAmount, setTotalAmount] = useState("5.00");

  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Por favor, inicia sesión para realizar una reserva.");
    }
  }, [isAuthenticated]);

  const handleChange = (name: keyof IReservation, value: string) => {
    if (name === "guests" || name === "tableNumber") {
      const parsedValue = parseInt(value);
      if (!isNaN(parsedValue)) {
        setCurrentReservation((prev) => ({ ...prev, [name]: parsedValue }));
      }
    } else if (name === "day") {
      const newDate = new Date(value);
      setCurrentReservation((prev) => ({
        ...prev,
        day: isNaN(newDate.getTime()) ? new Date() : newDate,
      }));
    } else if (name === "startTime") {
      setCurrentReservation((prev) => ({
        ...prev,
        startTime: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("Usuario no autenticado, por favor inicie sesión.");
      return;
    }

    const { startTime, day, guests } = currentReservation;

    const hour = new Date(`1970-01-01T${startTime}:00Z`).getHours();
    if (hour < 13 || hour > 23) {
      toast.error("La hora debe estar entre las 13:00 y las 23:00");
      return;
    }

    if (!day) {
      toast.error("Por favor, selecciona una fecha válida.");
      return;
    }

    if (guests <= 0) {
      toast.error("La cantidad de comensales no puede ser 0.");
      return;
    }

    if (guests > 100) {
      toast.error("La cantidad máxima de comensales es de 100 personas.");
      return;
    }

    const reservationData = {
      day: day.toISOString(),
      startTime: new Date(`1970-01-01T${startTime}:00Z`).toISOString(),
      tableNumber: currentReservation.tableNumber,
      guests,
    };

    setIsLoading(true);

    try {
      dispatch(fetchReservationsRequest());

      const response = await fetch(`http://localhost:3000/reservations/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
        body: JSON.stringify(reservationData),
      });

      if (!response.ok) throw new Error("Error al crear la reserva");

      const newReservation = await response.json();
      dispatch(addReservation(newReservation));

      setCurrentReservation({
        reservIdentification: "",
        day: new Date(),
        startTime: "",
        tableNumber: "1",
        guests: 1,
        status: "pending",
      });

      setReservationId(newReservation.reservIdentification);
      setShowPayPal(true);

      toast.success("Reserva realizada con éxito, por favor realiza el pago para confirmar tu reserva y ver detalles.  ");
    } catch {
      toast.error("Hubo un error al realizar la reserva");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Reservas</h1>
      <div className="grid gap-6 font-poppins text-primary md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{isEditing ? "Editar Reserva" : "Reserva tu mesa"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="tableNumber" className="block text-sm text-gray-700">
                  Número de mesa
                </label>
                <Input
                  type="number"
                  id="tableNumber"
                  value={currentReservation.tableNumber}
                  onChange={(e) => handleChange("tableNumber", e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="day" className="block text-sm text-gray-700">
                  Fecha
                </label>
                <Input
                  type="date"
                  id="day"
                  name="day"
                  value={
                    currentReservation.day
                      ? currentReservation.day.toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(e) => handleChange("day", e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="startTime" className="block text-sm text-gray-700">
                  Hora
                </label>
                <Input
                  type="time"
                  id="startTime"
                  value={currentReservation.startTime}
                  onChange={(e) => handleChange("startTime", e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="guests" className="block text-sm text-gray-700">
                  Número de personas
                </label>
                <Select
                  value={currentReservation.guests.toString()}
                  onValueChange={(value) => handleChange("guests", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(100).keys()].map((num) => (
                      <SelectItem key={num + 1} value={(num + 1).toString()}>
                        {num + 1} persona{num > 0 && "s"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="w-full bg-secondary text-amber-100 hover:bg-primary"
                disabled={isLoading}
              >
                {isEditing ? "Actualizar Reserva" : "Reservar"}
              </Button>
            </form>

            {showPayPal && (
              <PayPalScriptProvider
                options={{
                  clientId: "AeTVy8fpYKvZ_q372W1dasinGPVVFwUAQ5Lfh_gFd73-G6218PUgYkWTDE6NPY78_pNh4XhEVXf5ieFv",
                  currency: "USD",
                }}
              >
                <PayPalButtons
                  style={{ layout: "vertical" }}
                  createOrder={(data, actions) => {
                    if (!actions.order) {
                      toast.error("Error al inicializar el pedido.");
                      return Promise.reject("actions.order es undefined");
                    }

                    return actions.order.create({
                      intent: "CAPTURE",
                      purchase_units: [
                        {
                          amount: {
                            currency_code: "USD",
                            value: totalAmount, 
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    if (!actions.order) {
                      toast.error("Error al procesar el pago.");
                      return;
                    }

                    return actions.order.capture().then((details) => {
                      toast.success("¡Pago realizado con éxito!");
                      console.log(details)
                      setShowPayPal(false); 
                    });
                  }}
                />
              </PayPalScriptProvider>
            )}
          </CardContent>
        </Card>
      </div>
      <ToastContainer />
    </div>
  );
}
