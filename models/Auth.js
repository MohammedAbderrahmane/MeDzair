import { admin } from "../helpers/helpers.js";
import env from "../helpers/config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { CustomError } from "../helpers/helpers.js";

const Auth = {
  login: () => {},
  verify: () => {},
};

Auth.login = (username, password, rememberMe) => {
  if (!username || !password)
    throw new CustomError("BAD_REQUEST", "attributs are messing");

  if (
    !(username === admin().username) ||
    !bcrypt.compareSync(password, admin().password)
  )
    throw new CustomError("UNAUTHORIZED", "wrong username/password");

  const authToken = jwt.sign({ username }, env.JWT_TOKEN, {
    expiresIn: rememberMe ? "7d" : "30m",
  });

  return authToken;
};

Auth.verify = (authorization) => {
  if (!authorization)
    throw new CustomError("UNAUTHORIZED", "You have no authorization");

  const authToken = authorization.replace("Bearer ", "");
  try {
    jwt.verify(authToken, env.JWT_TOKEN);
  } catch (error) {
    if (error.expiredAt)
      throw new CustomError("SESSION_EXPIRED", "your session has expired");
    throw new CustomError("UNAUTHORIZED", "wrong credentials");
  }
};

export default Auth;
