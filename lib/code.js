let { htmlElementCreation } = require('./utility');

// ? Add class Line-numbers to code blocks
function addLineNumberClass(document) {
	const code_blocks = [];
	Array.from(document.querySelectorAll('code[class*="language-"')).forEach((code) => {
		code = code.parentElement;
		if (!code.children[0].classList.contains('language-shell')) {
			if (code.previousElementSibling.classList.contains('header--code')) {
				code.classList.add('line-numbers');
				addFileName(code);
				if (
					code.nextElementSibling &&
					code.nextElementSibling.tagName === 'PRE' &&
					code.nextElementSibling.children[0].classList.contains('language-shell')
				)
					code_blocks.push({
						type      : 'code-block',
						childrens : [ code, code.nextElementSibling ]
					});
				else
					code_blocks.push({
						type      : 'code-block',
						childrens : [ code ]
					});
			}
			else
				code_blocks.push({
					type      : 'snippet-block',
					childrens : [ code ]
				});
		}
		else if (
			code.previousElementSibling &&
			code.previousElementSibling.tagName === 'PRE' &&
			!code.previousElementSibling.classList.contains('language-shell')
		) {
			addOutputHighlight(document, code);
		}
	});
	code_blocks.forEach((code_block) => {
		htmlElementCreation(document, {
			classes      : code_block.type,
			insertBefore : code_block.childrens[0],
			children     : [ ...code_block.childrens ]
		});
	});
}

function addOutputHighlight(document, output) {
	const outputLineDivElems = [];
	let all_highlight_lines = [];

	output.classList.add('output-block', 'language-shell');
	const output_lines = output.textContent.split('\n');
	// // ? Iterate through each line
	for (let line of output_lines) {
		if (line !== '') {
			let matched_line = line.replace(' ', '').match(/(\d{0,3}=>)*(\d{0,3}[-,]?)*\.{1,3}/);
			if (matched_line) {
				const line_purpose = detectLinePurpose(matched_line[0]);
				const containsFC = matched_line[0].match(/(\d=>)*/);
				let line_numbers = null;
				if (containsFC)
					line_numbers = matched_line[0].substring(containsFC[0].length).replace(/\./g, '').split(',');
				else line_numbers = matched_line[0].replace(/\./g, '').split(',');
				const matches = matched_line[0].match(/(\d[-]?)\d?/g);
				if (matches) matches.forEach((match) => all_highlight_lines.push(match));
				const text = line.substring(matched_line[0].length + 1);
				line_numbers.forEach((line_number) => {
					outputLineDivElems.push({
						fc      : containsFC[0] !== '' ? containsFC[0] : null,
						purpose : line_purpose,
						line    : line_number,
						text
					});
				});
			}
			else outputLineDivElems.push({ fc: null, line: null, text: line, purpose: null });
		}
	}

	const outputLines = [];
	outputLineDivElems.forEach((outputLineDivElem) => {
		const outputLine = document.createElement('div');
		outputLine.classList.add('output-line');
		const fc_lines = createFNSpans(document, outputLineDivElem.fc);
		fc_lines.forEach((fc_line) => {
			outputLine.appendChild(fc_line);
		});
		outputLine.appendChild(
			htmlElementCreation(document, {
				type        : 'span',
				textContent : outputLineDivElem.line,
				classes     : `${outputLineDivElem.purpose}-line-number`
			})
		);
		outputLine.appendChild(document.createTextNode(outputLineDivElem.text));
		outputLines.push(outputLine);
	});

	output.removeChild(output.firstElementChild);

	let data_line_text = output.previousElementSibling.getAttribute('data-line');
	data_line_text = data_line_text ? data_line_text : '';
	Array.from(new Set(all_highlight_lines)).forEach((line_number) => {
		data_line_text += data_line_text !== '' ? ',' + line_number : line_number;
	});

	if (data_line_text !== '') output.previousElementSibling.setAttribute('data-line', data_line_text);

	outputLines.forEach((outputLine) => {
		output.appendChild(outputLine);
	});
}

function detectLinePurpose(line) {
	const line_dots = line.match(/\./g) ? line.match(/\./g).length : 0;
	switch (line_dots) {
		case 0:
		case 1:
			return 'output';
		case 2:
			return 'input';
		case 3:
			return 'error';
	}
}

function createFNSpans(document, fctext) {
	const fnSpans = [];
	if (fctext) {
		fctext.match(/\d/g).forEach((fcline, index) => {
			fnSpans.push(
				htmlElementCreation(document, {
					type        : 'span',
					classes     : [ 'call-line-number', `call-line-number--${index + 1}` ],
					textContent : fcline
				})
			);
		});
	}
	return fnSpans;
}

// ? Add file name as attribute

function addFileName(parent) {
	const code = parent.querySelector('code');
	let lines = code.textContent.split('\n');
	const FILE = lines[0].match(/\/\/\s?FILE: /);
	if (FILE) {
		let file_name = lines[0].substring(FILE[0].length);
		file_name = file_name.substring(0, file_name.indexOf('.'));
		code.setAttribute('file-name', file_name);
		lines = lines.slice(1);
		code.textContent = lines.join('\n');
	}
	else code.setAttribute('file-name', 'sample');
}

function detectLinePurpose(line) {
	const line_dots = line.match(/\./g) ? line.match(/\./g).length : 0;
	switch (line_dots) {
		case 0:
		case 1:
			return 'output';
		case 2:
			return 'input';
		case 3:
			return 'error';
	}
}

module.exports = {
	addLineNumberClass
};
