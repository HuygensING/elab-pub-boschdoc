#!/bin/bash

./node_modules/.bin/stylus \
	--use nib \
	--compress \
	--out build/development/css/main.css \
	src/stylus/main.styl 



INDEX_FILE=deploy.jsx
if [ $LOCAL_ENV == "dev" ]; then
	INDEX_FILE=index.jsx
fi

# Build React JS
node_modules/.bin/browserify src/$INDEX_FILE \
	--extension=.jsx \
	--external classnames \
	--external immutable \
	--external react \
	--standalone WomenWritersEdit \
	--transform [ babelify --plugins object-assign ] \
	--verbose > build/development/js/react-src.js
