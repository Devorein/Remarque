const { initialSetup, usePreviousSetup } = require('./setup');
const { addTOCSearch, tocButtonHandler } = require('./toc');
const {
	themeIClickToggleTheme,
	clock_progressClickToggleVisibility,
	positionIsClickScrollContent,
	downloadCodesIClickDownloadCodes,
	imageClickHandler,
	toc_exp_colIClickExp_colTocitems,
	codeDisplayClickHandler,
	highlightLineHighlights,
	scrollIntoViewOutput,
	keepCodeIconsAtSamePlace,
	toc_item_toggleIClickTogglesChildDisplay,
	code_copyIClickCopiesCode,
	code_downloadIClickDownloadsCode,
	fileChildrenToggle,
	showFile,
	toggleFileSystem,
	tocToggleHandler,
	overlayHandlers
} = require('./handlers');

const { highlightTOCOnScroll, toc_linkClickScrollLink } = require('./toc');

const { tocDragHandler, dragSlider } = require('./slider');

const { addShortcuts } = require('./shortcut');

const { displayTime } = require('./utility');

window.onload = () => {
	setInterval(displayTime, 1000);
	// Initial Setups
	initialSetup();
	usePreviousSetup();

	themeIClickToggleTheme();
	clock_progressClickToggleVisibility();
	positionIsClickScrollContent();
	downloadCodesIClickDownloadCodes();
	toc_exp_colIClickExp_colTocitems();
	toc_item_toggleIClickTogglesChildDisplay();
	code_copyIClickCopiesCode();
	code_downloadIClickDownloadsCode();
	// toc_linkClickScrollLink();
	addShortcuts();
	overlayHandlers();
	imageClickHandler();
	tocButtonHandler();
	addTOCSearch();
	highlightTOCOnScroll();
	fileChildrenToggle();
	highlightLineHighlights();
	codeDisplayClickHandler();
	scrollIntoViewOutput();
	keepCodeIconsAtSamePlace();
	tocDragHandler();
	dragSlider();
	showFile();
	toggleFileSystem();
	tocToggleHandler();
};
