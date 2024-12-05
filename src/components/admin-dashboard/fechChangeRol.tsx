import { IRol } from "@/interfaces/interfaces";

export const handleChangeRol = async (
  userIdentifier: { username?: string; email?: string; uuid?: string },
  newRole: IRol,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setSuccessMessage: React.Dispatch<React.SetStateAction<string | null>>
) => {
  setError(null);
  setSuccessMessage(null);

  
  if (!userIdentifier || (!userIdentifier.username && !userIdentifier.email && !userIdentifier.uuid)) {
    setError("Se debe proporcionar un identificador válido.");
    return;
  }

  try {
    const response = await fetch("http://localhost:3001/user/changeRol", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: userIdentifier, 
        newRole: newRole,          
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al cambiar el rol.");
    }

    const data = await response.json();
    setSuccessMessage(data.message || "Rol cambiado exitosamente.");
  } catch (error: any) {
    setError(error.message || "Ocurrió un error inesperado.");
  }
};
