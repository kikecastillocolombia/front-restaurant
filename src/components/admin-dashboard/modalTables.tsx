interface TableModalProps {
  isOpen: boolean;
  onClose: () => void;
  tableNumberInput: string;
  setTableNumberInput: React.Dispatch<React.SetStateAction<string>>;
  error: string | null;
  successMessage: string | null;
  onAddTable: (tableNumberInput: string) => void;  // Función que pasamos al modal
  token: string;  // El token de autenticación
}

const TableModal: React.FC<TableModalProps> = ({
  isOpen,
  onClose,
  tableNumberInput,
  setTableNumberInput,
  error,
  successMessage,
  onAddTable,
  token
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Agregar Mesa</h2>

        {error && <div className="text-red-500 mb-4">{error}</div>}
        {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}

        <div className="mb-4">
          <label htmlFor="tableNumber" className="block text-sm font-medium text-gray-700">
            Número de Mesa
          </label>
          <input
            id="tableNumber"
            type="text"
            value={tableNumberInput}
            onChange={(e) => setTableNumberInput(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            placeholder="Ej: Mesa 1"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            onClick={() => onAddTable(tableNumberInput)}  // Ahora pasa el valor correcto
            className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700"
          >
            Agregar Mesa
          </button>
        </div>
      </div>
    </div>
  );
};
export default TableModal;