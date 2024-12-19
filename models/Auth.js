import FileSystem from "fs";
import env from "../helpers/config.js";
import bcrypt from "bcrypt";

import { CustomError } from "../helpers/helpers.js";

const Auth = {
  login: () => {},
};

Auth.login = (username, password, rememberMe) => {
  if (!FileSystem.existsSync(`${env.CONF_FOLDER}/${env.CREDENTIALS_FILE_NAME}`))
    throw new CustomError("NOT_FOUND", "credentials file not found");
  if (!username || !password)
    throw new CustomError("BAD_REQUEST", "attributs are messing");

  const { adminUsername, adminPassword } = JSON.parse(
    FileSystem.readFileSync(
      `${env.CONF_FOLDER}/${env.CREDENTIALS_FILE_NAME}`
    ).toString()
  );

  if (
    !(username === adminUsername) ||
    !bcrypt.compareSync(password, adminPassword)
  )
    throw new CustomError("UNAUTHORIZED", "wrong username/password");

  // TODO : Remember me
  return true;
};

export default Auth;
