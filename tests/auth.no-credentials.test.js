import { before, describe, test, todo, after } from "node:test";
import env from "../helpers/config.js";
import assert from "node:assert";
import supertest from "supertest";
import FileSystem from "fs";

import ErrorTypes from "../helpers/error_types.js";
import SuccessType from "../helpers/success_types.js";

import app from "../app.js";
const api = supertest(app);

const BASE_URL = "/api/auth/";

before(() => {
  if (
    FileSystem.existsSync(
      `${env.CONF_FOLDER_TEST}/${env.CREDENTIALS_FILE_NAME}`
    )
  )
    FileSystem.rmSync(`${env.CONF_FOLDER_TEST}/${env.CREDENTIALS_FILE_NAME}`);
});

test("AUTH : credentials file nonexistent", async () => {
  const user = {
    username: "admin",
    password: "admin",
  };
  await api.post(BASE_URL).send(user).expect(ErrorTypes.NOT_FOUND);
});
