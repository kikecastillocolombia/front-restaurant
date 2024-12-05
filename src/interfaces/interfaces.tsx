//para usuario
export interface ICreateUser {
  fullname: string;
  username: string;
  email: string;
  password: string;
  repeatpassword: string;
}
export interface IUser {
  uuid: string;
  username: string;
  fullname:string;
  email: string;
  password: string;
  employee?: IEmployee
  accessToken: string;
  refreshToken: string;
  banned: boolean;
  isActive: boolean;
  rol: IRol
  }
 
//uso este type que es un pick de IUser, no jodá!!!
export type IReturnedUserInfo = Pick<IUser, 
"uuid" |"fullname" | "username" | "email" | "banned" | "isActive" | "rol">;

export enum IRol{
  user = 'user',
  manager = 'manager',
  mozo = 'mozo',
  chef = 'chef'
}

export interface ILogin {
  username: string;

  email?: string;
  password?: string;
  uuid: string;
  fullname?:string;
  employee?: IEmployee
  accessToken?: string;
  refreshToken?: string;
}



export enum status{
  pending = 'pending',
  active = 'active',
  canceled = 'canceled'
}
//para reservas
export interface IReservation {
  reservIdentification:string
  date: Date;
  startTime: string;
  tableNumber: string;
  guests: number;
  status:status;
}
//para pedidos
export interface IOrder {
  productoId: string;
  cantidad: number;
  notasAdicionales?: string;
  mozoId: string;
  tableNumber:number;
}
export interface IPedido {
  id: string;
  productoId: string;
  cantidad: number;
  tableNumber: string;  // Aquí puedes usar un string o número dependiendo de tu implementación
  notasAdicionales?: string;
  mozoId: string;
  estado: 'pendiente' | 'en_proceso' | 'completado';
  table: ITable;  // Relación con la mesa
  chefId?: string; // Relación con el chef, opcional dependiendo del estado del pedido
}


export interface IUpdateOrderStatus {
  estado: 'pendiente' | 'en_proceso' | 'completado';
  chefId: string;
  tableNumber:string;
}

//para producto
export enum IProductCategory {
  PlatosPrincipales = 'Platos Principales',
  Pasteleria = 'Pasteleria',
  Postres = 'Postres',
  Tragos = 'Tragos',
}

export enum IProductSubcategory {
  Mediterranea = 'Mediterranea',
  Oriental = 'Oriental',
  Occidental = 'Occidental',
  LatinoAmericano = 'LatinoAmericano',
  Indio = 'Indio',
  Tropical = 'Tropical',
  Bebidas = 'Bebidas',
}

export interface IProduct {
  name: string;
  price: number;
  description: string;
  stock: number;
  category: IProductCategory;
  images: IImage[];
  duration: string;
  subcategory: IProductSubcategory;
}

export interface IImage {
  url: string;
}

//para empleados
export enum ICargo {
  Chef = 'chef',
  Waiter = 'waiter',
  Bartender = 'bartender',
}

export interface IEmployee {
  numberID: string;
  employeeCargo: ICargo;
  user: IUser; 
  orders?: IPedido[];
  pedidosMozo?: IPedido[];
  pedidosChef?: IPedido[];
}

//para mesas 
export interface ITable {
  uuid: string;
  tableNumber: number;
  status: ITableState;  // Estado de la mesa (libre, ocupada, reservada)
  reservations?: IReservation[];  // Relación con reservas
  orders?: IPedido[];  // Relación con los pedidos asociados a la mesa
}
export enum ITableState {
  free = 'free',
  occupied = 'occupied',
  reserved = 'reserved'
}



