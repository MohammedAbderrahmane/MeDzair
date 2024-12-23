#!/bin/sh

npm install
echo "Server dependencies installed"

cd ui-admin
npm install
echo "Admin UI  dependencies installed"

cd ../ui-client
npm install
echo "Client UI dependencies installed"