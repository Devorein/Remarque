#!/usr/bin/env node

const Remarque = require('./remarque');
const { error, success, warn } = require('./lib/output');
const { parseChapters } = require('./lib/utility');

require('yargs')
	.fail(function(msg, err, yargs) {
		if (err) error(msg, true);
		console.error('You should be doing', yargs.help());
		process.exit(1);
	})
	.scriptName('remarque')
	.command({
		command : 'convert [o]',
		aliases : [ 'cnv' ],
		desc    : success(
			'Converts the speficied chapters to specified output directory using specific arguments or path to a config json',
			false,
			true
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
						default            : 'all'
					},
					o : {
						alias              : 'output',
						describe           : 'Output to the specified directory',
						type               : 'string',
						group              : 'Convert Options',
						default            : 'OUTPUT',
						defaultDescription : 'Dumps to OUTPUT folder relative to cwd'
					},
					j : {
						alias              : 'config',
						describe           : 'Path to custom configuration json file relative to cwd',
						type               : 'string',
						group              : 'Convert Options',
						defaultDescription : 'remarque.json file on cwd'
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
		handler({ config: configPath, output: outputDir, chapters }) {
			targetDir = process.cwd();
			const options = {};
			if (configPath) options.configPath = configPath;
			options.targetDir = process.cwd();
			options.outputDir = outputDir;
			options.chapters = chapters;
			Remarque.convert(options);
		}
	})
	.demandCommand(
		1,
		1,
		'You need to provide at least one command, provided $0',
		'You can provide at most one command, provided $0'
	)
	.command(
		[ 'check [-c] [chapter] [-o] [dir]', 'chk' ],
		success('Check the given chapters for possible errors', false, true)
	)
	.command([ 'stat', 'st' ], success('Check the given chapters stats', false, true))
	.help('h')
	.alias('h', 'help')
	.strict()
	.epilogue('For more information go to \nhttps://github.com/Devorein/Remarque').argv;
