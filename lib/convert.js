const { JSDOM } = require('jsdom');
const showdown = require('showdown');

const converter = new showdown.Converter();

const { makeConstantProp, createElementFromHTML, htmlElementCreation, addCodeHighlight } = require('./utility');
const DOM = require('./dom');
const { ICONS, BUTTONS, getImageData } = require('./file');

function convert(MD_DATA, chapter) {
	const html = converter.makeHtml(MD_DATA);
	makeConstantProp('window', new JSDOM(html).window);
	makeConstantProp('document', window.document);
	makeConstantProp('BODY', global.document.body);
	makeConstantProp('makeConstantProp', makeConstantProp);
	makeConstantProp('createElementFromHTML', createElementFromHTML);
	makeConstantProp('htmlElementCreation', htmlElementCreation);
	makeConstantProp('ICONS', ICONS);
	makeConstantProp('BUTTONS', BUTTONS);
	makeConstantProp('getImageData', getImageData);
	makeConstantProp('addCodeHighlight', addCodeHighlight);
	DOM.processDOM(chapter);
	return document.documentElement.outerHTML.trim();
}

module.exports = convert;
