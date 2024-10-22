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

  const headerInfo = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(LOCAL_URL, {
      method: "PUT",
      headers: headerInfo,
      body: JSON.stringify(newBody),
    });

    const json: string = await response.json();

    return json;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export { createUser };
