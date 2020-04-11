const Prism = require('node-prismjs');

class AppContentCodeCode {
	static createDownloadIcons(parent) {
		const downloadIcon = BUTTONS['download'];
		htmlElementCreation({
			type       : 'span',
			classes    : 'icon--download',
			innerHTML  : downloadIcon,
			parentElem : parent
		});
	}

	static createCopyIcons(parent) {
		htmlElementCreation({
			type        : 'span',
			classes     : 'icon--copy',
			textContent : '📄',
			parentElem  : parent
		});
	}

	static addCodeIcons(parent) {
		this.createCopyIcons(parent);
		this.createDownloadIcons(parent);
	}

	static addLineNumber(_code) {
		const lines = _code.textContent.split('\n');
		const children = [];
		for (let i = 0; i < lines.length - 1; i++) {
			children.push(
				htmlElementCreation({
					type        : 'span',
					textContent : i + 1
				})
			);
		}
		htmlElementCreation({
			classes    : 'linenumber-container',
			parentElem : _code,
			children
		});
	}

	static addFileName(_parent) {
		const _code = _parent.querySelector('code');
		let lines = _code.textContent.split('\n');
		const FILE = lines[0].match(/\/\/\s?LOC:\s/);
		if (FILE) {
			let [ dir_name, file_name ] = lines[0].substring(FILE[0].length).split('/');
			_code.setAttribute('file-name', file_name);
			_code.setAttribute('dir-name', dir_name);
			lines = lines.slice(1);
			_code.textContent = lines.join('\n');
		}
		else {
			_code.setAttribute('file-name', 'sample');
			_code.setAttribute('dir-name', 'sample');
		}
	}

	static parseCode(_code) {
		_code.classList.add('code-block');
		_code.classList.add('app_content_code_code_group_block');
		this.addFileName(_code);
		this.addLineNumber(_code);
		this.addCodeIcons(_code);
		_code.firstElementChild.classList.add('code-item');
		const __code = _code.querySelector('code');
		const language = Prism.languages[__code.classList[0]] || Prism.languages.autoit;
		__code.innerHTML = Prism.highlight(__code.textContent, language);
	}

	static parseSnippet(_code) {
		_code.classList.add('snippet-block');
		const __code = _code.querySelector('code');
		const language = Prism.languages[__code.classList[0]] || Prism.languages.autoit;
		__code.innerHTML = Prism.highlight(__code.textContent, language);
	}

	static parse(_parent, _code, type) {
		if (_parent) _parent.appendChild(_code);
		if (type === 'snippet') this.parseSnippet(_code);
		else this.parseCode(_code);
	}

	static create(_code) {
		const _codeGroup = htmlElementCreation({
			classes      : [ 'code-group', 'app_content_code_code_group' ],
			insertBefore : _code
		});
		this.parse(_codeGroup, _code);
		return _codeGroup;
	}
}

module.exports = AppContentCodeCode;
