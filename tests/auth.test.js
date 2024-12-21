import { before, describe, test, todo, after } from "node:test";
import env from "../helpers/config.js";
import supertest from "supertest";
import FileSystem from "fs";

import ErrorTypes from "../helpers/error_types.js";
import SuccessType from "../helpers/success_types.js";

import app from "../app.js";
const api = supertest(app);

const BASE_URL = "/api/auth/";
const testCredentials = `
{
    "adminUsername": "admin",
    "adminPassword": "$2b$10$ZvwgKIFKlFUZRUhcB9gXbeIO/o8eY1W.cZzsIg8ol2Oi3ehE9dr2i"
}
`;

before(() => {
  if (!FileSystem.existsSync(`${env.CONF_FOLDER}`)) {
    FileSystem.mkdirSync(`${env.CONF_FOLDER}`, { recursive: true });
  }
  FileSystem.writeFileSync(
    `${env.CONF_FOLDER}/${env.CREDENTIALS_FILE_NAME}`,
    testCredentials,
    "utf-8"
  );
  FileSystem.chmodSync(
    `${env.CONF_FOLDER}/${env.CREDENTIALS_FILE_NAME}`,
    0o777
  );
});

describe("AUTH", () => {
  test("Auth : correct username & password", async () => {
    const user = {
      username: "admin",
      password: "admin",
    };
    await api.post(BASE_URL).send(user).expect(SuccessType.Accepted);
  });
  test("Auth : incrrect username", async () => {
    const user = {
      username: "-----",
      password: "admin",
    };
    await api.post(BASE_URL).send(user).expect(ErrorTypes.UNAUTHORIZED);
  });
  test("Auth : incrrect password", async () => {
    const user = {
      username: "admin",
      password: "-----",
    };
    await api.post(BASE_URL).send(user).expect(ErrorTypes.UNAUTHORIZED);
  });

  test("Auth : missing password attribut", async () => {
    const user = {
      username: "admin",
    };
    await api.post(BASE_URL).send(user).expect(ErrorTypes.BAD_REQUEST);
  });

  test("Auth : missing username attribut", async () => {
    const user = {
      password: "admin",
    };
    await api.post(BASE_URL).send(user).expect(ErrorTypes.BAD_REQUEST);
  });

  test("Auth : missing body", async () => {
    await api.post(BASE_URL).expect(ErrorTypes.BAD_REQUEST);
  });
});

after(() => {
  FileSystem.rmSync(`${env.CONF_FOLDER}/${env.CREDENTIALS_FILE_NAME}`);
});
