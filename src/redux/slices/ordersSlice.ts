// redux/slices/ordersSlice.ts
import { IOrder, IUpdateOrderStatus, status } from '@/interfaces/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderState {
  orders: IOrder[];
  status: IUpdateOrderStatus | string ;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  status: 'pendiente',
  error: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<IOrder>) {
      state.orders.push(action.payload);
    },
    clearOrders(state) {
      state.orders = [];
    },
    setOrderError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setOrderStatus(state, action: PayloadAction<OrderState['status']>) {
      state.status = action.payload;
    },
  },
});

export const { addOrder, clearOrders, setOrderError, setOrderStatus } = ordersSlice.actions;

export default ordersSlice.reducer;
