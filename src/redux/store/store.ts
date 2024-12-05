import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../slices/authSlice';
import reservationsReducer from '../slices/reservationsSlice';
import employeesReducer from '../slices/rolesSlice';
import tablesReducer from '../slices/tableSlice';
import paypalReducer from '../slices/paypalSlice';
import ordersReducer from '../slices/ordersSlice';


const persistConfig = {
  key: 'root', 
  storage, 
};


const rootReducer = combineReducers({
  auth: authReducer,
  paypal: paypalReducer,
  reservations: reservationsReducer,
  orders: ordersReducer,
  employees: employeesReducer,
  tables: tablesReducer,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }), 
});


export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
