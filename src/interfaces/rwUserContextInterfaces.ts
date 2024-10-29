// interface definition for the user context
interface UserContextInt {
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
interface IUser {
  username: string | null;
  id: number | null;
  isGuest: boolean | null;
  stores: IStore[];
}

// interface for individual store
interface IStore {
  id: number;
  userId: number;
  name: string;
  products: IProduct[];
  location: string;
  picture: string;
  reports: IReport[];
}

// interface for individual product
interface IProduct {
  id: number;
  storeId: number;
  name: string;
  price: number;
  purchasePrice: number;
  category: string;
  sku: string;
  quantity: number;
}

interface ISoldProduct extends IProduct {
  quantitySold: number;
}

// interface for report
interface IReport {
  id: number;
  storeId: number;
  date: Date;
  soldProducts: ISoldProduct[];
  totalSaleValue: number;
}
