const AppContentButtons = require('../Content/Button/AppContentButtons');
const AppContentParagraph = require('./Paragraph/AppContentParagraph');
const AppContentList = require('./List/AppContentList');
const AppContentCode = require('./Code/AppContentCode');
const AppContentHeader = require('./Header/AppContentHeader');
const AppToc = require('../Toc/AppToc');

const { createChild, createSibling, createParent, tocItemCreation } = AppToc;

// 🔨
class AppContent {
	static decideDOMLevel(_traverser, _parent) {
		const traverserTag = _traverser.tagName;
		const parentLevel = parseInt(_parent.firstElementChild.tagName.substring(1));
		if (!traverserTag.match(/H[1-6]/)) return 1;
		else if (traverserTag === `H${parentLevel + 1}`) return 2;
		else if (traverserTag === `H${parentLevel}`) return 3;
		else if (traverserTag === `H${parentLevel - 1}`) return 4;
		else return 5;
	}

	create() {
		const _bodyChilds = [ ...Array.from(_app.children).slice(0, _app.children.length - 2) ];
		_bodyChilds[0].classList.add('chapter-header');
		let _parent = htmlElementCreation({
			classes      : 'chapter-container',
			id           : 'app_content',
			insertBefore : _bodyChilds[0],
			children     : _bodyChilds[0]
		});
		makeConstantProp('_app_content', _parent);
		let _tocParent = htmlElementCreation({
			parentElem : _app_toc,
			id         : 'app_toc_content',
			classes    : [ 'item-container', 'toc--L1-item-container' ],
			children   : tocItemCreation(1, _bodyChilds[0])
		});

		let _traverser = _parent.nextElementSibling;
		let last_header_level = 1;
		while (_traverser && _traverser.id !== 'app_toc') {
			const domLevel = AppContent.decideDOMLevel(_traverser, _parent);
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
				AppContent.checkForChildren(_tocParent);
				_tocParent = createSibling(_tocParent, _traverser);
				_parent.parentElement.appendChild(_traverser);
				_parent = htmlElementCreation({
					insertBefore : _traverser,
					children     : _traverser
				});
			}
			else if (domLevel === 4) {
				last_header_level = _traverser.tagName.substring(1);
				AppContent.checkForChildren(_tocParent);
				_tocParent = createParent(_tocParent, _traverser);
				_parent = htmlElementCreation({
					parentElem : _parent.parentElement.parentElement,
					children   : _traverser
				});
			}
			else if (domLevel === 5) {
				let diff = parseInt(last_header_level) - parseInt(_traverser.tagName.substring(1));
				AppContent.checkForChildren(_tocParent);
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
			AppContent.preprocessElement(_traverser);
			_traverser = _app.children[1];
		}

		const _tocToggles = _app_toc.querySelectorAll('.toc-toggle');
		_tocToggles[_tocToggles.length - 1].parentElement.removeChild(_tocToggles[_tocToggles.length - 1]);
		AppContent.checkForChildren(_tocParent);
		AppContent.createTopBottomElement();
		new AppContentButtons().create();
	}

	static preprocessElement(element) {
		if (element.tagName === 'P') AppContentParagraph.parse(element);
		else if (element.tagName.match(/H[1-6]/)) AppContentHeader.parse(element);
		else if (element.tagName === 'PRE') AppContentCode.parse(element);
		else if (element.tagName === 'UL') AppContentList.parse(element);
		return element;
	}

	static createTopBottomElement() {
		htmlElementCreation({
			id           : 'app_content_top',
			insertBefore : _app_content.children[0]
		});
		htmlElementCreation({
			id         : 'app_content_bottom',
			parentElem : _app_content
		});
	}

	static checkForChildren(_parent) {
		const _childContainer = _parent.children[1];
		if (_childContainer.children.length === 0) {
			const _itemContainer = _parent.children[0];
			const _toggleIcon = _itemContainer.children[1];
			_toggleIcon.parentElement.removeChild(_toggleIcon);
			_parent.removeChild(_childContainer);
		}
	}
}

module.exports = AppContent;
