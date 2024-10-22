import LOCAL_URL from "../../utils/urlConst";
const headerInfo: HeadersInit = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

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

    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export { createUser, loginUser };
