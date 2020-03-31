#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const argv = require('yargs').argv;

const { convert } = require('./lib/convert');
const { showSuccessMessage, showErrorMessage } = require('./lib/output');
const { makeConstantProp } = require('./lib/utility');

makeConstantProp('CURRENT_DIR', process.cwd());

const chapters = {};

fs.readdirSync(CURRENT_DIR).filter((chapter) => chapter.match(/^[0-9]{1,2}\./)).forEach((chapter) => {
	chapters[chapter.match(/^[0-9]{1,2}/)[0]] = chapter;
});

if (argv.convert) {
	if (argv.output) {
		makeConstantProp(
			'OUTPUT_DIR',
			path.join(CURRENT_DIR, typeof argv.output === 'string' ? argv.output : 'OUTPUT')
		);
		if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);
	}
	else makeConstantProp('OUTPUT_DIR', null);
	const chapter_to_convert = argv.convert;
	if (Number.isInteger(chapter_to_convert) && chapter_to_convert > 0) {
		const chapter_name = chapters[chapter_to_convert];
		if (chapter_name) {
			makeConstantProp('CHAPTER_NAME', chapter_name);
			makeConstantProp('FILE_DIR', path.join(CURRENT_DIR, chapter_name));
			convert();
		}
		else showErrorMessage(`chapter ${chapter_to_convert} doesn't exist`);
	}
	else if (typeof chapter_to_convert === 'boolean')
		for (let chapter in chapters) {
			makeConstantProp('FILE_DIR', path.join(CURRENT_DIR, chapters[chapter]));
			makeConstantProp('CHAPTER_NAME', chapters[chapter]);
			convert();
		}
}
