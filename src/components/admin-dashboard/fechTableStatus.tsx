import { ITableState, ITable } from "@/interfaces/interfaces";


  

export const fetchTableStatus = async (
  day: string,
  startTime: string,
  setTables: React.Dispatch<React.SetStateAction<ITable[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  setLoading(true);
  setError(null);

  try {
      const response = await fetch("http://localhost:3001/table/tables-status", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ day, startTime }),
      });

      if (!response.ok) {
          throw new Error("Error al obtener mesas");
      }

      const data = await response.json();

      const mappedTables: ITable[] = [
          ...data.free.map((table: any) => ({ ...table, status: "free" })),
          ...data.reserved.map((table: any) => ({ ...table, status: "reserve" })),
          ...data.occupied.map((table: any) => ({ ...table, status: "occupied" })),
      ];
      console.log("Llamando a fetchTableStatus con:", { day, startTime });
      setTables(mappedTables);
  } catch (error) {
      setError("Failed to load table statuses.");
  } finally {
      setLoading(false);
  }
};
