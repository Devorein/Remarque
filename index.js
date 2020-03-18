#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const argv = require('yargs').argv;
const { convert } = require('./lib/convert');
const { showSuccessMessage, showErrorMessage } = require('./lib/output');

const currentDir = process.cwd();

const chapters = {};

fs.readdirSync(currentDir).filter((chapter) => chapter.match(/^[0-9]{1,2}\./)).forEach((chapter) => {
	chapters[chapter.match(/^[0-9]{1,2}/)[0]] = chapter;
});

if (argv.convert) {
	const chapter_to_convert = argv.convert;
	if (Number.isInteger(chapter_to_convert) && chapter_to_convert > 0) {
		const chapter_name = chapters[chapter_to_convert];
		if (chapter_name) {
			const chapter_dir = path.join(currentDir, chapter_name);
			// convert(chapter_dir, argv.output);
		}
		else showErrorMessage(`chapter doesn't exist`);
	}
	else if (typeof chapter_to_convert === 'boolean') {
		chapters.forEach((chapter) => {
			const chapter_dir = path.join(currentDir, chapter);
			convert(chapter_dir);
		});
	}
}
