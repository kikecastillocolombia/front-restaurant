// components/UserListModal.tsx
import React from "react";
import { IReturnedUserInfo, IRol } from "@/interfaces/interfaces";
import Modal from "./modal";

interface UserListModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: IReturnedUserInfo[];
  error: string | null;
}

const UserListModal: React.FC<UserListModalProps> = ({ isOpen, onClose, users, error }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Usuarios">
    {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
    <div className="overflow-y-auto max-h-96 mt-4">
      {users.length > 0 ? (
        <ul className="grid grid-cols-1 gap-4">
          {users.map((user: IReturnedUserInfo) => (
            <li
              key={user.uuid}
              className="p-4 border border-gray-300 rounded-md shadow-sm bg-white"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-bold text-gray-700">Nombre Completo:</p>
                  <p className="text-gray-600">{user.fullname}</p>
                </div>
                <div>
                  <p className="font-bold text-gray-700">Nombre de Usuario:</p>
                  <p className="text-gray-600">{user.username}</p>
                </div>
                <div>
                  <p className="font-bold text-gray-700">Correo Electrónico:</p>
                  <p className="text-gray-600">{user.email}</p>
                </div>
                <div>
                  <p className="font-bold text-gray-700">Rol:</p>
                  <p className="text-gray-600">{user.rol}</p>
                </div>
                <div>
                  <p className="font-bold text-gray-700">Estado de Baneo:</p>
                  <p
                    className={`${
                      user.banned ? "text-red-500" : "text-green-500"
                    } font-semibold`}
                  >
                    {user.banned ? "Baneado" : "No baneado"}
                  </p>
                </div>
                <div>
                  <p className="font-bold text-gray-700">Estado:</p>
                  <p
                    className={`${
                      user.isActive ? "text-green-500" : "text-red-500"
                    } font-semibold`}
                  >
                    {user.isActive ? "Activo" : "Inactivo"}
                  </p>
                  
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay usuarios disponibles.</p>
      )}
    </div>
  </Modal>
);

export default UserListModal;
