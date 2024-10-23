function validateLoginInput(username: string, password: string): boolean {
  return true;
}

interface IRegError {
  error: boolean;
  errorText: string;
}

function validateRegisterInput(
  username: string,
  password: string,
  confirmPassword: string
): IRegError {
  let regex: RegExp = /^[a-zA-Z]+$/;

  if (password != confirmPassword) {
    return { error: true, errorText: "Passwords need to match!" };
  }

  if (!regex.test(username)) {
    return {
      error: true,
      errorText: "Username can only contain letters!",
    };
  }

  return { error: false, errorText: "" };
}

export { validateLoginInput, validateRegisterInput };
