import React from "react";

function validateLoginInput(username: string, password: string): boolean {
  return true;
}

interface IRegError {
  error: boolean;
  errorArray: string[];
}

function validateRegisterInput(
  username: string,
  password: string,
  confirmPassword: string,
  setRegError: React.Dispatch<React.SetStateAction<boolean>>,
  setRegErrorArray: React.Dispatch<React.SetStateAction<string[]>>
): IRegError {
  let regex: RegExp = /^[a-zA-Z]+$/;
  let errorArray: string[] = [];
  let errorPresent: boolean = false;

  if (password != confirmPassword) {
    errorPresent = true;
    errorArray.push("Passwords need to match!");
  }

  if (!regex.test(username)) {
    errorPresent = true;
    errorArray.push("Username can only contain letters!");
  }

  setRegError(errorPresent);
  setRegErrorArray(errorArray);

  return { error: errorPresent, errorArray: errorArray };
}

export { validateLoginInput, validateRegisterInput };
