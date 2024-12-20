import { LOCAL_URL } from "../utils/urlConst";
import { IStore, IUser } from "../interfaces/userContextInterfaces";

// not sure how I feela bout this definition here need to look it up
// suggestion to make it dynamic:
const getHeaderInfo = (): HeadersInit => {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  };
};

// define interface for the expected response
interface UserResponse {
  error?: string;
  errorPresent: boolean;
  token?: string;
  user?: IUser;
  username?: string;
  id?: number;
  isGuest?: boolean;
  stores?: IStore[];
}

// need to better handle errors from backend validation
async function createUser(
  username: string,
  password: string,
  confirmPassword: string
): Promise<UserResponse> {
  const newBody = {
    username: username,
    password: password,
    confirmPassword: confirmPassword,
  };

  const url = LOCAL_URL + "register";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: getHeaderInfo(),
      body: JSON.stringify(newBody),
    });

    if (!response.ok) {
      return {
        errorPresent: true,
        error: "Input validation error",
      };
    }

    const json: Omit<UserResponse, "errorPresent"> = await response.json();

    return { ...json, errorPresent: false };
  } catch (error) {
    return { errorPresent: true, error: "Network or server error" };
  }
}

// error returned when validation on backend failed:
// userCalls.ts:46   POST http://localhost:3000/api/login 400 (Bad Request)
// need to handle this error

async function loginUser(
  username: string,
  password: string
): Promise<UserResponse> {
  const newBody = {
    username: username,
    password: password,
  };

  const url = LOCAL_URL + "login";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: getHeaderInfo(),
      body: JSON.stringify(newBody),
    });

    if (!response.ok) {
      return {
        errorPresent: true,
        error: "Invalid credentials entered",
      };
    }

    const json: Omit<UserResponse, "errorPresent"> = await response.json();

    // type guard
    if (json.token) {
      localStorage.setItem("token", json.token);
    }

    return { ...json, errorPresent: false };
  } catch (error) {
    return { errorPresent: true, error: "Network or server error" };
  }
}

// check for user login
async function loginCheck() {
  const url = LOCAL_URL + "login";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: getHeaderInfo(),
    });

    if (!response.ok) {
      return {
        errorPresent: true,
        error: "Token not found!",
      };
    }

    const user: IUser = await response.json();

    return { user, errorPresent: false };
  } catch (error) {
    return { errorPresent: true, error: "Network or server error" };
  }
}

// guest user login
async function guestLogin() {
  const url = LOCAL_URL + "login/guest";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: getHeaderInfo(),
    });

    if (!response.ok) {
      return {
        errorPresent: true,
        error: "Error creating guest instance",
      } as UserResponse;
    }

    const json: Omit<UserResponse, "errorPresent"> = await response.json();

    // type guard
    if (json.token) {
      localStorage.setItem("token", json.token);
    }

    return { ...json, errorPresent: false };
  } catch (error) {
    return { errorPresent: true, error: "Network or server error" };
  }
}

async function testGuestLogin() {
  const url = LOCAL_URL + "login/guest/test";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: getHeaderInfo(),
    });

    if (!response.ok) {
      return {
        errorPresent: true,
        error: "Error creating guest instance",
      } as UserResponse;
    }

    const json: Omit<UserResponse, "errorPresent"> = await response.json();

    // type guard
    if (json.token) {
      localStorage.setItem("token", json.token);
    }

    return { ...json, errorPresent: false };
  } catch (error) {
    return { errorPresent: true, error: "Network or server error" };
  }
}

export { createUser, loginUser, loginCheck, guestLogin, testGuestLogin };
