const chalk = require('chalk');

function showSuccessMessage(chapter_dir) {
	console.log(chalk.green(`Completed converting ${chapter_dir.substring(chapter_dir.lastIndexOf('\\') + 1)}`));
}

function showErrorMessage(chapter_dir) {
	console.log(chalk.red(`${chapter_dir.substring(chapter_dir.lastIndexOf('\\') + 1)} doesn't exist`));
}

module.exports = {
	showSuccessMessage,
	showErrorMessage
};
