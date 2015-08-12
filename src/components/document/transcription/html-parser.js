import htmlparser2 from "htmlparser2";


let myParser = function(html) {
	let activeAnnotations = [], rootNode = {
		tageName: "root",
		children: [],
		attributes: {},
		parent: null
	};
	let currentNode = rootNode;

	let parser = new htmlparser2.Parser({
		ontext: function(text) {
			currentNode.children.push({
				tageName: null,
				textContent: text,
				activeAnnotations: activeAnnotations.slice(),
				parent: currentNode
			});
		},



		onopentag: function(name, attr) {

			if(attr['data-marker'] && attr['data-id']) {
				if(attr['data-marker'] === 'begin') {
					activeAnnotations.push(attr['data-id']);
				} else if(attr['data-marker'] === 'end') {
					activeAnnotations.splice(activeAnnotations.indexOf(attr['data-id']), 1);
				}
			}

			let childNode = {
				children: [],
				tagName: name,
				parent: currentNode,
				attributes: attr,
				activeAnnotations: activeAnnotations.slice(),
			};
			currentNode.children.push(childNode);
			currentNode = childNode;
		},



		onclosetag: function(name) {
			currentNode = currentNode.parent;
		}
	}, {decodeEntities: true});

	parser.write(html);
	parser.end();
	console.log("---PARSED HTML---", rootNode);
	return rootNode;
}

export default myParser;