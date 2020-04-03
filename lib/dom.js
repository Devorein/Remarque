const { htmlElementCreation, createElementFromHTML } = require('./utility');
const { decideDOMLevel, parseParagraph, parseHeader, parseCode, parseList, addBlockClass } = require('./parser');
const { tocItemCreation, addTOCItems, preprocessTOC } = require('./toc');
const { getFontData, getCSSData, getExJSData, getSVGData, SOUNDS, ICONS } = require('./file');

const { createChild, createSibling, createParent } = addTOCItems;

function postProcessDOM() {
	BODY.id = 'preview';
	htmlElementCreation({ type: 'title', textContent: CHAPTER_NAME, parentElem: document.head });
	document.head.append(
		...createElementFromHTML(`
      <link rel = "icon" type="image/x-icon" href="data:image/png;base64,${ICONS.favicon32}">
    `)
	);
	addCSS();
	addCustomScripts();
	createAdditionalElem();
}

function addCSS() {
	// ? Add custom css styles
	const overpassFont = getFontData('Overpass');
	const firasansFont = getFontData('FiraSans');
	htmlElementCreation({
		type        : 'style',
		textContent : `
      @font-face{
        font-family: Overpass;
        src: url("data:application/x-font-woff;charset=utf-8;base64,${overpassFont}") format("woff");
      }
      @font-face{
        font-family: Fira Sans;
        src: url("data:application/x-font-woff;charset=utf-8;base64,${firasansFont}") format("woff");
      }
    `,
		parentElem  : document.head
	});

	const cssStyles = getCSSData('style');
	htmlElementCreation({
		type        : 'style',
		textContent : cssStyles,
		parentElem  : document.head
	});
}

function createClockElement() {
	return htmlElementCreation({
		id       : 'clockContainer',
		children : [
			htmlElementCreation({
				id : 'clockPlayPause'
			}),
			htmlElementCreation({
				id       : 'clockRestart',
				children : [ ...createElementFromHTML(getSVGData('restart')) ]
			}),
			htmlElementCreation({
				id : 'clock'
			})
		]
	});
}

function createProgressElement() {
	return htmlElementCreation({
		id       : 'progressContainer',
		children : [
			htmlElementCreation({
				id : 'progressBar'
			}),
			htmlElementCreation({
				id : 'progressCounter'
			})
		]
	});
}

// ? Add additional HTML Elements to the body
function createAdditionalElem() {
	const additionalHTML = `
    <div id="overlay">
      ${getSVGData('cross')}
      <div id="overlayCounter"></div>
      <div id="overlayNextIcon">▶</div>
      <div id="overlayPrevIcon">◀</div>
      <div id="overlayPrevUniqueIcon">◀</div>
      <div id="overlayNextUniqueIcon">◀</div>
    </div>
    <div class="dropzone" id = "dropzone-left"></div>
    <div class="dropzone" id = "dropzone-right"></div>
  `;

	createElementFromHTML(additionalHTML).forEach(elem => {
		BODY.appendChild(elem);
	});
}

// ? Create the necessary block containers
// 🔨 Add it to preprocessDOM
function groupBlocks() {
	const _TOC = document.querySelector('.toc--L1-item-container.item-container .child-container');
	const html = `
	<div class="item-container toc--L2-item-container">
    <div class="toc--L2-item toc-item">
      <span class="checkmark"></span>
	    <span class="toc--counter">${_TOC.children.length + 1}</span>
	    <span class="toc--toggle">🡇</span>
	    <span class="toc--content" href="blocksContainer">Groups</span>
	  </div>
	  <div class="child-container"></div>
	</div>
	`;
	const _childContainer = _TOC.appendChild(createElementFromHTML(html)[0]).children[1];

	const blocks = [ 'definition', 'info', 'tip', 'note', 'important', 'warning' ];
	const blockContainer = htmlElementCreation({
		id         : 'blocksContainer',
		classes    : 'blocks-container',
		parentElem : document.getElementById('content')
	});
	for (let block of blocks) {
		const BlockHeader = htmlElementCreation({
			type        : 'h2',
			textContent : block.charAt(0).toUpperCase() + block.substring(1) + 's',
			id          : `${block}s-header`,
			classes     : 'block-header'
		});

		htmlElementCreation({
			classes        : [ `block-container--${block}`, `block-container` ],
			children       : [ BlockHeader ],
			id             : `${block}blockContainer`,
			clonedChildren : Array.from(document.querySelectorAll(`.${block}-block`)),
			parentElem     : blockContainer
		});
		_childContainer.appendChild(
			createElementFromHTML(
				`<div class="item-container toc--L3-item-container">
          <div class="toc--L3-item toc-item">
            <span class="checkmark"></span>
            <span class="toc--counter">${_childContainer.children.length + 1}.</span>
            <span class="toc--content" href="${block}blockContainer">${block.charAt(0).toUpperCase() +
					block.substring(1)}</span>
          </div>
        </div>`
			)[0]
		);
	}
}

function addContentElements() {
	const _CONTENT = document.getElementById('content');
	htmlElementCreation({
		id           : 'top',
		insertBefore : _CONTENT.children[0]
	});
	_CONTENT.append(
		createClockElement(),
		createProgressElement(),
		htmlElementCreation({
			id         : 'bottom',
			parentElem : document.getElementById('content')
		})
	);
}

// Arden Algo
function preprocessDOM() {
	preprocessTOC();
	const TOC = document.getElementById('TOC');
	const _bodyChilds = [ ...BODY.children ];
	_bodyChilds[0].classList.add('chapter-header');
	let _parent = htmlElementCreation({
		classes      : 'chapter-container',
		id           : 'content',
		insertBefore : _bodyChilds[0],
		children     : _bodyChilds[0]
	});
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
		_traverser = BODY.children[1];
	}
	checkForChildren(_tocParent);

	addContentElements();
	groupBlocks();
	addSounds();
}

function addSounds() {
	htmlElementCreation({
		type       : 'audio',
		attributes : {
			controls : true,
			src      : `data:audio/mp3;base64,${SOUNDS.click}`
		},
		id         : 'clickSound',
		parentElem : document.body
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

function addCustomScripts() {
	const prismJS = getExJSData('prism');
	[ indexJS, prismJS ].forEach(textContent => {
		htmlElementCreation({
			type        : 'script',
			textContent,
			parentElem  : BODY
		});
	});
}

module.exports = {
	preprocessDOM,
	postProcessDOM
};
