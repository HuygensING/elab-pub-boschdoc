import should from "should";
import {isListOfStrings, isKeyValueMap, castArray, castKeyValue, castKeyValueArray} from "../src";


describe("Hire Forms Utils", function() {
	describe("castArray - Always return an array.", function() {
		it("Should turn a primitive value into an array", function() {
			should.deepEqual(castArray("somestring"), ["somestring"]);
			should.deepEqual(castArray(1337), [1337]);
			should.deepEqual(castArray(false), [false]);
		});

		it("Should do nothing to a array", function() {
			should.deepEqual(castArray([]), []);
			should.deepEqual(castArray(["1", 2, true]), ["1", 2, true]);
		})
	});

	describe("castKeyValue - Always return a key/value map.", function() {
		it("Should turn a primitive into a key/value map", function() {
			should.deepEqual(castKeyValue("somestring"), {key: "somestring", value: "somestring"});
			should.deepEqual(castKeyValue(1337), {key: 1337, value: 1337});
			should.deepEqual(castKeyValue(false), {key: false, value: false});
		});

		it("Should do nothing to a key/value map", function() {
			should.deepEqual(castKeyValue({key: "somestring", value: "somestring"}), {key: "somestring", value: "somestring"});
			should.deepEqual(castKeyValue({key: 1337, value: 1337}), {key: 1337, value: 1337});
			should.deepEqual(castKeyValue({key: false, value: false}), {key: false, value: false});
		});
	});

	describe("castKeyValueArray - Always return an array of key/value maps.", function() {
		it("Should turn an array of primitives into an array of key/value maps", function() {
			let actual = castKeyValueArray(["A", "B"]);
			let expected = [{key: "A", value: "A"}, {key: "B", value: "B"}];

			should.deepEqual(actual, expected);

			actual = castKeyValueArray([12, 13]);
			expected = [{key: 12, value: 12}, {key: 13, value: 13}];

			should.deepEqual(actual, expected);

			actual = castKeyValueArray([true, false]);
			expected = [{key: true, value: true}, {key: false, value: false}];

			should.deepEqual(actual, expected);
		});

		it("Should do nothing to an array of key/value maps", function() {
			let expected = [{key: true, value: true}, {key: false, value: false}];
			let actual = castKeyValueArray(expected);

			should.deepEqual(actual, expected);
		});

		it("Should not alter key/value maps in mixed array", function() {
			let actual = castKeyValueArray([{key: true, value: true}, false, "truthy"]);
			let expected = [{key: true, value: true}, {key: false, value: false}, {key: "truthy", value: "truthy"}];

			should.deepEqual(actual, expected);
		});
	});

	describe("isKeyValueMap - Check if param is a key/value map.", function() {
		it("Should return true when param is a key/value map", function() {
			isKeyValueMap({key: null, value: null}).should.be.ok();
			isKeyValueMap({key: null, value: null, prop: true}).should.be.ok();
		});

		it("Should return false when param is not a key/value map", function() {
			isKeyValueMap({key: null, Value: null}).should.not.be.ok();
			isKeyValueMap({value: null}).should.not.be.ok();
			isKeyValueMap("Some string").should.not.be.ok();
			isKeyValueMap(1337).should.not.be.ok();
			isKeyValueMap(true).should.not.be.ok();
			isKeyValueMap({}).should.not.be.ok();
			isKeyValueMap([]).should.not.be.ok();
			isKeyValueMap(null).should.not.be.ok();
			isKeyValueMap(undefined).should.not.be.ok();
		});
	});

	describe("isListOfStrings - Check if param is an array of strings.", function() {
		it("Should return true when param is an array of strings", function() {
			isListOfStrings(["A", "B", "C"]).should.be.ok();
			// isListOfStrings({key: null, value: null, prop: true}).should.be.ok();
		});

		it("Should return false when param is not an array of strings", function() {
			isListOfStrings({key: null, Value: null}).should.not.be.ok();
			isListOfStrings({value: null}).should.not.be.ok();
			isListOfStrings("Some string").should.not.be.ok();
			isListOfStrings(1337).should.not.be.ok();
			isListOfStrings(true).should.not.be.ok();
			isListOfStrings({}).should.not.be.ok();
			isListOfStrings([]).should.not.be.ok();
			isListOfStrings(null).should.not.be.ok();
			isListOfStrings(undefined).should.not.be.ok();
		});
	});



});