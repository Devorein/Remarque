#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const browserify = require('browserify');
const chalk = require('chalk');
const sass = require('node-sass');

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
	.middleware(argv => {
		if (!argv.config && !argv.output) {
			argv.output = 'OUTPUT';
			argv.o = 'OUTPUT';
		}
		if (!argv.config && !argv.chapters) {
			argv.chapters = 'all';
			argv.c = 'all';
		}
	}, true)
	.command({
		command : 'convert [o]',
		aliases : [ 'cnv' ],
		desc    : chalk.green(
			'Converts the speficied chapters to specified output directory using specific arguments or path to a config json'
		),
		builder(yargs) {
			return yargs
				.options({
					c : {
						alias              : 'chapters',
						describe           : 'Comma separated list of chapters to convert',
						type               : 'string',
						coerce             : val => (val === '' ? 'all' : parseChapters(val)),
						group              : 'Convert Options',
						defaultDescription : 'Convert all chapters',
						conflicts          : [ 'config', 'j' ]
					},
					o : {
						alias              : 'output',
						describe           : 'Output to the specified directory',
						coerce             : val => (val === '' ? 'OUTPUT' : val),
						type               : 'string',
						group              : 'Convert Options',
						defaultDescription : 'Dumps to OUTPUT folder relative to cwd',
						conflicts          : [ 'config', 'j' ]
					},
					j : {
						alias              : 'config',
						describe           : 'Path to custom configuration json file relative to cwd',
						type               : 'string',
						coerce             : val =>
							path.join(process.cwd(), val === '' ? 'remarque.json' : `${val}.json`),
						defaultDescription : 'remarque.json file on cwd',
						group              : 'Convert Options',
						conflicts          : [ 'c', 'chapters', 'o', 'outputs' ]
					}
				})
				.example('$0 convert -c', 'Converts all the chapters')
				.example('$0 convert -c 1', 'Convert the chapter 1')
				.example('$0 convert -c 1-5', 'Convert chapters 1-5')
				.example('$0 convert -c 1-5,6', 'Convert chapters 1-5 and chapter 6')
				.example('$0 convert -c 1-5,6-8', 'Convert chapters 1-5 and chapters 6-8')
				.example('$0 convert -c 1 -o OUTPUTS', 'dumps chapter 1 to OUTPUTS directory')
				.example('$0 convert -c -o OUTPUTS', 'dumps all the converted files to OUTPUTS directory')
				.example('$0 convert -c -o', 'dumps all the converted files to OUTPUT directory')
				.example('$0 convert -j', 'Get all the configuration data from cwd remarque.json')
				.example('$0 convert -j PATH', 'Get all the configuration data from custom path relative to cwd')
				.epilogue(
					'For more information go to \nhttps://github.com/Devorein/Remarque/blob/master/README.md#convert'
				);
		},
		handler(argv) {
			if (argv.config) {
				if (!fs.existsSync(argv.config)) console.log(chalk.red('Configuration file not found'));
				else {
					const options = JSON.parse(fs.readFileSync(argv.config));
					argv.output = options.output || options.o;
					argv.output = argv.output === undefined ? 'OUTPUT' : argv.output;
					argv.chapters = options.chapters || options.c;
					argv.chapters = argv.chapters === undefined ? 'all' : parseChapters(argv.chapters);
				}
			}
			if (!fs.existsSync(argv.output)) fs.mkdirSync(`${CURRENT_DIR}\\${argv.output}`);
			browserify(path.join(__dirname, 'lib', 'Components', 'index.js')).bundle((err, buf) => {
				if (err) console.log(err);
				makeConstantProp('indexJS', buf.toString());
				fs.writeFileSync(
					path.join(__dirname, 'lib', 'Components', 'style.css'),
					sass.renderSync({
						file        : path.join(__dirname, 'lib', 'Components', 'style.scss'),
						outputStyle : 'compressed'
					}).css
				);
				argv.chapters.forEach(chapter_num => {
					makeConstantProp('OUTPUT_DIR', path.join(CURRENT_DIR, argv.output));
					const chapter = chapters[chapter_num];
					if (chapter) {
						makeConstantProp('CHAPTER_NAME', chapter);
						makeConstantProp('FILE_DIR', path.join(CURRENT_DIR, chapter));
						convert();
					}
					else showErrorMessage(`chapter ${chapter} doesn't exist`);
				});
			});
		}
	})
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
