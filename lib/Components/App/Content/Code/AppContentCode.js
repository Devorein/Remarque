const AppContentCodeCode = require('./Code/AppContentCodeCode');
const AppContentCodeExp = require('./Exp/AppContentCodeExp');
const AppContentCodeExpBlock = require('./Exp/AppContentCodeExpBlock');
const AppContentCodeOutput = require('./Output/AppContentCodeOutput');
const AppContentCodeOutputBlock = require('./Output/AppContentCodeOutputBlock');
const AppContentCodeFS = require('./FS/AppContentCodeFS');

class AppContentCode {
	static groupCodeBlocks(_code) {
		const _fileGroup = AppContentCodeFS.create(_code);
		const _explanationGroup = AppContentCodeExp.create(_code);
		const _outputGroup = AppContentCodeOutput.create(_code);
		const _codeGroup = AppContentCodeCode.create(_code);
		htmlElementCreation({
			classes      : [ 'code-container', 'app_content_code' ],
			insertBefore : _fileGroup,
			children     : [ _fileGroup, _codeGroup, _outputGroup, _explanationGroup ]
		});
		let _traverser = _app.children[1];
		while (_traverser.tagName === 'PRE' || _traverser.tagName === 'UL') {
			const _code = _codeGroup.lastElementChild.querySelector('code');
			if (_traverser.children[0].classList.contains('language-shell'))
				AppContentCodeOutputBlock.create(_outputGroup, _traverser, _code);
			else if (_traverser.tagName === 'UL') AppContentCodeExpBlock.create(_explanationGroup, _traverser, _code);
			else AppContentCodeCode.parse(_codeGroup, _traverser, 'code');
			_traverser = _app.children[1];
		}
	}

	static parse(_code) {
		const _prevElem = _code.previousElementSibling;
		if (
			_prevElem.classList.contains('header--code') ||
			(_prevElem.tagName === 'UL' && _prevElem.previousElementSibling.classList.contains('header--code'))
		)
			this.groupCodeBlocks(_code);
		else AppContentCodeCode.parse(null, _code, 'snippet');
	}
}

module.exports = AppContentCode;
