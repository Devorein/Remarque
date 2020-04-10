const AppContentCodeFSBlock = require('./AppContentCodeFSBlock_');
const AppContentCodeFSToggle = require('./AppContentCodeFSToggle_');

class AppContentCodeFS {
	static scroll() {
		Array.from(document.querySelectorAll('.file-group')).forEach(_fileGroup => {
			_fileGroup.addEventListener('scroll', e => {
				e.target.querySelector('.file-toggle').dispatchEvent(new CustomEvent('scroll'));
			});
		});
	}
	static register() {
		this.scroll();
		AppContentCodeFSBlock.register();
		AppContentCodeFSToggle.register();
	}
}

module.exports = AppContentCodeFS;
