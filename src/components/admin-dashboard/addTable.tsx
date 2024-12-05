export const handleAddTable = async (
  tableNumberInput: string,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setSuccessMessage: React.Dispatch<React.SetStateAction<string | null>>,
  setTableNumberInput: React.Dispatch<React.SetStateAction<string>>,
  token: string 
) => {
  setError(null);
  setSuccessMessage(null);

  try {
    const tableNumber: number = parseInt(tableNumberInput, 10);

    if (isNaN(tableNumber)) {
      throw new Error("El número de mesa debe ser un número entero.");
    }

    
    const response = await fetch("http://localhost:3001/table/addTable", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
      body: JSON.stringify({
        tableNumber,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al agregar la mesa.");
    }

    setSuccessMessage("Mesa agregada con éxito.");
    setTableNumberInput("");
  } catch (error: any) {
    setError(error.message || "Ocurrió un error al agregar la mesa.");
  }
};
