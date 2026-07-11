#!/usr/bin/env node

import { existsSync, mkdirSync, cpSync, rmSync } from "fs";
import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

const run = (command, cwd) => {
  console.log(`> ${command} (in ${cwd})`);
  execSync(command, { cwd, stdio: "inherit" });
};

const buildUi = ({ name, distName }) => {
  const uiDir = path.join(rootDir, name);
  const outerDistDir = path.join(rootDir, distName);
  const nodeModulesDir = path.join(uiDir, "node_modules");
  const distDir = path.join(uiDir, "dist");

  if (!existsSync(nodeModulesDir)) {
    run("npm install", uiDir);
  }

  // always rebuild fresh so the outer dist is fully replaced
  if (existsSync(distDir)) {
    rmSync(distDir, { recursive: true, force: true });
  }
  run("npm run build", uiDir);

  // remove the old dist in the parent dir, then copy the freshly built one over
  if (existsSync(outerDistDir)) {
    rmSync(outerDistDir, { recursive: true, force: true });
  }
  cpSync(distDir, outerDistDir, { recursive: true });

  // clean up the local dist folder now that it's copied out
  rmSync(distDir, { recursive: true, force: true });
};

const main = () => {
  buildUi({ name: "ui-client", distName: "dist-ui-client" });
  buildUi({ name: "ui-admin", distName: "dist-ui-admin" });

  console.log("Building done");
};

main();