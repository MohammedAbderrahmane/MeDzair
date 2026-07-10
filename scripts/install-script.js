#!/usr/bin/env node
import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");

const targets = [
  { label: "Server", dir: rootDir },
  { label: "Admin UI", dir: path.join(rootDir, "ui-admin") },
  { label: "Client UI", dir: path.join(rootDir, "ui-client") },
];

for (const { label, dir } of targets) {
  console.log(`Installing ${label} dependencies...`);
  execSync("npm install", { cwd: dir, stdio: "inherit" });
  console.log(`${label} dependencies installed`);
}