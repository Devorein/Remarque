const AppTocButtons = require('./Button/AppTocButtons');
const AppTocSearch = require('./Search/AppTocSearch');
const AppTocSlider = require('./Slider/AppTocSlider');
const AppTocContent = require('./Content/AppTocContent');

class AppToc {
	create() {
		makeConstantProp(
			'_app_toc',
			htmlElementCreation({
				id         : 'app_toc',
				parentElem : _app
			})
		);

		new AppTocSlider().create();
		new AppTocButtons().create();
		new AppTocSearch().create();
		new AppTocContent().create();
	}

	static createChild(_tocParent, _traverser) {
		return htmlElementCreation({
			parentElem : _tocParent.querySelector('.child-container'),
			classes    : [ `toc--L${_traverser.tagName.substring(1)}-item-container`, 'item-container' ],
			children   : AppToc.tocItemCreation(
				_tocParent.querySelector('.child-container').children.length,
				_traverser
			)
		});
	}
	static createSibling(_tocParent, _traverser) {
		const _prevParent = _tocParent.parentElement;
		if (_tocParent.children.length === 1) {
			const toggle = _tocParent.querySelector('.toc-toggle.icon--toggle');
			toggle.parentElement.removeChild(toggle);
		}
		return htmlElementCreation({
			parentElem : _prevParent,
			classes    : [ `toc--L${_traverser.tagName.substring(1)}-item-container`, 'item-container' ],
			children   : AppToc.tocItemCreation(_prevParent.children.length + 1, _traverser)
		});
	}
	static createParent(_tocParent, _traverser) {
		const _prevParent = _tocParent.parentElement.parentElement.parentElement;
		if (_tocParent.children.length === 1) {
			const toggle = _tocParent.querySelector('.toc-toggle.icon--toggle');
			toggle.parentElement.removeChild(toggle);
		}
		return htmlElementCreation({
			parentElem : _prevParent,
			classes    : [ `toc--L${_traverser.tagName.substring(1)}-item-container`, 'item-container' ],
			children   : AppToc.tocItemCreation(_prevParent.children.length + 1, _traverser)
		});
	}

	static tocItemCreation(childNum, { textContent, id, tagName }) {
		const _checkmark = createElementFromHTML(BUTTONS['check'])[0];
		return [
			...createElementFromHTML(`
      <div class = "toc--L${tagName.substring(1)}-item app_toc_content_item" item-num="${_app_toc.querySelectorAll(
				'.app_toc_content_item'
			).length + 1}">
        <span class="checkmark app_toc_content_item_checkmark">${_checkmark.outerHTML}</span>
        <span class = "toc--counter app_toc_content_item_counter">${childNum === 0 ? 1 + '.' : childNum + '.'}</span>
        <span class = "toc-toggle icon--toggle app_toc_content_item_toggle">🡇</span>
        <span href=${id} class="toc--content app_toc_content_item_content">${textContent}</span>
      </div>
      <div class="child-container app_toc_content_item_children"></div>
      `)
		];
	}
}

module.exports = AppToc;
