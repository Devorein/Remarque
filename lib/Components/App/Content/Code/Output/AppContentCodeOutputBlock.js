const AppContentCodeOutputBlockLine = require('./AppContentCodeOutputBlockLine');

class AppContentCodeOutputBlock {
	static addData(_output, _code) {
		_output.classList.add('output-block');
		_output.classList.add('app_content_code_output_group_block');
		_output.setAttribute('file-name', _code.getAttribute('file-name'));
		_output.setAttribute('dir-name', _code.getAttribute('dir-name'));
	}

	static create(_outputGroup, _output, _code) {
		_outputGroup.appendChild(_output);
		AppContentCodeOutputBlockLine.create(_output, _code);
		this.addData(_output, _code);
	}
}

module.exports = AppContentCodeOutputBlock;
