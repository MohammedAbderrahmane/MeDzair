import { before, describe, test, todo, after } from "node:test";
import { getCurrentDay } from "../helpers/helpers.js";
import env from "../helpers/config.js";
import assert from "node:assert";
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
  if (!FileSystem.existsSync(`${env.CONF_FOLDER_TEST}`)) {
    FileSystem.mkdirSync(`${env.CONF_FOLDER_TEST}`, { recursive: true });
  }
  FileSystem.writeFileSync(
    `${env.CONF_FOLDER_TEST}/${env.CREDENTIALS_FILE_NAME}`,
    testCredentials,
    "utf-8"
  );
  FileSystem.chmodSync(
    `${env.CONF_FOLDER_TEST}/${env.CREDENTIALS_FILE_NAME}`,
    0o222
  );
});

test("AUTH : no permission to read credentials file", async () => {
  const user = {
    username: "admin",
    password: "admin",
  };
  await api.post(BASE_URL).send(user).expect(ErrorTypes.FORBIDDEN);
});

after(() => {
  FileSystem.rmSync(`${env.CONF_FOLDER_TEST}/${env.CREDENTIALS_FILE_NAME}`);
});
