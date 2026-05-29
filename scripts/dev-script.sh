#!/bin/sh

if ! [ -d "node_modules" ]; then
    npm run install
fi
NODE_ENV=development nodemon index.js &
server_pid=$!
echo "Server is in development mode"

cd ui-admin
if ! [ -d "node_modules" ]; then
    npm run install
fi
npm run dev &
admin_pid=$!
echo "Admin UI is in development mode"


cd ../ui-client
if ! [ -d "node_modules" ]; then
    npm run install
fi
npm run dev &
client_pid=$!
echo "UI is in development mode"

wait $server_pid $admin_pid $client_pid