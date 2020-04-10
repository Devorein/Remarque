class AppContentCodeOutputBlockLine {
	static click() {
		const all_outputs = Array.from(document.querySelectorAll('.output-block-line'));
		all_outputs.forEach(all_output => {
			all_output.addEventListener('click', e => {
				const _output_block = all_output.parentElement;
				const file_name = _output_block.getAttribute('file-name');
				const dir_name = _output_block.getAttribute('dir-name');
				const _code = _output_block.parentElement.previousElementSibling.querySelector(
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

module.exports = AppContentCodeOutputBlockLine;
