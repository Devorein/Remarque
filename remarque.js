#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const browserify = require('browserify');
const sass = require('node-sass');

const convert = require('./lib/convert');
const { warn, success, error } = require('./lib/output');
const { makeConstantProp, parseChapters } = require('./lib/utility');

class Remarque {
	static convert(options) {
		let { targetDir, chapters = 'all', outputDir = 'OUTPUT', configPath } = options;
		outputDir = outputDir === '' || outputDir.length <= 2 ? 'OUTPUT' : outputDir;
		if (!targetDir) error('Please specify a target directory', true);
		else {
			const CHAPTERS = {};
			fs.readdirSync(targetDir).forEach(chapter => {
				const matchesConv = chapter.match(/^[0-9]{1,3}\./);
				const isDirectory = fs.lstatSync(path.join(targetDir, chapter)).isDirectory();
				if (matchesConv && isDirectory) {
					const chapter_num = matchesConv[0].replace('.', '');
					if (CHAPTERS[chapter_num]) warn(`chapter ${chapter_num} has a duplicate`, true);
					CHAPTERS[chapter_num] = chapter;
				}
			});
			if (configPath) {
				if (chapters || outputDir)
					warn(`You've provided both a config file along with options chapters and outputDir`, true);
				const data = JSON.parse(fs.readFileSync(path.join(targetDir, configPath)));
				chapters = data.chapters ? data.chapters : 'all';
				outputDir = data.outputDir ? data.outputDir : 'OUTPUT';
			}
			outputDir = path.join(targetDir, outputDir);
			chapters = parseChapters(chapters);
			if (!fs.existsSync(outputDir)) fs.mkdirSync(`${outputDir}`);
			browserify(path.join(__dirname, 'lib', 'Components', 'index.js')).bundle((err, buf) => {
				if (err) {
					error(err.message(), true);
					return;
				}
				makeConstantProp('indexJS', buf.toString());
				fs.writeFileSync(
					path.join(__dirname, 'lib', 'Components', 'style.css'),
					sass.renderSync({
						file        : path.join(__dirname, 'lib', 'Components', 'style.scss'),
						outputStyle : 'compressed'
					}).css
				);
				chapters.forEach(chapter_num => {
					const chapter = CHAPTERS[`${chapter_num}`];
					if (chapter) {
						const MD_PATH = path.join(targetDir, chapter, chapter) + '.md';
						const doesMDExist = fs.existsSync(MD_PATH);
						if (doesMDExist) {
							const START_TIME = Date.now();
							const MD_DATA = fs.readFileSync(MD_PATH, 'utf8');
							const HTML_DATA = convert(MD_DATA, chapter);
							const END_TIME = Date.now();
							const TIME_DIFF = END_TIME - START_TIME;
							const HTML_PATH = path.join(outputDir, chapter + '.html');
							fs.writeFileSync(HTML_PATH, HTML_DATA, 'utf8');
							success(`Converted ${path.join(targetDir, chapter)}`, true);
							success(`Took ${TIME_DIFF}ms or ${TIME_DIFF / 1000}s`);
						}
						else error(`${MD_PATH} doesn't exist`, true);
					}
					else error(`chapter ${chapter_num} doesn't exist`, true);
				});
			});
		}
	}
}

module.exports = Remarque;
