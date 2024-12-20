// interface definition for the user context
export interface UserContextInt {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
  theme: string;
  setTheme: (theme: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  stores: IStore[];
  setStores: (stores: IStore[]) => void;
}

// interface for the user object
export interface IUser {
  username: string | null;
  id: number | null;
  isGuest: boolean | null;
  stores: IStore[];
}

// interface for individual store
export interface IStore {
  id: number;
  userId: number;
  name: string;
  products: IProduct[];
  location: string;
  picture: string;
  reports: IReport[];
}

// interface for individual product
export interface IProduct {
  id: number;
  storeId: number;
  name: string;
  price: number;
  purchasePrice: number;
  category: string;
  sku: string;
  quantity: number;
}

export interface ISoldProduct extends IProduct {
  quantitySold: number;
}

// interface for report
export interface IReport {
  id: number;
  storeId: number;
  date: Date;
  soldProducts: ISoldProduct[];
  totalSaleValue: number;
}

// interface for store responses
export interface INewRwResponse {
  errorPresent: boolean;
  error?: string;
  store?: IStore[];
}

// interface for store responses
export interface INewProdResponse {
  errorPresent: boolean;
  error?: string;
  item?: IProduct;
  count?: number;
}
