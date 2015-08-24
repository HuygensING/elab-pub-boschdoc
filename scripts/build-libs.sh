#!/bin/bash

# Create dirs
rm -rf build/development
mkdir -p build/development/js
mkdir build/development/css

if [ $LOCAL_ENV == "dev" ]; then
	cp src/index.html build/development/index.html
	cp ~/data/* build/development/data
fi

# Bundle React libs
node_modules/.bin/browserify \
	--require classnames \
	--require immutable \
	--require react > build/development/js/react-libs.js

