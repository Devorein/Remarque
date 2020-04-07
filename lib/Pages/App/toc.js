let { createElementFromHTML, htmlElementCreation, makeConstantProp } = require('../../utility');
let { getSVGData } = require('../../file');

const expandIcon = getSVGData('expand');
const collapseIcon = getSVGData('collapse');
const codeDisplayIcon = getSVGData('matrix');
const bottomIcon = getSVGData('bottom');
const topIcon = getSVGData('top');
const downloadAllIcon = getSVGData('downloadAll');
const clockIcon = getSVGData('clock');
const progressIcon = getSVGData('progress');
const transferIcon = getSVGData('transfer');
const zenIcon = getSVGData('zen');
const dragIcon = getSVGData('drag');
const settingsIcon = getSVGData('settings');
const groupsIcon = getSVGData('box');

const additionalHTML = `
  <div id="theme-icon-container">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 184 184" id="theme-icon" class="icon"><defs><style>.cls-1{fill:#32578e;}.cls-2{fill:#0f315b;}</style></defs><title>Asset 1</title><g  data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><circle class="cls-1" cx="92" cy="92" r="92"/><circle class="cls-2" cx="104.4" cy="33.8" r="12.4"/><circle class="cls-2" cx="42.2" cy="38.1" r="7.5"/><circle class="cls-2" cx="110.1" cy="161.5" r="5.7"/><circle class="cls-2" cx="49.7" cy="81.7" r="5.7"/><circle class="cls-2" cx="49.7" cy="125.6" r="5.7"/><circle class="cls-2" cx="70.6" cy="64" r="7.5"/><circle class="cls-2" cx="22.5" cy="81.7" r="9.9"/><circle class="cls-2" cx="156.6" cy="106.5" r="9.9"/><circle class="cls-2" cx="46.3" cy="145.8" r="9.9"/></g></g></svg>
  </div>
  ${expandIcon}
  ${collapseIcon}
  ${codeDisplayIcon}
  ${topIcon}
  ${bottomIcon}
  ${downloadAllIcon}
  ${progressIcon}
  ${clockIcon}
  ${transferIcon}
  <div draggable="true" id="dragIcon" class="icon">${dragIcon}</div>
  <div class="icon" id="tocToggleIcon">◀</div>
  ${zenIcon}
  ${settingsIcon}
  ${groupsIcon}
`;

function processTOC() {
	// 🔨 Make it an svg
	const tocToggleCustom = htmlElementCreation({
		textContent : '➥',
		id          : 'tocToggleCustomIcon'
	});

	const tocItemStatus = htmlElementCreation({
		id       : 'tocItemStatus',
		children : [
			htmlElementCreation({
				id          : 'tocSelectedItems',
				textContent : 0
			}),
			htmlElementCreation({
				id          : 'tocHiddenItems',
				textContent : 0
			}),
			htmlElementCreation({
				id          : 'tocTotalItems',
				textContent : 0
			})
		]
	});

	const tocSearchBar = htmlElementCreation({
		type       : 'input',
		classes    : [ 'toc--input', 'icon' ],
		id         : 'tocInputField',
		attributes : { type: 'text', autocomplete: 'off' }
	});

	const tocCodeSearch = htmlElementCreation({
		classes     : [ 'toc--code-search', 'icon' ],
		id          : 'tocCodeSearchIcon',
		textContent : '❰ ❱'
	});

	const searchIgnoreCap = htmlElementCreation({
		classes     : [ 'icon' ],
		id          : 'searchIgnoreCapIcon',
		textContent : 'Aa'
	});

	const searchUseRegex = htmlElementCreation({
		classes  : [ 'icon' ],
		id       : 'searchUseRegexIcon',
		children : [ createElementFromHTML(getSVGData('regex'))[0] ]
	});

	const tocSearchContainer = htmlElementCreation({
		id       : 'tocSearchContainer',
		children : [
			tocSearchBar,
			tocItemStatus,
			htmlElementCreation({
				id       : 'tocButtonContainer',
				children : [ tocCodeSearch, tocToggleCustom, searchIgnoreCap, searchUseRegex ]
			})
		]
	});

	const sliderElem = htmlElementCreation({
		classes    : 'slider',
		id         : 'slider',
		attributes : { draggable: true }
	});

	const settingsContainer = htmlElementCreation({
		id       : 'settingsContainer',
		children : [
			...createElementFromHTML(additionalHTML).map(elem => {
				return elem;
			})
		]
	});

	makeConstantProp(
		'TOC',
		htmlElementCreation({
			classes    : 'TOC',
			id         : 'TOC',
			parentElem : APP,
			children   : [ tocSearchContainer, sliderElem, settingsContainer ]
		})
	);
}

function tocItemCreation(childNum, { textContent, id, tagName }) {
	return [
		...createElementFromHTML(`
    <div class = "toc--L${tagName.substring(1)}-item toc-item" item-num="${TOC.querySelectorAll('.toc-item').length +
			1}">
      <span class="checkmark"></span>
      <span class = "toc--counter">${childNum === 0 ? 1 + '.' : childNum + '.'}</span>
      <span class = "toc-toggle icon--toggle">🡇</span>
      <span href=${id} class="toc--content">${textContent}</span>
    </div>
    <div class="child-container"></div>
    `)
	];
}

const addTOCItems = {
	createChild(_tocParent, _traverser) {
		return htmlElementCreation({
			parentElem : _tocParent.querySelector('.child-container'),
			classes    : [ `toc--L${_traverser.tagName.substring(1)}-item-container`, 'item-container' ],
			children   : tocItemCreation(_tocParent.querySelector('.child-container').children.length, _traverser)
		});
	},
	createSibling(_tocParent, _traverser) {
		const _prevParent = _tocParent.parentElement;
		if (_prevParent.children.length === 0) {
			const toggle = _prevParent.previousElementSibling.querySelector('.toc-toggle.icon--toggle');
			toggle.parentElement.removeChild(toggle);
		}
		return htmlElementCreation({
			parentElem : _prevParent,
			classes    : [ `toc--L${_traverser.tagName.substring(1)}-item-container`, 'item-container' ],
			children   : tocItemCreation(_prevParent.children.length + 1, _traverser)
		});
	},
	createParent(_tocParent, _traverser) {
		const _prevParent = _tocParent.parentElement.parentElement.parentElement;
		if (_prevParent.children.length === 0) {
			const toggle = _prevParent.previousElementSibling.querySelector('.toc-toggle.icon--toggle');
			toggle.parentElement.removeChild(toggle);
		}
		return htmlElementCreation({
			parentElem : _prevParent,
			classes    : [ `toc--L${_traverser.tagName.substring(1)}-item-container`, 'item-container' ],
			children   : tocItemCreation(_prevParent.children.length + 1, _traverser)
		});
	}
};

module.exports = {
	tocItemCreation,
	addTOCItems,
	processTOC
};
