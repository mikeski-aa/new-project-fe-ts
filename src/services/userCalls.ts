import LOCAL_URL from "../../utils/urlConst";

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

  const headerInfo: HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const url = LOCAL_URL + "/register";

  console.log("HELLO :)");
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: headerInfo,
      body: JSON.stringify(newBody),
    });

    const json: string = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export { createUser };
