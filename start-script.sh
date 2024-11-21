#!/bin/sh

npm install
if ! [ -d "dist" ]; then
    cd ui-client
    if ! [ -d "dist" ]; then
        npm install
        npm run build
    fi
    cp -r dist ..
    rm -r dist
    cd ..
fi

node index.js