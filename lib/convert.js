const fs = require('fs');
const path = require('path');

const { JSDOM } = require('jsdom');
const showdown = require('showdown');
const browserify = require('browserify');

const converter = new showdown.Converter();

const { showErrorMessage, showSuccessMessage } = require('./output');
const { makeConstantProp } = require('./utility');
const { postProcessDOM, preprocessDOM } = require('./dom');
const { outputAsHTML } = require('./file');

function convert() {
	const START_TIME = Date.now();
	const MD_PATH = path.join(FILE_DIR, CHAPTER_NAME) + '.md';

	const doesMDExist = fs.existsSync(MD_PATH);
	if (doesMDExist) {
		fs.readFile(MD_PATH, 'utf8', (err, data) => {
			if (err) throw err;

			const html = converter.makeHtml(data);
			makeConstantProp('document', new JSDOM(html).window.document);
			makeConstantProp('BODY', global.document.body);

			browserify(path.join(__dirname, 'Components', 'index.js')).bundle((err, buf) => {
				if (err) throw err;
				makeConstantProp('indexJS', buf.toString());
				preprocessDOM();
				postProcessDOM();
				outputAsHTML();
				const END_TIME = Date.now();
				const TIME_DIFF = END_TIME - START_TIME;
				showSuccessMessage(`Took ${TIME_DIFF}ms or ${TIME_DIFF / 1000}s`);
			});
		});
	}
	else showErrorMessage(`${MD_PATH} doesn't exist`);
}

module.exports = {
	convert
};
