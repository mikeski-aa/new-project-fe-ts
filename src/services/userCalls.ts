import LOCAL_URL from "../../utils/urlConst";
const headerInfo: HeadersInit = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

interface UserResponse {
  error: string | null;
  errorPresent?: boolean;
  token?: string;
  user?: object;
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
      headers: headerInfo,
      body: JSON.stringify(newBody),
    });

    console.log(response);

    if (!response.ok) {
      console.log("error");
      return {
        errorPresent: true,
        error: "Input validation error",
      } as UserResponse;
    }

    const json: object = await response.json();
    console.log({ ...json, errorPresent: false });
    return { ...json, errorPresent: false } as UserResponse;
  } catch (error) {
    console.log(error);
    return { error: error } as UserResponse;
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

  console.log(newBody);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headerInfo,
      body: JSON.stringify(newBody),
    });

    console.log(response.status);

    if (!response.ok) {
      return {
        errorPresent: true,
        error: "Invalid credentials entered",
      } as UserResponse;
    }

    const json: any = await response.json();

    localStorage.setItem("token", json.token);

    return { ...json, errorPresent: false } as UserResponse;
  } catch (error) {
    console.log(error);
    return { error: error } as UserResponse;
  }
}

export { createUser, loginUser };
