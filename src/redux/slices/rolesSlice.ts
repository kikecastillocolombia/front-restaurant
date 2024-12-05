"use client"
import { ICargo, IEmployee } from '@/interfaces/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface EmployeesState {
  employees: IEmployee[];
  loading: boolean;
  error: string | null;
}

const initialState: EmployeesState = {
  employees: [],
  loading: false,
  error: null,
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    fetchEmployeesRequest(state) {
      state.loading = true;
    },
    fetchEmployeesSuccess(state, action: PayloadAction<IEmployee[]>) {
      state.loading = false;
      state.employees = action.payload;
      state.error = null;
    },
    fetchEmployeesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateEmployeeCargo(state, action: PayloadAction<{ employeeId: string; cargo: ICargo }>) {
      const { employeeId, cargo } = action.payload;
      const employee = state.employees.find(emp => emp.numberID === employeeId);
      if (employee) {
        employee.employeeCargo = cargo;
      }
    },
    addEmployee(state, action: PayloadAction<IEmployee>) {
      state.employees.push(action.payload);
    },
    removeEmployee(state, action: PayloadAction<string>) {
      state.employees = state.employees.filter(emp => emp.numberID !== action.payload);
    },
  },
});

export const { 
  fetchEmployeesRequest, 
  fetchEmployeesSuccess, 
  fetchEmployeesFailure, 
  updateEmployeeCargo, 
  addEmployee, 
  removeEmployee 
} = employeesSlice.actions;

export default employeesSlice.reducer;
