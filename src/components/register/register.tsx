"use client";  // Asegura que este componente sea un Client Component

import { useState } from 'react';
import { useDispatch } from 'react-redux';  // Importa useDispatch
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignUpButton } from '@clerk/nextjs';
import { postSignup } from '@/lib/fetchUser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginRequest, loginSuccess, loginFailure } from '@/redux/slices/authSlice';  // Acciones de Redux
import { IUser } from '@/interfaces/interfaces';

export default function RegisterComponent() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    dispatch(loginRequest());  // Dispatch para iniciar el proceso de carga

    const form = event.target as HTMLFormElement;
    const fullname = (form.elements.namedItem("fullname") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const repeatpassword = (form.elements.namedItem("repeatpassword") as HTMLInputElement).value;
    const username = (form.elements.namedItem("username") as HTMLInputElement).value;

    // Validar contraseñas
    if (!password || !repeatpassword) {
      const message = "Ambos campos de contraseña son obligatorios.";
      toast.error(message);
      setIsLoading(false);
      return;
    }

    if (password !== repeatpassword) {
      const message = "Las contraseñas no coinciden.";
      toast.error(message);
      setIsLoading(false);
      return;
    }

    try {
      const user = { fullname, email, password, repeatpassword, username };
      const data = await postSignup(user); // Suponiendo que postSignup ya maneja la solicitud.
    
      const { accessToken, refreshToken } = data; // Extrae los tokens.
      const newUser: IUser = { ...data.user, accessToken, refreshToken };
    
      console.log('Usuario registrado con éxito:', newUser);
    
      // Dispatch para actualizar el estado de autenticación con tokens.
      dispatch(loginSuccess({ user: newUser, token: accessToken }));
    
      // Mostrar notificación de éxito.
      toast.success("Usuario registrado con éxito!");
    
      // Redirigir al inicio de sesión después de 4 segundos.
      setTimeout(() => {
        router.push('/sign-in');
      }, 4000);
    } catch (err) {
      console.error('Error al registrarse:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido.';
      toast.error(errorMessage);
      dispatch(loginFailure(errorMessage));
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }    

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4 bg-[url('/fondo.webp')] bg-cover bg-center">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-full max-w-4xl flex bg-white/80 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden">
        <div className="w-full lg:w-1/2 p-8">
          <h1 className="text-3xl font-bold text-amber-800 mb-6">Registrarse</h1>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullname">Nombre Completo</Label>
              <Input id="fullname" placeholder="Juan Pérez" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input id="email" placeholder="correo@ejemplo.com" required type="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Nombre de usuario</Label>
              <Input id="username" placeholder="Juansito1" required type="text" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" required type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="repeatpassword">Confirmar Contraseña</Label>
              <Input id="repeatpassword" required type="password" />
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white" type="submit" disabled={isLoading}>
              {isLoading ? "Registrando..." : "Registrarse"}
            </Button>
          </form>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-amber-300" />
              </div>
            </div>
            <SignUpButton
              mode="modal"
              className="w-full mt-4 text-amber-800 border-amber-300 hover:bg-amber-600 hover:text-white"
            >
              Regístrate con Clerk
            </SignUpButton>
          </div>
        </div>
      </div>
    </div>
  );
}
