const { htmlElementCreation, createElementFromHTML } = require('./utility');
const { getFontData, getCSSData, SOUNDS, ICONS } = require('./file');
const { addSettingsPage } = require('./Pages/Settings/settings');
const { addGroupsPage } = require('./Pages/Groups/groups');
const { addAppPage } = require('./Pages/App/app');

function addCSS() {
	// ? Add custom css styles
	const overpassFont = getFontData('Overpass');
	const firasansFont = getFontData('FiraSans');

	const cssStyles = `${getCSSData('style')}
    @font-face{
      font-family: Overpass;
      src: url("data:application/x-font-woff;charset=utf-8;base64,${overpassFont}") format("woff");
    }
    @font-face{
      font-family: Fira Sans;
      src: url("data:application/x-font-woff;charset=utf-8;base64,${firasansFont}") format("woff");
    }
  `;
	htmlElementCreation({
		type        : 'style',
		textContent : cssStyles,
		parentElem  : document.head
	});
}

// Arden Algo
function processDOM() {
	htmlElementCreation({ type: 'title', textContent: CHAPTER_NAME, parentElem: document.head });
	document.head.append(
		...createElementFromHTML(`
    <link rel = "icon" type="image/x-icon" href="data:image/png;base64,${ICONS.favicon32}">
  `)
	);
	addGroupsPage();
	addSettingsPage();
	addAppPage();
	addSounds();
	addCSS();
	addCustomScripts();
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

function addCustomScripts() {
	htmlElementCreation({
		type        : 'script',
		textContent : indexJS,
		parentElem  : BODY
	});
}

module.exports = {
	processDOM
};
