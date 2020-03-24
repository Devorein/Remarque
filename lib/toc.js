const fs = require('fs');
const path = require('path');

let { createElementFromHTML, htmlElementCreation } = require('./utility');

const svgDir = path.join(__dirname, 'Components', 'svgs');
const expandIcon = fs.readFileSync(path.join(svgDir, 'expand.svg'));
const collapseIcon = fs.readFileSync(path.join(svgDir, 'collapse.svg'));
const codeDisplayIcon = fs.readFileSync(path.join(svgDir, 'matrix.svg'));
const bottomIcon = fs.readFileSync(path.join(svgDir, 'bottom.svg'));
const topIcon = fs.readFileSync(path.join(svgDir, 'top.svg'));
const downloadIcon = fs.readFileSync(path.join(svgDir, 'download.svg'));
const clockIcon = fs.readFileSync(path.join(svgDir, 'clock.svg'));
const progressIcon = fs.readFileSync(path.join(svgDir, 'progress.svg'));

const additionalHTML = `
  <div id="theme-icon-container">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 184 184" id="theme-icon" class="icon"><defs><style>.cls-1{fill:#32578e;}.cls-2{fill:#0f315b;}</style></defs><title>Asset 1</title><g  data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><circle class="cls-1" cx="92" cy="92" r="92"/><circle class="cls-2" cx="104.4" cy="33.8" r="12.4"/><circle class="cls-2" cx="42.2" cy="38.1" r="7.5"/><circle class="cls-2" cx="110.1" cy="161.5" r="5.7"/><circle class="cls-2" cx="49.7" cy="81.7" r="5.7"/><circle class="cls-2" cx="49.7" cy="125.6" r="5.7"/><circle class="cls-2" cx="70.6" cy="64" r="7.5"/><circle class="cls-2" cx="22.5" cy="81.7" r="9.9"/><circle class="cls-2" cx="156.6" cy="106.5" r="9.9"/><circle class="cls-2" cx="46.3" cy="145.8" r="9.9"/></g></g></svg>
  </div>
  ${expandIcon}
  ${collapseIcon}
  ${codeDisplayIcon}
  ${topIcon}
  ${bottomIcon}
  ${downloadIcon}
  ${progressIcon}
  ${clockIcon}
`;

function createTOCElem() {
	preprocessTOC();
	Array.from(document.querySelectorAll('h2,h3,h4,h5,h6')).forEach((topic) => {
		createTOC(createDST(topic));
	});
}

function preprocessTOC() {
	const tocToggleCustom = htmlElementCreation(document, {
		textContent : '➥',
		id          : 'tocToggleCustom'
	});

	const tocItemStatus = htmlElementCreation(document, {
		id       : 'tocItemStatus',
		children : [
			htmlElementCreation(document, {
				id          : 'tocHiddenItems',
				textContent : 0
			}),
			htmlElementCreation(document, {
				id          : 'tocTotalItems',
				textContent : 0
			})
		]
	});

	const tocL2Container = htmlElementCreation(document, {
		classes : 'toc--L1'
	});

	const tocSearchBar = htmlElementCreation(document, {
		type       : 'input',
		classes    : [ 'toc--input', 'icon' ],
		id         : 'tocInputField',
		attributes : { type: 'text' }
	});

	const tocCodeSearch = htmlElementCreation(document, {
		classes     : [ 'toc--code-search', 'icon' ],
		id          : 'tocCodeSearch',
		textContent : '❰ ❱'
	});

	const searchIgnoreCap = htmlElementCreation(document, {
		classes     : [ 'icon' ],
		id          : 'searchIgnoreCap',
		textContent : 'Aa'
	});

	const tocSearchContainer = htmlElementCreation(document, {
		id       : 'tocSearchContainer',
		children : [ tocSearchBar, tocItemStatus, tocCodeSearch, tocToggleCustom, searchIgnoreCap ]
	});

	const sliderElem = htmlElementCreation(document, {
		classes    : 'slider',
		id         : 'slider',
		attributes : { draggable: true }
	});

	const settingsContainer = htmlElementCreation(document, {
		id       : 'settingsContainer',
		children : [
			...createElementFromHTML(document, additionalHTML).map((elem) => {
				return elem;
			})
		]
	});

	htmlElementCreation(document, {
		classes      : 'TOC',
		id           : 'TOC',
		insertBefore : document.getElementById('content'),
		children     : [ tocSearchContainer, tocL2Container, sliderElem, settingsContainer ]
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

function createTOC(topicInfo) {
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
