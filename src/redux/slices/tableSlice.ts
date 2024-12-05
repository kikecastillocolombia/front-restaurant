// src/store/tablesSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TableStatus = 'disponible' | 'reservada' | 'ocupada';

type Table = {
  id: string;
  tableNumber: number;
  x: number;
  y: number;
  status: TableStatus;
};

interface TablesState {
  tables: Table[];
}

const initialState: TablesState = {
  tables: [],
};

const tablesSlice = createSlice({
  name: 'tables',
  initialState,
  reducers: {
    setTables: (state, action: PayloadAction<Table[]>) => {
      state.tables = action.payload;
    },
    changeTableStatus: (state, action: PayloadAction<{ tableNumber: number; newStatus: TableStatus }>) => {
      const { tableNumber, newStatus } = action.payload;
      const table = state.tables.find((table) => table.tableNumber === tableNumber);
      if (table) {
        table.status = newStatus;
      }
    },
  },
});

export const { setTables, changeTableStatus } = tablesSlice.actions;

export default tablesSlice.reducer;
