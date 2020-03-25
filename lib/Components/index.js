const { initialSetup, usePreviousSetup } = require('./setup');
const { addTOCSearch, tocButtonHandler } = require('./toc');
const {
	themeToggleHandler,
	clock_progressToggleHandler,
	extremePositionHandler,
	downloadAllCodeHandler,
	imageClickHandler,
	overlayClickHandler,
	blockClickEnlargenHandler,
	expand_collapseTocHandler,
	codeDisplayClickHandler,
	highlightLineHighlights,
	scrollIntoViewOutput,
	collapseLinks,
	codeIconHandlers
} = require('./handlers');

const { highlightTOCOnScroll, tocLinkHandler } = require('./toc');

const { tocDragHandler, dragSlider } = require('./slider');

const { addShortcuts, switchBlock } = require('./shortcut');

const { respositionLineHighlights, addLineHighlight } = require('./dom');

const { displayTime } = require('./utility');

window.onload = () => {
	setInterval(displayTime, 1000);
	// Initial Setups
	initialSetup();
	usePreviousSetup();

	// ? Manipulate dom elements
	addLineHighlight();
	respositionLineHighlights();

	// ? All event handlers
	themeToggleHandler();
	highlightLineHighlights();
	clock_progressToggleHandler();
	extremePositionHandler();
	imageClickHandler();
	downloadAllCodeHandler();
	overlayClickHandler();
	blockClickEnlargenHandler();
	expand_collapseTocHandler();
	codeDisplayClickHandler();
	scrollIntoViewOutput();
	collapseLinks();
	codeIconHandlers();

	tocButtonHandler();
	addTOCSearch();
	highlightTOCOnScroll();
	tocDragHandler();
	dragSlider();
	tocLinkHandler();
	addShortcuts();
	switchBlock();
};
