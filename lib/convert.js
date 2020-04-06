const fs = require('fs');
const path = require('path');

const { JSDOM } = require('jsdom');
const showdown = require('showdown');

const converter = new showdown.Converter();

const { showErrorMessage, showSuccessMessage } = require('./output');
const { makeConstantProp } = require('./utility');
const { processDOM } = require('./dom');
const { outputAsHTML } = require('./file');

function convert() {
	const START_TIME = Date.now();
	const MD_PATH = path.join(FILE_DIR, CHAPTER_NAME) + '.md';
	const doesMDExist = fs.existsSync(MD_PATH);
	if (doesMDExist) {
		const MD_DATA = fs.readFileSync(MD_PATH, 'utf8');
		const html = converter.makeHtml(MD_DATA);
		makeConstantProp('document', new JSDOM(html).window.document);
		makeConstantProp('BODY', global.document.body);
		processDOM();
		outputAsHTML();
		const END_TIME = Date.now();
		const TIME_DIFF = END_TIME - START_TIME;
		showSuccessMessage(`Took ${TIME_DIFF}ms or ${TIME_DIFF / 1000}s`);
	}
	else showErrorMessage(`${MD_PATH} doesn't exist`);
}

module.exports = {
	convert
};
