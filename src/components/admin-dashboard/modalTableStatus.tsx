    import React, { useState } from "react";
    import { ITable } from "@/interfaces/interfaces"; 

    interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (day: string, startTime: string) => void;
    tables: ITable[]; 
    }

    const TimeModal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, tables }) => {
    const [day, setDay] = useState("");
    const [startTime, setStartTime] = useState("");

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (!day || !startTime) {
        alert("Por favor completa todos los campos.");
        return;
        }
        console.log("Datos enviados a onSubmit:", { day, startTime });
        onSubmit(day, startTime);
        
    };

    // Función para determinar el color del estado de la mesa
    const getTableColor = (status: string) => {
        switch (status) {
        case "free":
            return "bg-green-500";
        case "reserve":
            return "bg-yellow-500";
        case "occupied":
            return "bg-red-500";
        default:
            return "bg-gray-500";
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">Seleccionar Fecha y Hora</h2>
            <button className="text-gray-500 hover:text-gray-800">
                ×
            </button>
            </div>

            {/* Formulario para seleccionar fecha y hora */}
            <div className="space-y-4 mt-4">
            <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Fecha
                </label>
                <input
                id="date"
                type="date"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                />
            </div>

            <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                Hora
                </label>
                <select
                id="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                >
                <option value="">Seleccionar Hora</option>
                {[...Array(14)].map((_, i) => {
                    const hour = 11 + i;
                    return (
                    <option key={hour} value={`${hour}:00`}>
                        {`${hour}:00`}
                    </option>
                    );
                })}
                </select>
            </div>
            </div>

            {/* Mostrar el estado de las mesas en una cuadrícula */}
            <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Estado de las Mesas</h3>
            <div className="grid grid-cols-4 gap-2">
                {tables.map((table) => (
                <div
                    key={table.uuid}
                    className={`table w-10 h-10 flex justify-center items-center rounded-md ${getTableColor(
                    table.status
                    )}`}
                >
                    <div className="text-white text-xs">{table.tableNumber}</div>
                </div>
                ))}
            </div>
            </div>

            {/* Botones de acción */}
            <div className="flex justify-end mt-6 space-x-4">
            <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
                Cancelar
            </button>
            <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
                Consultar
            </button>
            </div>
        </div>
        </div>
    );
    };

    export default TimeModal;
