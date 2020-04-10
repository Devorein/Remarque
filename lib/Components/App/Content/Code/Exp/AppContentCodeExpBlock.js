const AppContentCodeExpBlockLine = require('./AppContentCodeExpBlockLine');

class AppContentCodeExpBlock {
	static addData(_list, _code) {
		_list.classList.add('explanation-block');
		_list.classList.add('app_content_code_explanation_group_block');
		_list.setAttribute('file-name', _code.getAttribute('file-name'));
		_list.setAttribute('dir-name', _code.getAttribute('dir-name'));
	}

	static create(_explanationGroup, _list, _code) {
		_explanationGroup.appendChild(_list);
		AppContentCodeExpBlockLine.create(_list, _code);
		this.addData(_list, _code);
	}
}

module.exports = AppContentCodeExpBlock;
