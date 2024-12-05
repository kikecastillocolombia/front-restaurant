import { ILogin, IUser } from "@/interfaces/interfaces";

// Registro de usuario (Signup)
export const postSignup = async (user: IUser) => {
  console.log("Datos enviados en la solicitud:", user);

  const response = await fetch("http://localhost:3000/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to sign up");
  }

  const data = await response.json();
  return {
    user: {
      ...user,
      accessToken: data.accessToken, // Añadir el acces token a los datos del usuario.
    },
    refreshToken: data.refreshToken,
  };
};

// Inicio de sesión (Signin)
// Función para hacer la solicitud de inicio de sesión
export const postSignin = async (user: ILogin) => {
  const response = await fetch("http://localhost:3000/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  // Verificar si la respuesta es exitosa
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to sign in");
  }

  // Obtenemos la respuesta en formato JSON
  const data = await response.json();
  
  // Verificamos si los tokens existen en la respuesta
  console.log("Datos recibidos:", data); // Esto es para asegurarte de que el `accesToken` y `refreshToken` estén presentes.

  // Si los tokens existen, se devuelven junto con los datos del usuario
  if (data.accessToken && data.refreshToken) {
    return {
      user: {
        uuid: data.user.uuid,
        rol: data.user.rol,
        banned: data.user.banned,
        isActive: data.user.isActive,
        username: data.user.username,
        email: data.user.email,
        fullname: data.user.fullname,
        password: "",  
      },
      accessToken: data.accessToken, 
      refreshToken: data.refreshToken,  
    };
  } else {
    throw new Error("Tokens de acceso o de refresco no recibidos.");
  }
};





// Función para realizar una solicitud protegida que requiere autenticación
// Función para realizar una solicitud protegida que requiere autenticación
export const fetchWithAuth = async (
  url: string,
  method: string,
  accessToken: string, // Asegúrate de pasar el accesToken aquí
  body: any = null
) => {
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`, // Aquí usamos el accesToken
    },
    body: body ? JSON.stringify(body) : null,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Request failed");
  }

  return response.json();
};

