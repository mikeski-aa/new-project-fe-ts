import React from "react";

// makes sure the input being entered is valid
function validateRegisterInput(
  username: string,
  password: string,
  confirmPassword: string,
  setRegError: React.Dispatch<React.SetStateAction<boolean>>,
  setRegErrorArray: React.Dispatch<React.SetStateAction<string[]>>
): boolean {
  let regex: RegExp = /^[a-zA-Z]+$/;
  let errorArray: string[] = [];
  let errorPresent: boolean = false;

  if (password != confirmPassword) {
    errorPresent = true;
    errorArray.push("Passwords need to match!");
  }

  if (!regex.test(username)) {
    errorPresent = true;
    errorArray.push("Username must only contain letters!");
  }

  if (password.length === 0 && confirmPassword.length === 0) {
    errorPresent = true;
    errorArray.push("Password field cannot be left blank!");
  }

  setRegError(errorPresent);
  setRegErrorArray(errorArray);

  return errorPresent;
}

export { validateRegisterInput };
