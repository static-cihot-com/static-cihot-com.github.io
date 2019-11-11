
function callback(mutationList, observer) {
	mutationList.forEach((mutation) => {
		// switch (mutation.type) {
			// case 'childList':
				/* 从树上添加或移除一个或更多的子节点；参见 mutation.addedNodes 与
				   mutation.removedNodes */
				// break;
			// case 'attributes':
				/* mutation.target 中某节点的一个属性值被更改；该属性名称在 mutation.attributeName 中，
				   该属性之前的值为 mutation.oldValue */
				// break;
		// }
		console.debug(mutation)
	});
}

let observerOptions = {
	childList: true, // 观察目标子节点的变化，添加或者删除
	attributes: true, // 观察属性变动
	characterData: true,// 是否节点内容或节点文本的变动
	subtree: true, // 默认为 false，设置为 true 可以观察后代节点
	attributeOldValue: true,
	characterDataOldValue: true,
	attributeFilter: [],
}
let observer = new MutationObserver(callback)
let { observe, disconnect } = observer

// disconnect()
// takeRecords()

// let  targetNode = document.querySelector("#someElement");
// observer.observe(targetNode, observerOptions);