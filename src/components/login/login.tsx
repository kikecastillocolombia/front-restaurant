// components/LoginComponent.tsx
"use client"; 

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { postSignin } from '@/lib/fetchUser';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginRequest, loginSuccess, loginFailure } from '@/redux/slices/authSlice';
import { IUser } from '@/interfaces/interfaces';  // Importamos IUser
// 1 cZ
export default function LoginComponent() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    dispatch(loginRequest());

    const form = event.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    try {
      const data = await postSignin({ email, password });

      // Asegúrate de que `data.user` coincida con la estructura de `IUser`
      const user: IUser = {
        uuid: data.user.uuid, // Si `id` es parte de `user`
        username: data.user.username,
        email: data.user.email,
        banned: data.user.banned,
        rol: data.user.rol,
        isActive: data.user.isActive,
        fullname: data.user.fullname, // Asegúrate de que `fullname` esté en la respuesta
        password: "", // No se debe almacenar la contraseña en el frontend
        accessToken: data.accessToken,
        refreshToken: data.refreshToken, // El token de refresco
      };

      // Guardamos el usuario y el token en Redux
      dispatch(loginSuccess({ user, token: data.accessToken }));

      // Mostrar notificación de éxito
      toast.success("Inicio de sesión exitoso!");

      // Redirigir a la página principal después de 4 segundos
      setTimeout(() => {
        router.push('/');
      }, 4000);
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
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
          <h1 className="text-3xl font-bold text-amber-800 mb-6">Iniciar sesión</h1>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input id="email" placeholder="correo@ejemplo.com" required type="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" required type="password" />
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white" type="submit" disabled={isLoading}>
              {isLoading ? "Iniciando..." : "Iniciar sesión"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
