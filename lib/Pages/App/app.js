const { makeConstantProp, htmlElementCreation, createElementFromHTML } = require('../../utility');
const { getSVGData } = require('../../file');
const { decideDOMLevel, parseParagraph, parseHeader, parseCode, parseList, addBlockClass } = require('../../parser');
const { tocItemCreation, addTOCItems, processTOC } = require('./toc');
const { createChild, createSibling, createParent } = addTOCItems;

function addAppPage() {
	makeConstantProp(
		'APP',
		BODY.appendChild(
			htmlElementCreation({
				id       : 'app',
				classes  : 'page',
				children : [ ...BODY.children ]
			})
		)
	);
	processTOC();
	const _bodyChilds = [ ...APP.children ];
	_bodyChilds[0].classList.add('chapter-header');
	let _parent = htmlElementCreation({
		classes      : 'chapter-container',
		id           : 'content',
		insertBefore : _bodyChilds[0],
		children     : _bodyChilds[0]
	});
	makeConstantProp('CONTENT', _parent);
	let _tocParent = htmlElementCreation({
		parentElem : TOC,
		classes    : [ 'item-container', 'toc--L1-item-container' ],
		children   : tocItemCreation(1, _bodyChilds[0])
	});

	let _traverser = _parent.nextElementSibling;
	let last_header_level = 1;
	while (_traverser && _traverser.id !== 'TOC') {
		const domLevel = decideDOMLevel(_traverser, _parent);
		if (domLevel === 1) _parent.appendChild(_traverser);
		else if (domLevel === 2) {
			last_header_level = _traverser.tagName.substring(1);
			_tocParent = createChild(_tocParent, _traverser);
			_parent.appendChild(_traverser);
			_parent = htmlElementCreation({
				insertBefore : _traverser,
				children     : _traverser
			});
		}
		else if (domLevel === 3) {
			last_header_level = _traverser.tagName.substring(1);
			checkForChildren(_tocParent);
			_tocParent = createSibling(_tocParent, _traverser);
			_parent.parentElement.appendChild(_traverser);
			_parent = htmlElementCreation({
				insertBefore : _traverser,
				children     : _traverser
			});
		}
		else if (domLevel === 4) {
			last_header_level = _traverser.tagName.substring(1);
			checkForChildren(_tocParent);
			_tocParent = createParent(_tocParent, _traverser);
			_parent = htmlElementCreation({
				parentElem : _parent.parentElement.parentElement,
				children   : _traverser
			});
		}
		else if (domLevel === 5) {
			let diff = parseInt(last_header_level) - parseInt(_traverser.tagName.substring(1));
			checkForChildren(_tocParent);
			while (diff-- !== 0) {
				_parent = _parent.parentElement;
				_tocParent = _tocParent.parentElement;
			}
			_tocParent = createParent(_tocParent, _traverser);
			_parent = htmlElementCreation({
				parentElem : _parent.parentElement,
				children   : _traverser
			});
		}
		preprocessElement(_traverser);
		_traverser = APP.children[1];
	}
	checkForChildren(_tocParent);
	createClockElement();
	createProgressElement();
	createTopBottomElement();
	createDropzones();
}

function createTopBottomElement() {
	htmlElementCreation({
		id           : 'top',
		insertBefore : CONTENT.children[0]
	});
	htmlElementCreation({
		id         : 'bottom',
		parentElem : CONTENT
	});
}

function createClockElement() {
	return htmlElementCreation({
		id         : 'clockContainer',
		children   : [
			htmlElementCreation({
				id : 'clockPlayPause'
			}),
			htmlElementCreation({
				id       : 'clockRestart',
				children : [ ...createElementFromHTML(getSVGData('restart')) ]
			}),
			htmlElementCreation({
				id       : 'clockPosition',
				children : [ ...createElementFromHTML(getSVGData('transfer')) ]
			}),
			htmlElementCreation({
				id : 'clock'
			})
		],
		parentElem : APP
	});
}

function createProgressElement() {
	return htmlElementCreation({
		id         : 'progressContainer',
		children   : [
			htmlElementCreation({
				id : 'progressBar'
			}),
			htmlElementCreation({
				id : 'progressCounter'
			})
		],
		parentElem : APP
	});
}

function checkForChildren(_parent) {
	const _childContainer = _parent.children[1];
	if (_childContainer.children.length === 0) {
		const _itemContainer = _parent.children[0];
		const _toggleIcon = _itemContainer.children[1];
		_toggleIcon.parentElement.removeChild(_toggleIcon);
		_parent.removeChild(_childContainer);
	}
}

function preprocessElement(element) {
	if (element.tagName === 'P') parseParagraph(addBlockClass(element));
	else if (element.tagName.match(/H[1-6]/)) parseHeader(element);
	else if (element.tagName === 'PRE') parseCode(element);
	else if (element.tagName === 'UL') parseList(element);
	return element;
}

function createDropzones() {
	APP.append(createElementFromHTML(`<div class="dropzone" id = "dropzone-left"></div>`)[0]);
	APP.append(createElementFromHTML(`<div class="dropzone" id = "dropzone-right"></div>`)[0]);
}

module.exports = {
	addAppPage
};
