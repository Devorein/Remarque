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
	highlightTOCOnScroll,
	tocLinkHandler,
	highlightLineHighlights,
	scrollIntoViewOutput,
	collapseLinks
} = require('./handler');

const { tocDragHandler, dragSlider } = require('./slider');

const { addShortcuts, switchBlock } = require('./shortcut');

const { respositionLineHighlights, addCopyIcons, addDownloadIcons, addLineHighlight } = require('./dom');

const { displayTime } = require('./utility');

window.onload = () => {
	setInterval(displayTime, 1000);
	// Initial Setups
	initialSetup();
	usePreviousSetup();

	// ? Manipulate dom elements
	addCodeIcons();
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

	tocButtonHandler();
	addTOCSearch();
	highlightTOCOnScroll();
	tocDragHandler();
	dragSlider();
	tocLinkHandler();
	addShortcuts();
	switchBlock();
};
