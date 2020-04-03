const { initialSetup } = require('./setup');
const { addTOCSearch, tocButtonHandler } = require('./toc');
const { imageClickHandler } = require('./image');
const { overlayHandlers } = require('./overlay');
const {
	clock_progressClickToggleVisibility,
	themeIClickToggleTheme,
	downloadCodesIClickDownloadCodes,
	tocToggleHandler,
	toc_exp_colIClickExp_colTocitems,
	positionIsClickScrollContent
} = require('./button');
const {
	toggleFileSystem,
	code_copyIClickCopiesCode,
	code_downloadIClickDownloadsCode,
	keepCodeIconsAtSamePlace,
	highlightLineHighlights,
	scrollIntoViewOutput,
	codeDisplayClickHandler,
	showFile,
	fileChildrenToggle
} = require('./code');
const { highlightTOCOnScroll, toc_linkClickScrollLink, toc_item_toggleIClickTogglesChildDisplay } = require('./toc');
const { tocDragHandler, dragSlider } = require('./slider');
const { addShortcuts } = require('./shortcut');
const { displayTime } = require('./utility');

window.onload = () => {
	setInterval(displayTime, 1000);
	// Initial Setups
	initialSetup();

	themeIClickToggleTheme();
	clock_progressClickToggleVisibility();
	positionIsClickScrollContent();
	downloadCodesIClickDownloadCodes();
	toc_exp_colIClickExp_colTocitems();
	toc_item_toggleIClickTogglesChildDisplay();
	code_copyIClickCopiesCode();
	code_downloadIClickDownloadsCode();
	toc_linkClickScrollLink();
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
