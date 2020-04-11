const chalk = require('chalk');

function success(msg, show, only) {
	if (only) {
		if (show) return chalk.green(`✔️  ${msg}`);
		else return chalk.green(`${msg}`);
	}
	else {
		if (show) console.log(chalk.green(`✔️  ${msg}`));
		else console.log(chalk.green(`${msg}`));
	}
}

function error(msg, show, only) {
	if (only) {
		if (show) return chalk.green(`❌ ${msg}`);
		else return chalk.green(`${msg}`);
	}
	else {
		if (show) console.log(chalk.green(`❌ ${msg}`));
		else console.log(chalk.green(`${msg}`));
	}
}

function warn(msg, show, only) {
	if (only) {
		if (show) return chalk.green(`⚠️ ${msg}`);
		else return chalk.green(`${msg}`);
	}
	else {
		if (show) console.log(chalk.green(`⚠️ ${msg}`));
		else console.log(chalk.green(`${msg}`));
	}
}

module.exports = {
	success,
	error,
	warn
};
