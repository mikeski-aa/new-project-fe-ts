import LOCAL_URL from "../../utils/urlConst";

async function createUser(
  username: string,
  password: string,
  confirmPassword: string
) {
  const newBody: object = {
    username: username,
    password: password,
    confirmPassword: confirmPassword,
  };

  try {
  } catch (error) {
    console.log(error);
    return error;
  }
}
