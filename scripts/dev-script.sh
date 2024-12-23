#!/bin/sh

if ! [ -d "node_modules" ]; then
    npm run install
fi
NODE_ENV=development nodemon index.js &
echo "Server is in development mode"

cd ui-admin
if ! [ -d "node_modules" ]; then
    npm run install
fi
npm run dev &
echo "Admin UI is in development mode"


cd ../ui-client
if ! [ -d "node_modules" ]; then
    npm run install
fi
npm run dev &
echo "UI is in development mode"