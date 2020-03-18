const chalk = require('chalk');

function showSuccessMessage(msg) {
	console.log(chalk.green(msg));
}

function showErrorMessage(msg) {
	console.log(chalk.red(msg));
}

module.exports = {
	showSuccessMessage,
	showErrorMessage
};
