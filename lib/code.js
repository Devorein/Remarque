const { getSVGData, ICONS } = require('./file');

const { htmlElementCreation, detectLinePurpose, createElementFromHTML } = require('./utility');

function addCodeIcons(parent) {
	createCopyIcons(parent);
	createDownloadIcons(parent);
}

function createCopyIcons(parent) {
	htmlElementCreation({
		type        : 'span',
		classes     : 'icon--copy',
		textContent : '📄',
		parentElem  : parent
	});
}

function createDownloadIcons(parent) {
	const downloadIcon = getSVGData('download');
	htmlElementCreation({
		type       : 'span',
		classes    : 'icon--download',
		innerHTML  : downloadIcon,
		parentElem : parent
	});
}

function addCodeDatas(_code) {
	_code.classList.add('code-block');
	_code.firstElementChild.classList.add('code-item');
	addLineNumber(_code);
	addCodeIcons(_code);
	addFileName(_code);
}

// ? Add class Line-numbers to code blocks
function distinguishCodeBlock(_code) {
	const _prevElem = _code.previousElementSibling;
	if (
		_prevElem.classList.contains('header--code') ||
		(_prevElem.tagName === 'UL' && _prevElem.previousElementSibling.classList.contains('header--code'))
	)
		groupCodeBlocks(_code);
	else _code.classList.add('snippet-block');
}

function groupCodeBlocks(_code) {
	const _prev = _code.previousElementSibling;
	const _fileGroup = htmlElementCreation({
		classes  : 'file-group',
		children : [ ..._prev.children ]
	});
	_fileGroup.appendChild(
		htmlElementCreation({
			type        : 'span',
			classes     : 'file-toggle',
			textContent : '▶'
		})
	);
	if (_prev.tagName === 'UL') {
		_prev.parentElement.removeChild(_prev);
		[ ..._fileGroup.querySelectorAll('li') ].forEach(list => {
			if (list.children.length === 0) {
				const _fileName = htmlElementCreation({
					classes      : [ 'file-name', 'file-item', 'file-item--file' ],
					insertBefore : list
				});
				const filename = list.textContent;
				list.parentElement.removeChild(list);
				_fileName.append(
					htmlElementCreation({
						type     : 'span',
						classes  : 'file-item--icon',
						children : [ ...createElementFromHTML(ICONS[filename.split('.')[1]]) ]
					}),
					htmlElementCreation({
						type        : 'span',
						classes     : 'file-item--name',
						textContent : filename
					})
				);
			}
			else if (list.children.length !== 0) {
				const dirName = list.childNodes[0].textContent;
				htmlElementCreation({
					classes      : [ 'file-dir', 'file-block' ],
					insertBefore : list,
					children     : [
						htmlElementCreation({
							classes  : [ 'file-item', 'file-item--folder' ],
							children : [
								htmlElementCreation({
									type     : 'span',
									classes  : 'file-item--icon',
									children : [ ...createElementFromHTML(ICONS['folder']) ]
								}),
								htmlElementCreation({
									type        : 'span',
									classes     : 'file-item--name',
									textContent : dirName
								}),
								htmlElementCreation({
									type        : 'span',
									classes     : 'file-item--toggle',
									textContent : '⯆'
								})
							]
						}),
						htmlElementCreation({
							classes  : 'file-item-children',
							children : [ ...(list.children[1] ? list.children[1] : list.children[0]).children ]
						})
					]
				});
				list.parentElement.removeChild(list);
			}
		});
	}

	const _codeGroup = htmlElementCreation({
		classes      : 'code-group',
		insertBefore : _code
	});

	const _outputGroup = htmlElementCreation({
		classes      : 'output-group',
		insertBefore : _code
	});

	const _explanationGroup = htmlElementCreation({
		classes      : 'explanation-group',
		insertBefore : _code
	});

	_codeGroup.appendChild(_code);

	const _codeContainer = htmlElementCreation({
		classes      : 'code-container',
		insertBefore : _codeGroup,
		children     : [ _fileGroup, _codeGroup, _outputGroup, _explanationGroup ]
	});

	addCodeDatas(_code);

	let _traverser = BODY.children[1];
	while (_traverser.tagName === 'PRE' || _traverser.tagName === 'UL') {
		const _code = _codeGroup.lastElementChild.querySelector('code');
		if (_traverser.children[0].classList.contains('language-shell')) {
			_outputGroup.appendChild(_traverser);
			_traverser.classList.add('output-block');
			addOutputHighlight(_traverser, _code);
			const file_name = _code.getAttribute('file-name');
			const dir_name = _code.getAttribute('dir-name');
			_traverser.setAttribute('file-name', file_name);
			_traverser.setAttribute('dir-name', dir_name);
			_traverser.style.zIndex = '-1';
			_traverser.style.opacity = '0';
		}
		else if (_traverser.tagName === 'UL') {
			_explanationGroup.appendChild(_traverser);
			addExplanationHighlight(_traverser);
			_traverser.classList.add('explanation-block');
			_traverser.setAttribute('file-name', _code.getAttribute('file-name'));
			_traverser.setAttribute('dir-name', _code.getAttribute('dir-name'));
			_traverser.style.zIndex = '-1';
			_traverser.style.opacity = '0';
		}
		else {
			addCodeDatas(_traverser);
			_traverser.style.zIndex = '-1';
			_traverser.style.opacity = '0';
			_codeGroup.appendChild(_traverser);
		}
		_traverser = BODY.children[1];
	}
	_outputGroup.children[0].style.opacity = '1';
	_outputGroup.children[0].style.zIndex = '1';
	_explanationGroup.children[0].style.opacity = '1';
	_explanationGroup.children[0].style.zIndex = '1';
}

