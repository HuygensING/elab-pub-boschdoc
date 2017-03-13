import elabHtmlParser from "../src/html-parser";
import should from "should";

describe("elabHtmlParser", function() {
	function assertNodeIsValid(node, parentNode) {
		node.should.have.property('tagName');	

		if(node.children) {
			node.should.have.property('attributes');
			node.children.should.be.an.instanceOf(Array);
			for(let i in node.children) {
				assertNodeIsValid(node.children[i], node);
			}
		} else {
			node.should.have.property('textContent')
				.and.be.an.instanceOf(String);
		}
		if(node.activeAnnotations) {
			node.activeAnnotations.should.be.an.instanceOf(Array);
		}
		if(parentNode !== null) {
			node.should.have.property('parent')
				.and.be.an.instanceOf(Object)
				.and.equal(parentNode);
		}
	}

	function toText(node) {
		if(node.children) {
			let str = "";
			for(let i in node.children) {
				str += toText(node.children[i]);
			}
			return str;
		} else {
			return node.textContent;
		}
	}

	it("should parse html into a node tree with either text nodes or tag nodes and supply annotations", function() {
		let html = "<br /> <span data-marker='begin' data-id='1'></span> word1 &nbsp;<span data-marker='begin' data-id='2'></span> <i>word2 <b>word3</b> word4</i><sup data-marker='end' data-id='1'>1</sup> <br />word5<sup data-marker='end' data-id='2'>2</sup>trail";
		let rootNode = elabHtmlParser(html);


		assertNodeIsValid(rootNode, null, []);
		rootNode.children.length.should.equal(14);

		rootNode.children[0].activeAnnotations.length.should.equal(0);

		rootNode.children[3].activeAnnotations.length.should.equal(1);
		rootNode.children[3].activeAnnotations[0].should.equal("1");

		rootNode.children[7].activeAnnotations.length.should.equal(2);
		rootNode.children[7].activeAnnotations[0].should.equal("1");
		rootNode.children[7].activeAnnotations[1].should.equal("2");
		rootNode.children[7].children[1].children[0].activeAnnotations[1].should.equal("2");

		rootNode.children[11].activeAnnotations.length.should.equal(1);
		rootNode.children[11].activeAnnotations[0].should.equal("2");

		rootNode.children[13].activeAnnotations.length.should.equal(0);
	});

	it("should be usable to retrieve the full text content in the correct order, including white space", function() {
		let html = "<br /> <span data-marker='begin' data-id='1'></span> word1 &nbsp;<span data-marker='begin' data-id='2'></span> <i>word2 <b>word3</b> word4</i><sup data-marker='end' data-id='1'>1</sup> <br />word5<sup data-marker='end' data-id='2'>2</sup>trail";
		let rootNode = elabHtmlParser(html);
		toText(rootNode).should.equal("  word1   word2 word3 word41 word52trail");
	});

	it("should convert html entities to utf-8", function() {
		let html = "&middot;&dash;&nbsp;&eacute;";
		let rootNode = elabHtmlParser(html);
		toText(rootNode).should.equal("·‐ é");
	});
});