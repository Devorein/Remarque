const { getFontData, getCSSData, SOUNDS } = require('./file');
const Settings = require('./Components/Settings/Settings');
const Groups = require('./Components/Groups/Groups');
const App = require('./Components/App/App');
const Buttons = require('./Components/Buttons/Buttons');

class DOM {
	static addCSS() {
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

	static addSounds() {
		htmlElementCreation({
			type       : 'audio',
			attributes : {
				controls : true,
				src      : `data:audio/mp3;base64,${SOUNDS.click}`
			},
			id         : 'clickSound',
			parentElem : BODY
		});
	}

	static addCustomScripts() {
		htmlElementCreation({
			type        : 'script',
			textContent : indexJS,
			parentElem  : BODY
		});
	}

	static processDOM(chapter) {
		BODY.id = 'body';
		htmlElementCreation({ type: 'title', textContent: chapter, parentElem: document.head });
		document.head.append(
			...createElementFromHTML(`
      <link rel = "icon" type="image/x-icon" href="data:image/png;base64,${ICONS.favicon32}">
    `)
		);

		[ Groups, Settings, Buttons, App ].forEach(C => {
			new C().create();
		});

		DOM.addCSS();
		DOM.addSounds();
		DOM.addCustomScripts();
	}
}

module.exports = DOM;
