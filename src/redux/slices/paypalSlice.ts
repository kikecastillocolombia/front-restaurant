import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PayPalState {
  isPaymentSuccessful: boolean;
  paymentError: string | null;
  paymentID: string | null;
  approveLink: string | null; 
}

const initialState: PayPalState = {
  isPaymentSuccessful: false,
  paymentError: null,
  paymentID: null,
  approveLink: null,
};

const paypalSlice = createSlice({
  name: 'paypal',
  initialState,
  reducers: {
    setPaymentSuccess: (state, action: PayloadAction<{ paymentID: string; approveLink: string }>) => {
      state.isPaymentSuccessful = true;
      state.paymentID = action.payload.paymentID;
      state.approveLink = action.payload.approveLink;  
    },
    setPaymentError: (state, action: PayloadAction<string>) => {
      state.paymentError = action.payload;
    },
    resetPaymentState: (state) => {
      state.isPaymentSuccessful = false;
      state.paymentError = null;
      state.paymentID = null;
      state.approveLink = null; 
    },
  },
});

export const { setPaymentSuccess, setPaymentError, resetPaymentState } = paypalSlice.actions;
export default paypalSlice.reducer;
