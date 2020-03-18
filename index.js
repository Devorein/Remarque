#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const argv = require('yargs').argv;
const { convert } = require('./lib/convert');
const { showSuccessMessage } = require('./lib/output');

const currentDir = process.cwd();

const chapters = fs.readdirSync(currentDir).filter((chapter) => chapter.match(/^[0-9]{1,2}\./)).sort((a, b) => {
	let prev = parseInt(a.substring(0, a.indexOf('.')));
	let next = parseInt(b.substring(0, b.indexOf('.')));
	return prev - next;
});

if (argv.convert) {
	const chapter_num = argv.convert;
	if (Number.isInteger(chapter_num) && chapter_num > 0) {
		const chapter_dir = path.join(currentDir, chapters[chapter_num - 1]);
		convert(chapter_dir);
	}
	else {
		chapters.forEach((chapter) => {
			const chapter_dir = path.join(currentDir, chapter);
			convert(chapter_dir);
		});
	}
}
