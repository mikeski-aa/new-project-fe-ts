// interface definition for the user context
export interface UserContextInt {
  user: IUser | null | undefined;
  setUser: (user: IUser | null | undefined) => void;
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
  theme: string;
  setTheme: (theme: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  stores: IStore[] | undefined;
  setStores: (stores: IStore[]) => void;
}

// interface for the user object
export interface IUser {
  username: string | undefined | null;
  id: number | undefined | null;
  isGuest: boolean | undefined | null;
  stores: IStore[];
}

// interface for individual store
export interface IStore {
  id: number | undefined;
  userId: number | undefined;
  name: string | undefined;
  products: IProduct[] | undefined;
  location: string | undefined;
  picture: string | undefined;
}

// interface for individual product
export interface IProduct {
  id: number;
  storeId: number;
  name: string;
  price: number;
  category: string;
  sku: string;
  quantity: number;
}
