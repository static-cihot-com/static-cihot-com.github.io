// 1:  ELEMENT_NODE
// 2:  ATTRIBUTE_NODE
// 3:  TEXT_NODE
// 4:  CDATA_SECTION_NODE
// 5:  ENTITY_REFERENCE_NODE
// 6:  ENTITY_NODE
// 7:  PROCESSING_INSTRUCTION_NODE
// 8:  COMMENT_NODE
// 9:  DOCUMENT_NODE
// 10: DOCUMENT_TYPE_NODE
// 11: DOCUMENT_FRAGMENT_NODE
// 12: NOTATION_NODE
function etoo(tag) {
	let { attributes, childNodes, nodeType } = tag

	let ret = { type: nodeType }

	let attrLength = attributes.length
	let attr
	if(attrLength) {
		attr = ret.attr = {}
		for (let i = 0; i < attrLength; i++) {
			let attribute = attributes.item(i)
			let { name, value } = attribute
			attr[name] = value
		}
	}

	let nodeLength = childNodes.length
	let node
	if(nodeLength) {
		node = ret.node = {}
		for (let i = 0; i < nodeLength; i++) {
			let childNode = childNodes.item(i)
			let { nodeType, nodeValue } = childNode
			node[i] = { type: nodeType }
	
			if (nodeType === 1) {
				node[i] =etoo(childNode)
			} else if (nodeType === 3) {
				node[i].text = nodeValue
			} else if (nodeType === 8) {
				let multiple = node[i].multiple = /\[CDATA\[/i.test(nodeValue) && /\]$/.test(nodeValue)
				if(multiple) {
					node[i].comment = nodeValue.slice(7,-2)
				}else{
					node[i].comment = nodeValue
				}
			} else {
			}
			// Object.defineProperty(node[i], 'NODE', { value: childNode })
		}
		node.length = childNodes.length
	}

	return ret
}
etoo.text = 3
etoo.element = 1
etoo.comment = 8
