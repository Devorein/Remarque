const AppContentCodeCodeBlockCode = require('./AppContentCodeCodeBlockCode_');
const AppContentCodeCodeBlockDownload = require('./AppContentCodeCodeBlockDownload_');
const AppContentCodeCodeBlockCopy = require('./AppContentCodeCodeBlockCopy_');
const AppContentCodeCodeBlockHighlight = require('./AppContentCodeCodeBlockHighlight_');

class AppContentCodeCodeBlock {
	static scroll() {
		Array.from(document.querySelectorAll('.code-block')).forEach(_code_block => {
			_code_block.addEventListener('scroll', e => {
				const code_width = parseFloat(window.getComputedStyle(e.target).width.replace('px', ''));
				const _copy_icon = _code_block.querySelector('.icon--copy');
				const _download_icon = _code_block.querySelector('.icon--download');
				const _line_number = _code_block.querySelector('.linenumber-container');

				_copy_icon.style.top = `${e.target.scrollTop}px`;
				_copy_icon.style.left = `${parseInt(e.target.scrollLeft) + (code_width - 40)}px`;
				_download_icon.style.top = `${e.target.scrollTop}px`;
				_download_icon.style.left = `${e.target.scrollLeft}px`;
				_line_number.style.left = `${parseInt(e.target.scrollLeft)}px`;
			});
		});
	}
	static register() {
		[
			AppContentCodeCodeBlockCode,
			AppContentCodeCodeBlockDownload,
			AppContentCodeCodeBlockCopy,
			AppContentCodeCodeBlockHighlight
		].forEach(C => C.register());
		this.scroll();
	}
}

module.exports = AppContentCodeCodeBlock;
