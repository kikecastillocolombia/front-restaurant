"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Utensils, UserPlus, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

import { logout } from "@/redux/slices/authSlice"; // Asegúrate de importar la acción logout
import { RootState } from "@/redux/store/store";

export default function Navbar() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  // Agregar log para verificar el estado de isAuthenticated y user
  console.log('Estado de autenticación:', isAuthenticated);
  console.log('Usuario:', user);

  const handleLogout = () => {
    console.log('Cerrando sesión...');
    dispatch(logout());
  };

  return (
    <nav className="bg-secondary text-amber-100 shadow-lg">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="text-xl font-bold">
          Le Gourmet Exquisit
        </Link>
        <div className="flex items-center space-x-4">
          {/* Enlaces visibles para todos */}
          <Link href="/reservations" className="hover:text-primary transition-colors">
            Reservas
          </Link>
          <Link href="/Menu" className="hover:text-primary transition-colors">
            Menú
          </Link>
          <Link href="/WaiterOrder" className="hover:text-primary transition-colors">
            Ordenar
          </Link>
          <Link href="/Chef-order" className="hover:text-primary transition-colors">
            Pedidos
          </Link>
          <Link href="/Admin-dashboard" className="hover:text-primary transition-colors">
            Dashboard
          </Link>

          {/* Si el usuario está autenticado */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button className="text-amber-100 font-medium hover:text-primary">
                Hola, {user.username || user.fullname || "Usuario"}
              </button>
              {/* Botón de Cerrar sesión */}
              <Button
                variant="ghost"
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                onClick={handleLogout}
              >
                Cerrar sesión
              </Button>
            </div>
          ) : (
            // Si no está autenticado, muestra los botones para registrarse e iniciar sesión
            <>
              <Button asChild variant="ghost" className="text-primary hover:text-white bg-white hover:bg-primary">
                <Link href="/sign-up">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Registrarse
                </Link>
              </Button>
              <Button asChild variant="ghost" className="text-amber-100 hover:text-white hover:bg-primary">
                <Link href="/sign-in">
                  <LogIn className="mr-2 h-4 w-4" />
                  Iniciar Sesión
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
