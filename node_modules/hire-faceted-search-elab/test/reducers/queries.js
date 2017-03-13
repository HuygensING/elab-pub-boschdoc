import expect from "expect";
import reducer from "../../src/reducers/queries";

describe('queries reducer', () => {
	it("should handle SET_QUERY_DEFAULTS", () => {
		let expected = {
			"facetValues": [],
			"resultFields": [
				"Locatie",
				"Historische instelling",
				"Inventaris nummer"
            ],
			"term": "",
			"searchInAnnotations": true,
			"searchInTranscriptions": true,
			"sortParameters": [
				{
					"direction": "asc",
					"fieldname": "Locatie"
				},
				{
					"direction": "asc",
					"fieldname": "Historische instelling"
				},
				{
					"direction": "asc",
					"fieldname": "Inventaris nummer"
				}
			],
			"textLayers": [
				"Diplomatic",
				"Opmerkingen en verwijzingen",
				"Comments and References",
				"Transcription",
				"Transcripción",
				"Transcriptie",
				"Vertaling",
				"Translation",
				"Traducción",
				"Comentarios y referencias"
			]
		};

		expect(reducer(undefined, {
			type: "SET_QUERY_DEFAULTS",
			config: {levels: ["Locatie", "Historische instelling", "Inventaris nummer"]}
		})).toEqual({
			all: [expected],
			default: expected,
			last: expected
		});
	});


	it("should handle SET_RESULTS_SORT", () => {
		let state = {
			all: [],
			last: {
				sortParameters: [
					{fieldname: "zzOnBottom"},
					{fieldname: "inTheMiddle"},
					{fieldname: "onTop"}
				]
			}
		};

		expect(reducer(state, {
			type: "SET_RESULTS_SORT",
			field: "onTop"
		})).toEqual({
			all: [{ sortParameters: [ { fieldname: "onTop" }, { fieldname: "inTheMiddle" }, { fieldname: "zzOnBottom" } ] } ],
			last: { sortParameters: [ { fieldname: "onTop" }, { fieldname: "inTheMiddle" }, { fieldname: "zzOnBottom" } ] } }
		);
	});



	it("should REMOVE_FACET_VALUE but keep other facet values in the same facet name", () => {
		let initialFacets = {
			facetValues: [
				{name: "facet1", values: ["a", "b", "c"]},
				{name: "facet2", values: ["d", "e"]}
			]
		};
		let state = {
			last: initialFacets,
			all: [initialFacets]
		};
		let action = {
			type: "REMOVE_FACET_VALUE",
			facetName: "facet1",
			value: "b"
		};

		let expectedFacets = {
			facetValues: [
				{name: "facet2", values: ["d", "e"]},
				{name: "facet1", values: ["a", "c"]}
			]
		};

		let expectedState = {
			all: [initialFacets, expectedFacets],
			last: expectedFacets
		};

		expect(reducer(state, action)).toEqual(expectedState);
	});

	it("should REMOVE_FACET_VALUE and facet when list is empty", () => {
		let initialFacets = {
			facetValues: [
				{name: "facet1", values: ["a"]},
			]
		};
		let state = {
			last: initialFacets,
			all: [initialFacets]
		};
		let action = {
			type: "REMOVE_FACET_VALUE",
			facetName: "facet1",
			value: "a"
		};

		let expectedFacets = {
			facetValues: []
		};

		let expectedState = {
			all: [initialFacets, expectedFacets],
			last: expectedFacets
		};

		expect(reducer(state, action)).toEqual(expectedState);
	});	


	it("should ADD_FACET_VALUE with existing facets", () => {
		let initialFacets = {
			facetValues: [
				{name: "facet1", values: ["b", "c"]},
				{name: "facet2", values: ["d", "e"]}
			]
		};
		let state = {
			last: initialFacets,
			all: [initialFacets]
		};
		let action = {
			type: "ADD_FACET_VALUE",
			facetName: "facet1",
			value: "a"
		};

		let expectedFacets = {
			facetValues: [
				{name: "facet2", values: ["d", "e"]},
				{name: "facet1", values: ["b", "c", "a"]}
			]
		};
		let expectedState = {
			all: [initialFacets, expectedFacets],
			last: expectedFacets
		};

		expect(reducer(state, action)).toEqual(expectedState);
	});

	it("should ADD_FACET_VALUE without existing facets", () => {
		let initialFacets = {
			facetValues: []
		};
		let state = {
			last: initialFacets,
			all: [initialFacets]
		};
		let action = {
			type: "ADD_FACET_VALUE",
			facetName: "facet1",
			value: "a"
		};

		let expectedFacets = {
			facetValues: [
				{name: "facet1", values: ["a"]}
			]
		};
		let expectedState = {
			all: [initialFacets, expectedFacets],
			last: expectedFacets
		};

		expect(reducer(state, action)).toEqual(expectedState);
	});

	it("should ADD_FACET_VALUE with existing other facet name", () => {
		let initialFacets = {
			facetValues: [{name: "facet2", values: ["d", "e"]}]
		};
		let state = {
			last: initialFacets,
			all: [initialFacets]
		};
		let action = {
			type: "ADD_FACET_VALUE",
			facetName: "facet1",
			value: "a"
		};

		let expectedFacets = {
			facetValues: [
				{name: "facet2", values: ["d", "e"]},
				{name: "facet1", values: ["a"]}
			]
		};
		let expectedState = {
			all: [initialFacets, expectedFacets],
			last: expectedFacets
		};

		expect(reducer(state, action)).toEqual(expectedState);
	});


	it("should handle CHANGE_SEARCH_TERM", () => {
		let state = {
			all: [{term: "foo"}],
			last: {term: "foo"}
		};
		let expectedState = {
			all: [{term: "foo"}, {term: "bar"}],
			last: {term: "bar"}
		};
		expect(reducer(state, {
			type: "CHANGE_SEARCH_TERM",
			value: "bar"
		})).toEqual(expectedState);
	});
	it("should handle NEW_SEARCH", () => {

		let state = {
			default: {
				"facetValues": [],
				"sortParameters": [],
				"term": ""
			},
			all: [{
				"facetValues": ["foo", "bar"],
				"sortParameters": ["bar", "foo"],
				"term": "baz"
			}],
			last: {
				"facetValues": ["foo", "bar"],
				"sortParameters": ["bar", "foo"],
				"term": "baz"
			}
		};

		let expectedState = {
			default: {
				"facetValues": [],
				"sortParameters": [],
				"term": ""
			},
			all: [state.last, state.default],
			last: state.default
		};

		expect(reducer(state, {type: "NEW_SEARCH"})).toEqual(expectedState);
	});
});