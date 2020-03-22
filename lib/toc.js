let { htmlElementCreation } = require('./utility');

function createTOCElem(document) {
	preprocessTOC(document);
	Array.from(document.querySelectorAll('h2,h3,h4,h5,h6')).forEach((topic) => {
		createTOC(createDST(topic), document);
	});
}

function preprocessTOC(document) {
	const toggleContainerElem = htmlElementCreation(document, { classes: 'toggle-container' });

	htmlElementCreation(document, {
		type        : 'button',
		textContent : 'Show',
		parentElem  : toggleContainerElem,
		classes     : 'toggle--button',
		id          : 'toggle--show'
	});

	htmlElementCreation(document, {
		type        : 'button',
		textContent : 'Hide',
		parentElem  : toggleContainerElem,
		classes     : 'toggle--button',
		id          : 'toggle--hide'
	});

	const tocToggleCustom = htmlElementCreation(document, {
		textContent : '➥',
    classes     : 'icon--custom-toggle',
    id: "tocToggleCustom"
	});

	const tocL2Container = htmlElementCreation(document, {
		classes : 'toc--L1'
	});

  const tocSearchBar = htmlElementCreation(document,{
    type: "input",
    classes: "toc--input",
    id:"tocInputField",
    attributes: {"type":"text"}
  })

  const tocCodeSearch = htmlElementCreation(document,{
    classes: "toc--code-search",
    id:"tocCodeSearch",
    textContent: "❰ ❱"
  })

  const tocSearchContainer = htmlElementCreation(document,{
    id:"tocSearchContainer",
    children: [tocSearchBar,tocCodeSearch,tocToggleCustom]
  })
  
  const sliderElem = htmlElementCreation(document,{
    classes: "slider",
    id: "slider",
    attributes: {"draggable": true}
  });

  const tocToggleIcon = htmlElementCreation(document,{
    classes: "icon--slider",
    id:"slider-icon",
    textContent: "▶"
  }); 

	htmlElementCreation(document, {
		classes      : 'TOC',
		id           : 'TOC',
		insertBefore : document.getElementById('content'),
		children     : [ toggleContainerElem,tocSearchContainer, tocL2Container,sliderElem,tocToggleIcon ]
	});
}

function createDST(topic) {
	const level = parseInt(topic.tagName.substring(1));
	const { id, textContent, tagName } = topic;
	const topicInfo = {
		id,
		tagName,
		textContent,
		children    : [],
		childNum    : 1
	};

	let traverser = topic.nextElementSibling;

	while (traverser && traverser.tagName !== tagName) {
		if (traverser.tagName === `H${level + 1}`) topicInfo.children.push(traverser.id);
		traverser = traverser.nextElementSibling;
	}

	let _traverser = topic.previousElementSibling;
	while (_traverser && _traverser.tagName !== `H${level - 1}`) {
		if (_traverser.tagName === tagName) ++topicInfo.childNum;
		_traverser = _traverser.previousElementSibling;
	}
	topicInfo.parentId = _traverser.id;
	return topicInfo;
}

function createTOC(topicInfo, document) {
	const TOC = document.querySelector('#TOC .toc--L1');
	const { id, parentId, textContent, children, childNum, tagName } = topicInfo;

	// ? Add counter as the first child
	let tocItemChilds = [
		htmlElementCreation(document, {
			type        : 'span',
			classes     : 'toc--counter',
			textContent : childNum + '.'
		})
	];

	// ? Add the 🡇 toggle element in it contains
	if (children.length > 0) {
		tocItemChilds.push(
			htmlElementCreation(document, {
				type        : 'span',
				classes     : [ 'toc-toggle', 'icon--toggle' ],
				textContent : '🡇'
			})
		);
	}

	tocItemChilds.push(
		htmlElementCreation(document, {
			type        : 'span',
			attributes  : { href: id },
			textContent,
			classes     : 'toc--content'
		})
	);

	const tocContainerChilds = [
		htmlElementCreation(document, {
			classes  : [ `toc--L${tagName.substring(1)}-item`, 'toc-item' ],
			children : tocItemChilds,
			id       : id + '_container'
		})
	];

	if (children.length > 0)
		tocContainerChilds.push(
			htmlElementCreation(document, {
				classes : [ 'child-container' ]
			})
		);

	htmlElementCreation(document, {
		children   : tocContainerChilds,
		classes    : `toc--L${tagName.substring(1)}`,
		parentElem :
			parentId === 'chapter-name' ? TOC : document.querySelector(`#${parentId}_container + .child-container`)
	});
}

module.exports = {
	createTOCElem
};
