
"use client"
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IReservation, status } from '@/interfaces/interfaces';  // Asegúrate de importar el enum 'status'

interface ReservationsState {
  reservations: IReservation[];
  loading: boolean;
  error: string | null;
}

const initialState: ReservationsState = {
  reservations: [],
  loading: false,
  error: null,
};

const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    fetchReservationsRequest(state) {
      state.loading = true;
    },
    fetchReservationsSuccess(state, action: PayloadAction<IReservation[]>) {
      state.loading = false;
      state.reservations = action.payload;
      state.error = null;
    },
    fetchReservationsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addReservation(state, action: PayloadAction<IReservation>) {
      state.reservations.push(action.payload);
    },
    removeReservation(state, action: PayloadAction<string>) {
      state.reservations = state.reservations.filter(reservation => reservation.tableNumber !== action.payload);
    },
    updateReservationStatus(state, action: PayloadAction<{ reservIdentification: string; status: status }>) {
      const reservation = state.reservations.find(res => res.reservIdentification === action.payload.reservIdentification);
      if (reservation) {
        reservation.status = action.payload.status; 
      }
    },
  },
});

export const { 
  fetchReservationsRequest, 
  fetchReservationsSuccess, 
  fetchReservationsFailure, 
  addReservation, 
  removeReservation, 
  updateReservationStatus 
} = reservationsSlice.actions;

export default reservationsSlice.reducer;
