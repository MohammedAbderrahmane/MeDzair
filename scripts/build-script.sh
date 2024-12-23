#!/bin/sh

if ! [ -d "dist-ui-client" ]; then
    cd ui-client
    if ! [ -d "node_modules" ]; then
        npm install
    fi
    if ! [ -d "dist" ]; then
        npm run build
    fi
    cp -r dist/ ../dist-ui-client
    rm -r dist &
    cd ..
fi

if ! [ -d "dist-ui-admin" ]; then
    cd ui-admin
    if ! [ -d "node_modules" ]; then
        npm install
    fi
    if ! [ -d "dist" ]; then
        npm run build
    fi
    cp -r dist/ ../dist-ui-admin
    rm -r dist &
    cd ..
fi
echo "Building done"