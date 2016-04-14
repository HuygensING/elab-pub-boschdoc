#!/bin/sh

./node_modules/.bin/stylus \
	--use nib \
	--compress \
	--out build/development/css/main.css \
	--watch \
	src/stylus/main.styl &

node_modules/.bin/watchify src/index.jsx \
	--extension=.jsx \
	--external react \
	--outfile build/development/js/react-src.js \
	--standalone BoschDoc \
	--transform [ babelify --plugins object-assign ] \
	--verbose
