import LOCAL_URL from "../../utils/urlConst";
const headerInfo: HeadersInit = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

// need to better handle errors from backend validation
async function createUser(
  username: string,
  password: string,
  confirmPassword: string
) {
  const newBody = {
    username: username,
    password: password,
    confirmPassword: confirmPassword,
  };

  const url = LOCAL_URL + "register";

  console.log("HELLO :)");
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headerInfo,
      body: JSON.stringify(newBody),
    });

    const json: object = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// error returned when validation on backend failed:
// userCalls.ts:46   POST http://localhost:3000/api/login 400 (Bad Request)
// need to handle this error

async function loginUser(username: string, password: string) {
  const newBody = {
    username: username,
    password: password,
  };

  const url = LOCAL_URL + "login";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headerInfo,
      body: JSON.stringify(newBody),
    });

    const json: object = await response.json();

    localStorage.setItem("token", json.token);

    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export { createUser, loginUser };
