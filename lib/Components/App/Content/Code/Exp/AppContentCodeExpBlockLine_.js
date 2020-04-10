class AppContentCodeExpBlockLine {
	static click() {
		Array.from(
			document.querySelectorAll('.highlight-number--low,.highlight-number--medium,.highlight-number--high')
		).forEach(_line_highlight => {
			_line_highlight.addEventListener('click', e => {
				const _explanationBlock = _line_highlight.parentElement.parentElement;
				const file_name = _explanationBlock.getAttribute('file-name');
				const dir_name = _explanationBlock.getAttribute('dir-name');
				const _code = _explanationBlock.parentElement.parentElement.querySelector(
					`code[dir-name="${dir_name}"][file-name="${file_name}"]`
				);
				const _line = _code.parentElement.querySelector(`div[target-line="${e.target.textContent}"]`);
				scrollHighlightLine(_line);
			});
		});
	}

	static register() {
		this.click();
	}
}

module.exports = AppContentCodeExpBlockLine;
