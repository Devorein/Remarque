#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const argv = require('yargs').argv;
const browserify = require('browserify');

const { convert } = require('./lib/convert');
const { showSuccessMessage, showErrorMessage } = require('./lib/output');
const { makeConstantProp } = require('./lib/utility');

makeConstantProp('CURRENT_DIR', process.cwd());

let chapters = {};

fs.readdirSync(CURRENT_DIR).filter(chapter => chapter.match(/^[0-9]{1,2}\./)).forEach(chapter => {
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
	let target_chapters = argv.convert.toString().split(' ');
	target_chapters = target_chapters.map(target_chapter => {
		if (target_chapter.includes('-')) {
			let [ start, stop ] = target_chapter.split('-');
			start = parseInt(start);
			stop = parseInt(stop);
			const temp = [];
			for (let i = start; i <= stop; i++) temp.push(i);
			return temp;
		}
		else return parseInt(target_chapter);
	});
	target_chapters = Array.from(new Set(target_chapters.flat())).sort((a, b) => a - b);
	const chapters_to_convert = {};
	target_chapters.forEach((target_chapter, index) => {
		const chapter = chapters[target_chapter];
		if (chapter) chapters_to_convert[index + 1] = chapter;
		else showErrorMessage(`chapter ${target_chapter} doesn't exist`);
	});
	browserify(path.join(__dirname, 'lib', 'Components', 'scripts', 'index.js')).bundle((err, buf) => {
		global.indexJS = buf.toString();
		Object.values(chapters_to_convert).forEach(chapter => {
			makeConstantProp('CHAPTER_NAME', chapter);
			makeConstantProp('FILE_DIR', path.join(CURRENT_DIR, chapter));
			convert();
		});
	});
}
