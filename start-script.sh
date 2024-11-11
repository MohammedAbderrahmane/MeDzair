#!/bin/sh
if ! [ -d "dist" ]; then
    cd ui-client
    if ! [ -d "dist" ]; then
        npm run build
    fi
    cp -r dist ..
    rm -r dist
    cd ..
fi

node index.js