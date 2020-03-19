let { htmlElementCreation } = require('./utility');

// ? Add class Line-numbers to code blocks
function addLineNumberClass(document) {
	const code_blocks = [];
	Array.from(document.querySelectorAll('code[class*="language-"')).forEach((code) => {
		code = code.parentElement;
		if (!code.children[0].classList.contains('language-shell')) {
			if (
				code.nextElementSibling &&
				code.nextElementSibling.tagName === 'PRE' &&
				code.nextElementSibling.children[0].classList.contains('language-shell') &&
				code.previousElementSibling.classList.contains('header--code')
			) {
				code.classList.add('line-numbers');
				code_blocks.push([ code, code.nextElementSibling ]);
			}
			else code_blocks.push([ code ]);
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
			classes      : code_block.length == 1 ? 'snippet-block' : 'code-block',
			insertBefore : code_block[0],
			children     : [ ...code_block ]
		});
	});
}

function addOutputHighlight(document, output) {
	const outputLineDivElems = [];
	const line_numbers = [];

	output.classList.add('output-block', 'language-shell');
	const output_lines = output.textContent.split('\n');
	// // ? Iterate through each line
	for (let line of output_lines) {
		if (output_lines.textContent !== '') {
			const outputLineDivElem = document.createElement('div');
			outputLineDivElem.classList.add('output-line');

			let matched_line = line.match(/^\d+([-,]+\d{0,3}){0,}\./);
			if (matched_line) {
				const output_line_numbers = matched_line[0].replace('.', '');

				htmlElementCreation(document, {
					type        : 'span',
					textContent : output_line_numbers,
					classes     : 'output-line-number',
					parentElem  : outputLineDivElem
				});

				line_numbers.push(output_line_numbers);

				const line_text = document.createTextNode(line.replace(matched_line[0] + ' ', ''));
				outputLineDivElem.appendChild(line_text);
			}
			else outputLineDivElem.appendChild(document.createTextNode(line));
			outputLineDivElems.push(outputLineDivElem);
		}
	}

	output.removeChild(output.firstElementChild);

	outputLineDivElems.forEach((outputLineDivElem) => {
		output.appendChild(outputLineDivElem);
	});

	let data_line_text = '';
	Array.from(new Set(line_numbers)).forEach((line_number, index) => {
		data_line_text += line_number + (index + 1 === line_numbers.length ? '' : ',');
	});
	if (data_line_text !== '') output.previousElementSibling.setAttribute('data-line', data_line_text);
}

module.exports = {
	addOutputHighlight,
	addLineNumberClass
};
