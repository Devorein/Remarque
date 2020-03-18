#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const argv = require('yargs').argv;
const { convert } = require('./lib/convert');
const { showSuccessMessage, showErrorMessage } = require('./lib/output');

const CURRENT_DIR = process.cwd();

const chapters = {};

fs.readdirSync(CURRENT_DIR).filter((chapter) => chapter.match(/^[0-9]{1,2}\./)).forEach((chapter) => {
	chapters[chapter.match(/^[0-9]{1,2}/)[0]] = chapter;
});

if (argv.convert) {
	let output_dir = null;
	if (argv.output) {
		output_dir = path.join(CURRENT_DIR, typeof argv.output === 'string' ? argv.output : 'OUTPUT');
		if (!fs.existsSync(output_dir)) fs.mkdirSync(output_dir);
	}
	const chapter_to_convert = argv.convert;
	if (Number.isInteger(chapter_to_convert) && chapter_to_convert > 0) {
		const chapter_name = chapters[chapter_to_convert];
		if (chapter_name) convert(path.join(CURRENT_DIR, chapter_name), output_dir);
		else showErrorMessage(`chapter doesn't exist`);
	}
	else if (typeof chapter_to_convert === 'boolean') {
		for (let chapter in chapters) convert(path.join(CURRENT_DIR, chapters[chapter]), output_dir);
	}
}