// ? Check explanation line number priority
function checkPriority(priority) {
	if (priority === 'L') return 'low';
	else if (priority === 'M') return 'medium';
	else if (priority === 'H') return 'high';
}

// ? Group all explanation header and corresponding Ul together
function addExplanationHighlight(_list) {
	[ ..._list.children ].forEach(_line => {
		const { textContent } = _line;
		let innerHTML = ``;
		const match = textContent.match(/([\d+\,\-?]+[LHM])\s/);
		const _parent = _list.parentElement.previousElementSibling.previousElementSibling.lastElementChild;
		if (match) {
			const text = textContent.substring(match[1].length);
			let lines = match[1].substring(0, match[1].length - 1);
			const priority = checkPriority(match[1].charAt(match[1].length - 1));
			if (lines.includes(',')) {
				lines.split(',').forEach(line => {
					addCodeHighlight(line, _parent, priority);
					innerHTML += `<span class="highlight-number highlight-number--${priority}">${line}</span>`;
				});
			}
			else {
				innerHTML += `<span class="highlight-number highlight-number--${priority}">${lines}</span>`;
				addCodeHighlight(lines, _parent, priority);
			}
			innerHTML += text;
		}
		else innerHTML = textContent;
		_line.innerHTML = innerHTML;
	});
}

function addLineNumber(_code) {
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
function addOutputHighlight(_parent, _code) {
	const _output = _parent.querySelector('code');
	const output_lines = _output.textContent.trim().split('\n');
	let innerHTML = ``;
	for (let line of output_lines) {
		let line_number = line.match(/^(\d+(?:\=\>)?\,?)*(\d+[\,\-]?)+\.{1,3}\s/);
		if (line_number) {
			const text = line.substring(line_number[0].length);
			if (line.includes('=>'))
				innerHTML += `<div class="output-line">${parseFC(line_number[0], _code)}${parseReg(
					line_number[0],
					_code
				)}${text}</div>`;
			else innerHTML += `<div class="output-line">${parseReg(line_number[0], _code)}${text}</div>`;
		}
		else innerHTML += `<div class="output-line">${line}</div>`;
	}
	_parent.removeChild(_output);
	_parent.append(...createElementFromHTML(innerHTML));
}

function parseFC(fc, _code) {
	let _innerHTML = ``;
	fcs = fc.substring(0, fc.lastIndexOf('=>')).split('=>');
	fcs.forEach((fc, index) => {
		if (fc.includes(',')) {
			fc.split(',').forEach(_fc => {
				addCodeHighlight(_fc, _code.parentElement, `function--${index + 1}`);
				_innerHTML += `<span class="highlight-number highlight-number--function--${index + 1}">${_fc}</span>`;
			});
		}
		else {
			addCodeHighlight(fc, _code.parentElement, `function--${index + 1}`);
			_innerHTML += `<span class="highlight-number highlight-number--function--${index + 1}">${fc}</span>`;
		}
	});
	return _innerHTML;
}

function parseReg(reg, _code) {
	let _innerHTML = ``;
	const purpose = detectLinePurpose(reg);
	regs = reg.substring(reg.lastIndexOf('=>')).replace(/[\.\s?:(\=\>)]/g, '').split(',');
	regs.forEach(reg => {
		if (reg.includes(',')) {
			reg.split(',').forEach(_reg => {
				addCodeHighlight(_reg, _code.parentElement, `${purpose}`);
				_innerHTML += `<span class="highlight-number highlight-number--${purpose}">${_reg}</span>`;
			});
		}
		else {
			addCodeHighlight(reg, _code.parentElement, `${purpose}`);
			_innerHTML += `<span class="highlight-number highlight-number--${purpose}">${reg}</span>`;
		}
	});
	return _innerHTML;
}

function addCodeHighlight(line, _code, purpose) {
	const line_height = 21;
	if (line.includes('-')) {
		const [ start, stop ] = line.split('-');
		const _line = htmlElementCreation({
			parentElem : _code,
			classes    : [ `highlight-line--${purpose}`, 'highlight-line' ],
			attributes : { 'target-line': line }
		});
		_line.style.height = `${(line_height - 1) * (parseInt(stop) - parseInt(start) + 1)}px`;
		_line.style.top = `${line_height * parseInt(start)}px`;
	}
	else {
		const _line = htmlElementCreation({
			parentElem : _code,
			classes    : [ `highlight-line--${purpose}`, 'highlight-line' ],
			attributes : { 'target-line': line }
		});
		_line.style.top = `${line_height * parseInt(line)}px`;
	}
}

// ? Add file name as attribute
// : Need to update
function addFileName(_parent) {
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

module.exports = {
	distinguishCodeBlock,
	addOutputHighlight,
	addCodeHighlight
};
