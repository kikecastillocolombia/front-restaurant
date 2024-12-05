import React, { useState } from "react";
import { IRol, IReturnedUserInfo } from "@/interfaces/interfaces";

interface ChangeRolModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedUser: IReturnedUserInfo | null;  
  onRoleChange: (userIdentifier: { uuid?: string }, newRole: IRol) => Promise<void>;
  error: string | null;
  successMessage: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setSuccessMessage: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedUser: React.Dispatch<React.SetStateAction<IReturnedUserInfo | null>>; 
}

export const ChangeRolModal: React.FC<ChangeRolModalProps> = ({
  isOpen,
  onClose,
  selectedUser,  
  onRoleChange,
  error,
  successMessage,
  setError,
  setSuccessMessage,
  setSelectedUser,
}) => {
  const [newRole, setNewRole] = useState<IRol | null>(null);
  const [searchQuery, setSearchQuery] = useState("");  // Para buscar por username/email/uuid

  const handleSubmit = () => {
    if (selectedUser && newRole) {
      onRoleChange({ uuid: selectedUser.uuid }, newRole);  // Cambiar el rol del único usuario seleccionado
      setSuccessMessage(`Rol de ${selectedUser.username} cambiado a ${newRole}`);
      onClose();  // Cerrar el modal después de realizar el cambio
    } else {
      setError("Por favor selecciona un usuario y un rol válido.");
    }
  };

  const handleUserSelect = (user: IReturnedUserInfo) => {
    setSelectedUser(user);  // Establecer el usuario seleccionado
    setSearchQuery("");  // Limpiar la búsqueda cuando se selecciona un usuario
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96">
        <h2 className="text-xl font-semibold text-center mb-4">Cambiar Rol</h2>

        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        {successMessage && <p className="text-green-500 text-center mb-2">{successMessage}</p>}

        {/* Sección de búsqueda */}
        <div className="mb-4">
          <label className="block text-sm mb-2">Buscar Usuario</label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por UUID, Email o Username"
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          {selectedUser && (
            <ul className="mt-2">
              <li
                className="cursor-pointer hover:bg-gray-200 p-2"
                onClick={() => handleUserSelect(selectedUser)}  // Aquí seleccionamos un solo usuario
              >
                {selectedUser.username || selectedUser.email || "Usuario"}
              </li>
            </ul>
          )}
        </div>

        {/* Mostrar el usuario seleccionado */}
        <p className="mb-4 text-sm">
          Cambiando rol para <strong>{selectedUser ? selectedUser.username : "Ningún usuario seleccionado"}</strong>
        </p>

        {/* Selección de rol */}
        <div className="mb-4">
          <select
            value={newRole || ""}
            onChange={(e) => setNewRole(e.target.value as IRol)}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Seleccionar Rol</option>
            <option value="user">User</option>
            <option value="camarero">Camarero</option>
            <option value="cheff">Cheff</option>
          </select>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-between gap-4">
          <button
            onClick={handleSubmit}
            className="w-full bg-teal-600 text-white py-3 rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            Cambiar Rol
          </button>

          <button
            onClick={onClose}
            className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeRolModal;
