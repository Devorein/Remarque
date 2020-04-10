const AppContentCodeFSBlockItemToggle = require('./AppContentCodeFSBlockItemToggle_');
class AppContentCodeFSBlockItem {
	static clickH(_file_name) {
		_file_name.classList.add('selected');
		let _traverser = _file_name;
		const file_name = _file_name.querySelector('.file-item--name').textContent;
		const dir_name = _file_name.parentElement.previousElementSibling.querySelector('.file-item--name').textContent;
		while (_traverser.className !== 'file-group') _traverser = _traverser.parentElement;
		const _codeGroup = _traverser.parentElement.querySelector('.code-group');
		const _outputGroup = _traverser.parentElement.querySelector('.output-group');
		const _explanationGroup = _traverser.parentElement.querySelector('.explanation-group');
		Array.from(_codeGroup.children).forEach(_code_block => {
			const _code = _code_block.querySelector('code');
			const cur_file_name = _code.getAttribute('file-name');
			const cur_dir_name = _code.getAttribute('dir-name');
			if (cur_file_name === file_name && cur_dir_name === dir_name) {
				_code_block.style.opacity = '1';
				_code_block.style.zIndex = '1';
			}
			else {
				_code_block.style.opacity = '0';
				_code_block.style.zIndex = '-1';
			}
		});
		if (_outputGroup) {
			Array.from(_outputGroup.children).forEach(_output_block => {
				const cur_file_name = _output_block.getAttribute('file-name');
				const cur_dir_name = _output_block.getAttribute('dir-name');
				if (cur_file_name === file_name && cur_dir_name === dir_name) {
					_output_block.style.opacity = '1';
					_output_block.style.zIndex = '1';
				}
				else {
					_output_block.style.opacity = '0';
					_output_block.style.zIndex = '-1';
				}
			});
		}
		if (_explanationGroup) {
			Array.from(_explanationGroup.children).forEach(_explanation_block => {
				const cur_file_name = _explanation_block.getAttribute('file-name');
				const cur_dir_name = _explanation_block.getAttribute('dir-name');
				if (cur_file_name === file_name && cur_dir_name === dir_name) {
					_explanation_block.style.opacity = '1';
					_explanation_block.style.zIndex = '1';
				}
				else {
					_explanation_block.style.opacity = '0';
					_explanation_block.style.zIndex = '-1';
				}
			});
		}
	}

	static click() {
		Array.from(document.querySelectorAll('.file-name')).forEach(_file_name => {
			_file_name.addEventListener('click', e => {
				removeClass('.file-name', 'selected');
				this.clickH(_file_name);
			});
		});
	}

	static register() {
		this.click();
		AppContentCodeFSBlockItemToggle.register();
	}
}

module.exports = AppContentCodeFSBlockItem;
