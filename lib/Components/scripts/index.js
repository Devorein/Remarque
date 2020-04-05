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
	positionIsClickScrollContent,
	transferIClickSwtichTocPos,
	zen_modeIClickTogglesZenMode
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
	fileChildrenToggle,
	highlight_lineClickScrollsLine
} = require('./code');
const {
	highlightTOCOnScroll,
	toc_linkClickScrollLink,
	toc_item_toggleIClickTogglesChildDisplay,
	toc_item_checkboxClickSelectItem
} = require('./toc');
const { tocDragHandler, dragSlider } = require('./slider');
const { addShortcuts } = require('./shortcut');
const { simulateClick } = require('./utility');
const { play_pause_clockListener, restart_clockIHandler } = require('./clock');

window.onload = () => {
	initialSetup();
	transferIClickSwtichTocPos();
	themeIClickToggleTheme();
	clock_progressClickToggleVisibility();
	positionIsClickScrollContent();
	downloadCodesIClickDownloadCodes();
	toc_exp_colIClickExp_colTocitems();
	toc_item_checkboxClickSelectItem();
	highlight_lineClickScrollsLine();
	play_pause_clockListener();
	restart_clockIHandler();
	toc_item_toggleIClickTogglesChildDisplay();
	code_copyIClickCopiesCode();
	code_downloadIClickDownloadsCode();
	zen_modeIClickTogglesZenMode();
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
