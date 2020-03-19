let { htmlElementCreation } = require('./utility');

function createTOCElem(document) {
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

	const toggleCustomIcon = htmlElementCreation(document, {
		textContent : '➥',
		classes     : 'icon--custom-toggle'
	});

	const tocL2Container = htmlElementCreation(document, {
		classes : 'toc--L1'
	});

	htmlElementCreation(document, {
		classes      : 'TOC',
		id           : 'TOC',
		insertBefore : document.getElementById('content'),
		children     : [ toggleContainerElem, toggleCustomIcon, tocL2Container ]
	});

	const DST = [];

	Array.from(document.querySelectorAll('h2,h3,h4,h5,h6')).forEach((topic) => {
		const level = parseInt(topic.tagName.substring(1));
		const { id, textContent, tagName } = topic;
		const topicInfo = {
			id,
			tagName,
			textContent,
			children    : [],
			childNum    : 0
		};

		let traverser = topic;

		while (traverser.previousElementSibling && traverser.previousElementSibling.tagName !== `H${level - 1}`)
			traverser = traverser.previousElementSibling;
		topicInfo.parentId = traverser.previousElementSibling.id;
		DST.push(topicInfo);
	});

	DST.forEach((elem, index) => {
		let _index = 0;
		for (let i = index; i >= 0; i--) {
			const prev_level = parseInt(DST[i].tagName.substring(1));
			const cur_level = parseInt(elem.tagName.substring(1));
			if (cur_level > prev_level) break;
			if (cur_level == prev_level) _index++;
		}
		elem.childNum = _index;
	});

	DST.forEach((elem, index) => {
		for (let i = index + 1; i < DST.length; i++) if (DST[i].parentId === elem.id) elem.children.push(DST[i].id);
	});

	DST.forEach((elem) => {
		const TOC = document.querySelector('#TOC .toc--L1');
		const { id, parentId, textContent, children, childNum, tagName } = elem;

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

		const contentElem = htmlElementCreation(document, {
			type        : 'span',
			attributes  : { href: id },
			textContent,
			classes     : 'toc--content'
		});

		tocItemChilds.push(contentElem);

		const tocItemElem = htmlElementCreation(document, {
			classes  : [ `toc--L${tagName.substring(1)}-item`, 'toc-item' ],
			children : tocItemChilds,
			id       : id + '_container'
		});

		const tocContainerChilds = [ tocItemElem ];

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
	});
}

module.exports = {
	createTOCElem
};
