"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDispatch, useSelector } from "react-redux";
import { setTables, changeTableStatus } from "../../redux/slices/tableSlice";
import { RootState } from "@/redux/store/store";
import toast from "react-hot-toast";
import { ITableState } from "@/interfaces/interfaces";



type Table = {
  id: string;
  tableNumber: number;
  x: number;
  y: number;
  status: ITableState;
};

type OrderItem = {
  dish: string;
  quantity: number;
};

type Order = {
  id: string;
  table: string;
  items: OrderItem[];
  notes: string;
  status: "pendiente" | "en_proceso" | "completado";
};

const fetchTables = async () => {
  const response = await fetch(`http://localhost:3000/table/all`);
  if (!response.ok) {
    throw new Error("No se pudo obtener las mesas");
  }
  return response.json();
};

const fetchOrdersByStatus = async (status: "pendiente" | "en_proceso" | "completado") => {
  const response = await fetch(`http://localhost:3000/pedido/estado/${status.toLowerCase()}`);
  if (!response.ok) {
    throw new Error("No se pudieron obtener los pedidos");
  }
  return response.json();
};

const assignTablePositions = (tables: Table[], containerWidth: number) => {
  const numColumns = Math.floor(containerWidth / 70);
  return tables.map((table, index) => {
    const col = index % numColumns;
    const row = Math.floor(index / numColumns);
    return {
      ...table,
      x: col * 70,
      y: row * 70,
    };
  });
};

export default function WaiterOrders() {
  const dispatch = useDispatch();
  const tables = useSelector((state: RootState) => state.tables.tables || []);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedTableNumber, setSelectedTableNumber] = useState<number | null>(null);
  const [newStatus, setNewStatus] = useState<ITableState>(ITableState.free);
  const [activeTab, setActiveTab] = useState<"pendiente" | "en_proceso" | "completado">("pendiente");
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const getTableColor = useMemo(
    () => (status: ITableState) => {
      switch (status) {
        case "free":
          return "bg-green-500 hover:bg-green-600";
        case "reserved":
          return "bg-yellow-500 hover:bg-yellow-600";
        case "occupied":
          return "bg-red-500 hover:bg-red-600";
        default:
          return "bg-gray-500 hover:bg-gray-600";
      }
    },
    []
  );

  useEffect(() => {
    const containerWidth = containerRef.current?.offsetWidth || 500;

    fetchTables()
      .then((data) => {
        if (Array.isArray(data)) {
          const tablesWithPositions = assignTablePositions(data, containerWidth);
          dispatch(setTables(tablesWithPositions));
        } else {
          toast.error("Formato inesperado al cargar mesas");
        }
      })
      .catch((error) => console.error("Error al cargar mesas:", error));
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    fetchOrdersByStatus(activeTab)
      .then((data) => {
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          toast.error("Formato inesperado al cargar pedidos");
        }
      })
      .catch(() => toast.error("Error al conectar con el servidor"))
      .finally(() => setIsLoading(false));
  }, [activeTab]);

  const handleChangeTableStatus = () => {
    if (selectedTableNumber === null) return;

    dispatch(changeTableStatus({ tableNumber: selectedTableNumber, newStatus }));

    setSelectedTableNumber(null);
    setNewStatus(ITableState.free);
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        ¡Bienvenido al sistema de mesas!
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Estado de las Mesas */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Estado de las Mesas</h2>
          <div ref={containerRef} className="relative bg-amber-100 rounded-lg p-4" style={{ height: "500px" }}>
            {tables.map((table) => (
              <Button
                key={table.id}
                className={`absolute h-12 w-12 ${getTableColor(table.status)}`}
                style={{
                  top: `${table.y}px`,
                  left: `${table.x}px`,
                }}
              >
                {table.tableNumber}
              </Button>
            ))}
          </div>
        </div>

        {/* Pedidos */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Pedidos</h2>
          <div className="flex space-x-4 mb-4">
            {["Pendiente", "En proceso", "Completado"].map((status) => (
              <Button
                key={status}
                className={`px-4 py-2 ${activeTab === status ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                onClick={() => setActiveTab(status as "pendiente" | "en_proceso" | "completado")}
              >
                {status}
              </Button>
            ))}
          </div>
          <ScrollArea className="h-80 border rounded-lg p-4">
            {isLoading ? (
              <p>Cargando pedidos...</p>
            ) : orders.length > 0 ? (
              orders.map((order) => (
                <Card key={order.id} className="mb-4">
                  <CardHeader>
                    <CardTitle>Mesa {order.table}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul>
                      {order.items.map((item, index) => (
                        <li key={index}>
                          {item.quantity}x {item.dish}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p>No hay pedidos en este estado.</p>
            )}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
