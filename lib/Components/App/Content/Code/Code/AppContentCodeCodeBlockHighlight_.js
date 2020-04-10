class AppContentCodeCodeBlockHighlight {
	static click() {
		Array.from(document.querySelectorAll('.highlight-line')).forEach(_highlight_line => {
			_highlight_line.addEventListener('click', e => {
				const _code = _highlight_line.parentElement.querySelector('code');
				const file_name = _code.getAttribute('file-name');
				const dir_name = _code.getAttribute('dir-name');
				const target_line = _highlight_line.getAttribute('target-line');
				const _codeContainer = _code.parentElement.parentElement.parentElement;
				if (_highlight_line.classList.contains('explanation-line')) {
					const _explanationGroup = _codeContainer.querySelector('.explanation-group');
					const _explanationLine = _explanationGroup.querySelector(
						`ul[file-name = "${file_name}"][dir-name="${dir_name}"] span[target-line="${target_line}"]`
					);
					if (_explanationLine) scrollHighlightLine(_explanationLine.parentElement);
				}
				else {
					const _outputGroup = _codeContainer.querySelector('.output-group');
					const _outputLine = _outputGroup.querySelector(
						`pre[file-name = "${file_name}"][dir-name="${dir_name}"] span[target-line="${target_line}"]`
					);
					if (_outputLine) scrollHighlightLine(_outputLine.parentElement);
				}
			});
		});
	}
	static register() {
		this.click();
	}
}

module.exports = AppContentCodeCodeBlockHighlight;
