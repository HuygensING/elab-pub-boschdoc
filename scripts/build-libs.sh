#!/bin/bash

# Create dirs
rm -rf build/development
mkdir -p build/development/js
mkdir build/development/css
mkdir build/development/img
mkdir build/development/data

if [ $LOCAL_ENV == "dev" ]; then
	cp src/index.html build/development/index.html
	cp ~/data/* build/development/data
else
	cp src/deploy.html build/development/index.html
	cp src/sample-data/* build/development/data
fi

cp src/logo.png build/development/img

# Bundle React libs
node_modules/.bin/browserify \
	--require classnames \
	--require immutable \
	--require react > build/development/js/react-libs.js

