// Importar RootState si ya está definido
import { RootState } from './store'; // Ajusta el path según tu estructura

// Guardar estado en Local Storage
export const saveStateToLocalStorage = (state: RootState): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch (error) {
    console.error('No se pudo guardar el estado en Local Storage', error);
  }
};

// Cargar estado desde Local Storage
export const loadStateFromLocalStorage = (): RootState | undefined => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (error) {
    console.error('No se pudo cargar el estado desde Local Storage', error);
    return undefined;
  }
};
