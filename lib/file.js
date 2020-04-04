const fs = require('fs');
const path = require('path');
const { showErrorMessage, showSuccessMessage } = require('./output');

const ICONS = {
	java      : fs.readFileSync(path.join(__dirname, 'Components', 'svgs', 'file-icons', 'java.svg'), 'UTF-8'),
	folder    : fs.readFileSync(path.join(__dirname, 'Components', 'svgs', 'file-icons', 'folder.svg'), 'UTF-8'),
	c         : fs.readFileSync(path.join(__dirname, 'Components', 'svgs', 'file-icons', 'c.svg'), 'UTF-8'),
	cpp       : fs.readFileSync(path.join(__dirname, 'Components', 'svgs', 'file-icons', 'cpp.svg'), 'UTF-8'),
	cs        : fs.readFileSync(path.join(__dirname, 'Components', 'svgs', 'file-icons', 'csharp.svg'), 'UTF-8'),
	js        : fs.readFileSync(path.join(__dirname, 'Components', 'svgs', 'file-icons', 'js.svg'), 'UTF-8'),
	py        : fs.readFileSync(path.join(__dirname, 'Components', 'svgs', 'file-icons', 'python.svg'), 'UTF-8'),
	json      : fs.readFileSync(path.join(__dirname, 'Components', 'svgs', 'file-icons', 'json.svg'), 'UTF-8'),
	favicon16 : fs.readFileSync(path.join(__dirname, 'Components', 'images', 'favicon-16x16.png'), 'base64'),
	favicon32 : fs.readFileSync(path.join(__dirname, 'Components', 'images', 'favicon-32x32.png'), 'base64'),
	favicon96 : fs.readFileSync(path.join(__dirname, 'Components', 'images', 'favicon-96x96.png'), 'base64')
};

const SOUNDS = {
	click : fs.readFileSync(path.join(__dirname, 'Components', 'sounds', 'click.mp3'), 'base64')
};

function outputAsHTML() {
	const HTML_PATH = OUTPUT_DIR
		? path.join(OUTPUT_DIR, CHAPTER_NAME + '.html')
		: path.join(FILE_DIR, CHAPTER_NAME + '.html');
	fs.writeFileSync(HTML_PATH, document.documentElement.outerHTML.trim(), 'utf8');
	showSuccessMessage(`Converted ${FILE_DIR}`);
}
function getSVGData(svg_name) {
	return fs.readFileSync(path.join(__dirname, 'Components', 'svgs', `${svg_name}.svg`), 'UTF-8');
}

function getFontData(font_name) {
	return fs.readFileSync(path.join(__dirname, 'Components', 'fonts', `${font_name}.woff`), 'base64');
}

function getCSSData(style_name) {
	return fs.readFileSync(path.join(__dirname, 'Components', 'styles', `${style_name}.css`), 'UTF-8');
}

function getImageData(img_src) {
	return fs.readFileSync(path.join(FILE_DIR, `${img_src}`), 'base64');
}

module.exports = {
	outputAsHTML,
	getSVGData,
	getFontData,
	getCSSData,
	getImageData,
	ICONS,
	SOUNDS
};
