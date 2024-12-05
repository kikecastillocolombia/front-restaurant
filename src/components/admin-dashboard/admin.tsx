"use client";
import React, { useState, useEffect } from "react";
import { IReturnedUserInfo, IRol, ITable } from "@/interfaces/interfaces";
import { handleGetUsers } from "./getUsers";
import { handleChangeRol } from "./fechChangeRol";
import { banUser } from "./banUser";
import BanUserModal from "./banUserModal";
import UserListModal from "./userListModal";
import TableModal from "./modalTables";
import { fetchTableStatus } from "../admin-dashboard/fechTableStatus";
import ChangeRolModal from "./modalChangeRol";
import TimeModal from "./modalTableStatus";

const AdminDashboard = () => {
  const [tableNumberInput, setTableNumberInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [users, setUsers] = useState<IReturnedUserInfo[]>([]);
  const [tables, setTables] = useState<ITable[]>([]);
  const [loading, setLoading] = useState(false);

  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [isUsersModalOpen, setIsUsersModalOpen] = useState(false);
  const [isBanModalOpen, setIsBanModalOpen] = useState(false);
  const [isTableStatusModalOpen, setIsTableStatusModalOpen] = useState(false);

  const [isChangeRolModalOpen, setIsChangeRolModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IReturnedUserInfo | null>(null);

  // Obtener el token de autenticación
  const authToken = localStorage.getItem("authToken") || "";

  const handleAddTableFromModal = () => {
    if (!authToken) {
      setError("No se encontró el token de autenticación. Inicia sesión nuevamente.");
      return;
    }
  };

  const handleBanUser = (identifier: string, token: string) => {
    banUser(identifier, token, setError, setSuccessMessage);
  };

  const fetchUsers = async () => {
    if (!authToken) {
      setError("No se encontró el token de autenticación.");
      return;
    }
    console.log("Cargando usuarios...");
    await handleGetUsers(setError, setSuccessMessage, setUsers, authToken);
  };

  const handleFetchTables = (day: string, startTime: string) => {
    fetchTableStatus(day, startTime, setTables, setLoading, setError);
  };

  useEffect(() => {
    if (isUsersModalOpen) {
      fetchUsers();
    }
  }, [isUsersModalOpen]);

  const openChangeRolModal = () => {
    console.log("Abriendo modal de cambio de rol");
    setSelectedUser(null);
    setIsChangeRolModalOpen(true);
  };

  const closeChangeRolModal = () => {
    console.log("Cerrando modal de cambio de rol");
    setIsChangeRolModalOpen(false);
    setSelectedUser(null);
  };

  const handleRoleChange = async (userIdentifier: { uuid?: string }, newRole: IRol) => {
    console.log("Dentro de handleRoleChange");

    if (!selectedUser) {
      console.log("Error: No hay usuario seleccionado.");
      setError("Por favor, selecciona un usuario antes de cambiar el rol.");
      return;
    }

    try {
      await handleChangeRol({ uuid: selectedUser.uuid }, newRole, setError, setSuccessMessage);
      console.log("Rol cambiado exitosamente.");
      closeChangeRolModal();
      fetchUsers();
    } catch (error) {
      console.error("Error al cambiar el rol:", error);
      setError("Hubo un error al cambiar el rol.");
    }
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-xl font-bold">Admin Dashboard</h1>

      {/* Botones de acción */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setIsTableStatusModalOpen(true)}
          className="bg-teal-800 text-amber-100 shadow-lg px-2 py-3 rounded-lg border0 border-teal-800 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-300"
        >
          Ver Estado de Mesas
        </button>
        <button
          onClick={() => setIsBanModalOpen(true)}
          className="bg-teal-800 text-amber-100 shadow-lg px-2 py-3 rounded-lg border0 border-teal-800 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-300"
        >
          Banear Usuario
        </button>
        <button
          onClick={() => setIsTableModalOpen(true)}
          className="bg-teal-800 text-amber-100 shadow-lg px-2 py-3 rounded-lg border0 border-teal-800 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-300"
        >
          Agregar Mesa
        </button>
        <button
          onClick={() => setIsUsersModalOpen(true)}
          className="bg-teal-800 text-amber-100 shadow-lg px-2 py-3 rounded-lg border0 border-teal-800 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-300"
        >
          Ver Usuarios
        </button>
        <button
          onClick={openChangeRolModal}
          className="bg-teal-800 text-amber-100 shadow-lg px-2 py-3 rounded-lg border0 border-teal-800 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-300"
        >
          Cambiar Rol de Usuario
        </button>
      </div>

      {/* Mensajes de error y éxito */}
      {error && <div className="text-red-500">{error}</div>}
      {successMessage && <div className="text-green-500">{successMessage}</div>}

      {/* Modales */}
      <TableModal
        isOpen={isTableModalOpen}
        onClose={() => setIsTableModalOpen(false)}
        tableNumberInput={tableNumberInput}
        setTableNumberInput={setTableNumberInput}
        error={error}
        successMessage={successMessage}
        onAddTable={handleAddTableFromModal}
        token={authToken}
      />

      <UserListModal
        isOpen={isUsersModalOpen}
        onClose={() => setIsUsersModalOpen(false)}
        users={users}
        error={error}
      />

      <BanUserModal
        isOpen={isBanModalOpen}
        onClose={() => setIsBanModalOpen(false)}
        banUser={handleBanUser}
        error={error}
        successMessage={successMessage}
        token={authToken}
      />

      <TimeModal
        isOpen={isTableStatusModalOpen}
        onClose={() => setIsTableStatusModalOpen(false)}
        onSubmit={handleFetchTables}
        tables={tables}
      />

      {/* Modal de Cambio de Rol */}
      <ChangeRolModal
        isOpen={isChangeRolModalOpen}
        onClose={closeChangeRolModal}
        onRoleChange={handleRoleChange}
        error={error}
        successMessage={successMessage}
        setError={setError}
        setSuccessMessage={setSuccessMessage}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
    </div>
  );
};

export default AdminDashboard;
