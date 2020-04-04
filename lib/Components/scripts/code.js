const { copyToClipboard, download, removeClass } = require('./utility');

function toggleFileSystem() {
	Array.from(document.querySelectorAll('.file-toggle')).forEach(_file_toggle => {
		_file_toggle.addEventListener('click', e => {
			_file_toggle.parentElement.parentElement.classList.toggle('fs--toggle');
		});
	});
}

// ✅
function code_copyIClickCopiesCode() {
	Array.from(document.querySelectorAll('.icon--copy')).forEach(_copy_icon => {
		_copy_icon.addEventListener('click', () => {
			copyToClipboard(_copy_icon.parentElement.querySelector('code').textContent);
			_copy_icon.textContent = 'copied';
			_copy_icon.style.left = 'calc(100% - 65px)';
			setTimeout(() => {
				_copy_icon.textContent = '📄';
				_copy_icon.style.left = 'calc(100% - 30px)';
			}, 1000);
		});
	});
}

// ✅
function code_downloadIClickDownloadsCode() {
	Array.from(document.querySelectorAll('.icon--download')).forEach(_download_icon => {
		_download_icon.addEventListener('click', () => {
			const code = _download_icon.parentElement.querySelector('code');
			download(`${code.getAttribute('file-name')}`, code.textContent);
		});
	});
}

function keepCodeIconsAtSamePlace() {
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

function scrollIntoViewOutput() {
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

function highlightLineHighlights() {
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

function highlight_lineClickScrollsLine() {
	Array.from(document.querySelectorAll('.highlight-line')).forEach(_highlight_line => {
		_highlight_line.addEventListener('click', e => {
			const _code = _highlight_line.parentElement.parentElement.querySelector('code');
			const file_name = _code.getAttribute('file-name');
			const dir_name = _code.getAttribute('dir-name');
			const target_line = _highlight_line.getAttribute('target-line');
			const _codeContainer = _code.parentElement.parentElement.parentElement;
			if (_highlight_line.classList.contains('explanation-line')) {
				const _explanationGroup = _codeContainer.querySelector('.explanation-group');
				const _explanationLine = _explanationGroup.querySelector(
					`ul[file-name = "${file_name}"][dir-name="${dir_name}"] span[target-line="${target_line}"]`
				);
				scrollHighlightLine(_explanationLine.parentElement);
			}
			else {
				const _outputGroup = _codeContainer.querySelector('.output-group');
				const _outputLine = _outputGroup.querySelector(
					`pre[file-name = "${file_name}"][dir-name="${dir_name}"] span[target-line="${target_line}"]`
				);
				scrollHighlightLine(_outputLine.parentElement);
			}
		});
	});
}

function scrollHighlightLine(target) {
	target.classList.add('highlight');
	const target_pos = target.offsetTop;
	target.parentElement.parentElement.parentElement.previousElementSibling.scrollIntoView({
		behavior : 'smooth'
	});
	const current_position = target.parentElement.scrollTop;
	if (current_position < target_pos)
		while (target.parentElement.scrollTop + 475 < target_pos) target.parentElement.scrollBy(0, 50);
	else if (target_pos < current_position)
		while (target.parentElement.scrollTop > target_pos) target.parentElement.scrollBy(0, -50);
	setTimeout(() => {
		target.classList.remove('highlight');
	}, 1000);
}

// ! Will be changed based on Code organization
function codeDisplayClickHandler() {
	const _codeDisplayIcon = document.getElementById('codeDisplayIcon');
	_codeDisplayIcon.addEventListener('click', e => {
		const isRow = _codeDisplayIcon.classList.contains('row-view');
		if (isRow) {
			_codeDisplayIcon.classList.add('column-view');
			_codeDisplayIcon.classList.remove('row-view');
		}
		else {
			_codeDisplayIcon.classList.add('row-view');
			_codeDisplayIcon.classList.remove('column-view');
		}
		changeCodeDisplay(isRow ? 'R' : 'C');
		window.localStorage.setItem('codeDisplay', isRow ? 'R' : 'C');
	});
}

function changeCodeDisplay(value) {
	Array.from(document.querySelectorAll('.code-block')).forEach(codeBlock => {
		codeBlock.style.flexDirection = value === 'C' ? 'row' : 'column';
	});
}

//🔨
function showFile() {
	Array.from(document.querySelectorAll('.file-name')).forEach(_file_name => {
		_file_name.addEventListener('click', e => {
			removeClass('.file-name', 'selected');
			_file_name.classList.add('selected');
			let _traverser = _file_name;
			const file_name = _file_name.querySelector('.file-item--name').textContent;
			const dir_name = _file_name.parentElement.previousElementSibling.querySelector('.file-item--name')
				.textContent;
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
		});
	});
}

function fileChildrenToggle() {
	Array.from(document.querySelectorAll('.file-item--toggle')).forEach(_file_toggle => {
		_file_toggle.addEventListener('click', e => {
			_file_toggle.parentElement.nextElementSibling.classList.toggle('hidden');
			const hidden = _file_toggle.parentElement.nextElementSibling.classList.contains('hidden');
			if (hidden) _file_toggle.textContent = '⯇';
			else if (!hidden) _file_toggle.textContent = '⯆';
		});
	});
}

module.exports = {
	toggleFileSystem,
	code_copyIClickCopiesCode,
	code_downloadIClickDownloadsCode,
	highlight_lineClickScrollsLine,
	keepCodeIconsAtSamePlace,
	scrollIntoViewOutput,
	highlightLineHighlights,
	codeDisplayClickHandler,
	showFile,
	fileChildrenToggle
};
