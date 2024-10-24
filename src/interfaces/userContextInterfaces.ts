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

export interface IStore {
  id: number;
  userId: number;
  name: string;
  products: IProduct[];
  location: string;
  picture: string;
}

export interface IProduct {
  id: number;
  stoerId: number;
  name: string;
  price: number;
  category: string;
  sku: string;
  quantity: number;
}
