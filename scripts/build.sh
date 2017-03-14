#!/bin/bash

set -o xtrace

rm -rf build/
mkdir -p build/js
mkdir build/css

if [ "$LOCAL_ENV" = "dev" ]; then
	cp src/index.html build/index.html
fi

browserify=browserify
if [ "$1" = "--watch" ]; then
	STYLUS_WATCH="--watch"
	browserify=watchify
fi

./node_modules/.bin/stylus \
	--use nib \
	--compress \
	--out build/css/main.css \
	$STYLUS_WATCH \
	src/stylus/main.styl &

# Build React JS
./node_modules/.bin/$browserify src/index.jsx \
	--extension=.jsx \
	--require react \
	--require classnames \
	--require immutable \
	--standalone BoschDoc \
	--transform [ babelify --plugins object-assign ] \
	--outfile build/js/main.js \
	--verbose &

if [ "$1" = "--watch" ]; then
	node scripts/server.js
fi