#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const browserify = require('browserify');
const chalk = require('chalk');

const { convert } = require('./lib/convert');
const { showSuccessMessage, showErrorMessage } = require('./lib/output');
const { makeConstantProp } = require('./lib/utility');

makeConstantProp('CURRENT_DIR', process.cwd());

let chapters = {};

fs.readdirSync(CURRENT_DIR).filter(chapter => chapter.match(/^[0-9]{1,2}\./)).forEach(chapter => {
	chapters[chapter.match(/^[0-9]{1,2}/)[0]] = chapter;
});

require('yargs')
	.fail(function(msg, err, yargs) {
		if (err) console.log(chalk.red(msg));
		console.error('You should be doing', yargs.help());
		process.exit(1);
	})
	.scriptName('remarque')
	.command(
		[ 'convert [-c] [chapter] [-o] [dir]', 'cnv' ],
		chalk.green('Converts the speficied chapters to specified output directory'),
		function(yargs) {
			return yargs
				.example('$0 convert -c', 'Converts all the chapters')
				.example('$0 convert -c 1', 'Convert the chapter 1')
				.example('$0 convert -c 1-5', 'Convert chapters 1-5')
				.example('$0 convert -c 1-5,6', 'Convert chapters 1-5 and chapter 6')
				.example('$0 convert -c 1-5,6-8', 'Convert chapters 1-5 and chapters 6-8')
				.example('$0 convert -c 1 -o OUTPUTS', 'dumps chapter 1 to OUTPUTS directory')
				.example('$0 convert -c -o OUTPUTS', 'dumps all the converted files to OUTPUTS directory')
				.example('$0 convert -c -o', 'dumps all the converted files to OUTPUT directory')
				.options({
					c : {
						alias              : 'chapters',
						describe           : 'Comma separated list of chapters to convert',
						type               : 'string',
						coerce             : val => (val !== 'all' ? parseChapters(val) : 'all'),
						group              : 'Convert Options',
						default            : 'all',
						defaultDescription : 'Convert all chapters'
					},
					o : {
						alias              : 'output',
						describe           : 'Output to the specified directory',
						type               : 'string',
						group              : 'Convert Options',
						default            : 'OUTPUT',
						defaultDescription : 'Dumps to OUTPUT folder relative to cwd'
					}
				});
		},
		function(argv) {
			if (!fs.existsSync(argv.output)) fs.mkdirSync(`${CURRENT_DIR}\\${argv.output}`);
			browserify(path.join(__dirname, 'lib', 'Components', 'scripts', 'index.js')).bundle((err, buf) => {
				argv.chapters.forEach(chapter_num => {
					makeConstantProp('OUTPUT_DIR', path.join(CURRENT_DIR, argv.output));
					const chapter = chapters[chapter_num];
					if (chapter) {
						makeConstantProp('indexJS', buf.toString());
						makeConstantProp('CHAPTER_NAME', chapter);
						makeConstantProp('FILE_DIR', path.join(CURRENT_DIR, chapter));
						convert();
					}
					else showErrorMessage(`chapter ${target_chapter} doesn't exist`);
				});
			});
		}
	)
	.demandCommand(
		1,
		1,
		'You need to provide at least one command, provided $0',
		'You can provide at most one command, provided $0'
	)
	.command([ 'check [-c] [chapter] [-o] [dir]', 'chk' ], chalk.green('Check the given chapters for possible errors'))
	.command([ 'stat', 'st' ], chalk.green('Check the given chapters stats'))
	.help('h')
	.alias('h', 'help')
	.strict()
	.epilogue('For more information go to \nhttps://github.com/Devorein/Remarque').argv;

function parseChapters(chapters) {
	if (chapters.match(/[A-Za-z]+/)) throw new Error('Only numbers allowed!');
	return [
		...new Set(
			chapters
				.toString()
				.split(' ')
				.map(num => {
					if (num.includes('-')) {
						let [ start, end ] = num.split('-');
						start = parseInt(start);
						end = parseInt(end);
						const temp = [];
						for (let i = start; i <= end; i++) temp.push(i);
						return temp;
					}
					else return parseInt(num);
				})
				.flat()
		)
	];
}
