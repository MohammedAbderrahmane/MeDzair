#!/usr/bin/env node
import { spawn, spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const adminDir = path.join(".", 'ui-admin');
const clientDir = path.join(".", 'ui-client');

const isWin = process.platform === 'win32';
const npm = isWin ? 'npm' : 'npm';

const children = [];

function ensureDeps(dir) {
  if (!existsSync(path.join(dir, 'node_modules'))) {
    console.log(`Installing dependencies in ${dir}...`);
    const res = spawnSync(npm, ['install'], { cwd: dir, stdio: 'inherit', shell: isWin });
    if (res.status !== 0) {
      console.error(`npm install failed in ${dir}`);
      process.exit(res.status ?? 1);
    }
  }
}

function startProcess(cmd, args, dir, extraEnv = {}) {
  const child = spawn(cmd, args, {
    cwd: dir,
    stdio: 'inherit',
    shell: isWin,
    env: { ...process.env, ...extraEnv },
  });
  children.push(child);
  return child;
}

// --- Backend server ---
ensureDeps(path.dirname("."));
startProcess('npx', ['nodemon', 'index.js'], path.dirname("."), { NODE_ENV: 'development' });
console.log('Server is in development mode');

// --- Admin UI ---
ensureDeps(adminDir);
startProcess(npm, ['run', 'dev'], adminDir);
console.log('Admin UI is in development mode');

// --- Client UI ---
ensureDeps(clientDir);
startProcess(npm, ['run', 'dev'], clientDir);
console.log('UI is in development mode');

// --- Forward Ctrl+C / termination to all children ---
function shutdown(signal) {
  for (const child of children) {
    if (!child.killed) child.kill(signal);
  }
}
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

// --- Equivalent of `wait`: exit once all children have exited ---
let remaining = children.length;
let exitCode = 0;
for (const child of children) {
  child.on('exit', (code) => {
    if (code) exitCode = code;
    remaining -= 1;
    if (remaining === 0) process.exit(exitCode);
  });
}
