
/*
 * @param {Array} list
 * @returns {Boolean}
 */
export function isListOfStrings(list) {
	if ((!Array.isArray(list)) || (!list.length)) {
		return false;
	}

	return list.every(item =>
		typeof item === "string"
	);
}

/*
 * @param {Object} map
 * @returns {Boolean}
 */
export function isKeyValueMap(map) {
	if (map == null) {
		return false;
	}

	return map.hasOwnProperty("key") && map.hasOwnProperty("value");
}

/*
 * Always return an array.
 *
 * @param {String|Array} arr
 * @returns {Array}
 */
export function castArray(arr) {
	return (Array.isArray(arr)) ? arr : [arr];
};

/*
 * Always return a key/value map.
 *
 * @param {Number|String|Boolean|Object} item
 * @returns {Array} Array of key value maps, ie: [{key: "A", value: "A"}, {key: "B", value: "B"}, ...]
 */
export function castKeyValue(item) {
	return isKeyValueMap(item) ?
		item :
		{
			key: item,
			value: item
		};
}

/*
 * Always return an array of key/value maps.
 *
 * @param {Number|String|Boolean|Array|Object} list
 * @returns {Array} Array of key value maps, ie: [{key: "A", value: "A"}, {key: "B", value: "B"}, ...]
 */
export function castKeyValueArray(list) {
	list = castArray(list);

	return list.map(castKeyValue);
}
