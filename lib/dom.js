const fs = require('fs');
const path = require('path');

const { htmlElementCreation, createElementFromHTML } = require('./utility');

const downloadIcon = fs.readFileSync(path.join(svgDir, 'download.svg'));

function addCodeIcons(parent) {
	createCopyIcons(parent);
	createDownloadIcons(parent);
}

function createCopyIcons(parent) {
	const copy_icon = document.createElement('span');
	copy_icon.classList.add('icon--copy');
	copy_icon.textContent = '📄';
	parent.appendChild(copy_icon);
}

function createDownloadIcons(parent) {
	const download_icon = document.createElement('span');
	download_icon.classList.add('icon--download');
	download_icon.innerHTML = downloadIcon;
	parent.appendChild(download_icon);
}

function preprocessDOM(chapter_name) {
	BODY.id = 'preview';
	BODY.classList.add('dark');
	document.querySelector('h1').id = 'chapter-name';

	htmlElementCreation({ type: 'title', textContent: chapter_name, parentElem: document.head });

	addCSS();
	addContentElement();
	createAdditionalElem();
}

function addContentElement() {
	htmlElementCreation({
		classes    : 'content',
		id         : 'content',
		parentElem : BODY,
		children   : [
			createClockElement(),
			createProgressElement(),
			htmlElementCreation({
				id : 'top'
			}),
			...Array.from(document.querySelector('body').children)
		]
	});
}

function createClockElement() {
	return htmlElementCreation({
		id : 'clock'
	});
}

function createProgressElement() {
	return htmlElementCreation({
		id       : 'progress',
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

function addCSS() {
	// ? Add custom css styles
	const overpassFont = fs.readFileSync(path.join(__dirname, 'Components', 'fonts', 'Overpass.woff'), 'base64');
	const firasansFont = fs.readFileSync(path.join(__dirname, 'Components', 'fonts', 'FiraSans.woff'), 'base64');
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

	const cssStyles = fs.readFileSync(__dirname + '\\Components\\style.css', 'UTF-8');
	htmlElementCreation({
		type        : 'style',
		textContent : cssStyles,
		parentElem  : document.head
	});
}

// ? Add additional HTML Elements to the body
function createAdditionalElem() {
	const additionalHTML = `
    <div id="overlay">
    </div>
    <div class="dropzone" id = "dropzone-left"></div>
    <div class="dropzone" id = "dropzone-right"></div>
  `;

	createElementFromHTML(additionalHTML).forEach((elem) => {
		BODY.appendChild(elem);
	});
}

// ? Create the necessary block containers
function groupBlocks() {
	const blocks = [ 'definition', 'info', 'tip', 'note', 'important', 'warning' ];
	const blockContainer = htmlElementCreation({
		id         : 'blockContainer',
		classes    : 'block-container',
		parentElem : document.querySelector('.content')
	});
	for (let block of blocks) {
		const BlockHeader = htmlElementCreation({
			type        : 'h2',
			textContent : block.charAt(0).toUpperCase() + block.substring(1) + 's',
			id          : `${block}s-header`,
			classes     : 'block-header'
		});

		htmlElementCreation({
			classes        : [ `${block}-block-container`, `block-container` ],
			children       : [ BlockHeader ],
			clonedChildren : Array.from(document.querySelectorAll(`.${block}-block`)),
			parentElem     : blockContainer
		});
	}
}

module.exports = {
	addCodeIcons,
	preprocessDOM,
	createAdditionalElem,
	groupBlocks
};
