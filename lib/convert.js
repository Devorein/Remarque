const { JSDOM } = require('jsdom');
const showdown = require('showdown');
const converter = new showdown.Converter();
const fs = require('fs');
const path = require('path');

const { showErrorMessage, showSuccessMessage } = require('./output');
const { createTOCElem } = require('./toc');

let { htmlElementCreation, createElementFromHTML } = require('./utility');

function convert(file_dir, output_dir) {
	const start_time = Date.now();
	const chapter_name = path.basename(file_dir);
	const chapter_path = path.join(file_dir, chapter_name);
	const markdown_path = chapter_path + '.md';

	const markdown_exists = fs.existsSync(markdown_path);
	if (markdown_exists) {
		fs.readFile(markdown_path, 'utf8', (err, data) => {
			if (err) throw err;

			const html = converter.makeHtml(data);
			const { document } = new JSDOM(html).window;

			preprocessDOM(chapter_name, document);
			createTOCElem(document);
			headersClasses(document);
			addLineNumberClass(document);
			addOutputHighlight(document);
			explanationHeaderGroup(document);
			addBlockClasses(document);
			groupBlocks(document);
			createAdditionalElem(document);
			addBase64Images(file_dir, document);
			organizeItems(document);
			addCustomScripts(document);
			outputAsHTML(output_dir, file_dir, document);

			const end_time = Date.now();
			const time_diff = end_time - start_time;
			showSuccessMessage(`Took ${time_diff}ms or ${time_diff / 1000}s`);
		});
	}
	else showErrorMessage(`${markdown_path} doesn't exist`);
}
// * End OF Main function

// ? Check if the user provided the output dir and decide the output directory
function outputAsHTML(output_dir, file_dir, document) {
	const html_path = output_dir
		? path.join(output_dir, chapter_name + '.html')
		: path.join(file_dir, path.basename(file_dir) + '.html');
	fs.writeFile(html_path, document.documentElement.outerHTML.trim(), 'utf8', (err) => {
		if (err) throw err;
		showSuccessMessage(file_dir);
	});
}
function preprocessDOM(chapter_name, document) {
	htmlElementCreation(document, { type: 'title', textContent: chapter_name, parentElem: document.head });
	document.body.id = 'preview';
	document.body.classList.add('dark');

	// ? Add custom css styles
	const cssStyles = fs.readFileSync(__dirname + '\\Components\\style.css', 'UTF-8');
	htmlElementCreation(document, {
		type        : 'style',
		textContent : cssStyles,
		parentElem  : document.head
	});

	document.querySelector('h1').id = 'chapter-name';
	htmlElementCreation(document, {
		classes    : 'content',
		id         : 'content',
		parentElem : document.body,
		children   : [ ...Array.from(document.querySelector('body').children) ]
	});
}

// ? Give appropriate class to all headers
// : Create an object that has key of value to look for and value of the classname
function headersClasses(document) {
	Array.from(document.querySelectorAll('h2,h3,h4,h5')).forEach((header) => {
		const headerLevel = parseInt(header.tagName.substring(1));
		if (header.textContent.includes('❰ ❱')) header.classList.add('header--code');
		else if (header.textContent.includes('Explanation')) header.classList.add('header--explanation');
		else if (header.textContent.includes('🖼️')) header.classList.add('header--image');
		else if (header.tagName === 'H2') header.classList.add('header--topic');

		const isCustom = checkForCustom(header);
		if (isCustom || headerLevel > 2) {
			header.classList.add('header--subtopic');
			const label = isCustom ? 'custom' : 'actual';
			header.classList.add(`header--subtopic--${label}`);
			header.classList.add(`header--subtopic${headerLevel}--${label}`);
		}
	});
}

// ? Integrate all images as base64 text in img tag
function addBase64Images(file_dir, document) {
	const images = fs.readdirSync(file_dir).filter((file) => file.endsWith('.png'));
	for (let image of images) {
		const image_encoded = fs.readFileSync(path.join(file_dir, image), 'base64');
		const image_elem = document.querySelector(`img[src="${image}"]`);
		if (image_elem) image_elem.setAttribute('src', 'data:image/png;base64, ' + image_encoded);
	}
}

// ?
function addOutputHighlight(document) {
	Array.from(document.querySelectorAll('pre.line-numbers')).forEach((code) => {
		const outputLineDivElems = [];
		const all_line_numbers = [];

		// ? Check if the code block has output or not
		if (code.nextElementSibling.tagName == 'PRE') {
			code.nextElementSibling.classList.add('output-block');
			const output_lines = code.nextElementSibling.textContent.split('\n');

			// ? Iterate through each line
			for (let lines of output_lines) {
				if (output_lines.textContent !== '') {
					const outputLineDivElem = document.createElement('div');
					outputLineDivElem.classList.add('output-line');
					let temp = lines.match(/\d+[-,]?\d+\./);
					let output_line_numbers = temp ? temp : lines.match(/\d+/);

					if (output_line_numbers && output_line_numbers.index == 0) {
						output_line_numbers = output_line_numbers[0].replace('.', '');

						const outputLineNumberElem = document.createElement('span');
						outputLineNumberElem.textContent = output_line_numbers;
						outputLineNumberElem.classList.add('output-line-number');

						all_line_numbers.push(output_line_numbers);

						outputLineDivElem.appendChild(outputLineNumberElem);

						const line_text = document.createTextNode(lines.replace(output_line_numbers + '. ', ''));
						outputLineDivElem.appendChild(line_text);
					}
					else outputLineDivElem.appendChild(document.createTextNode(lines));
					outputLineDivElems.push(outputLineDivElem);
				}
			}

			// ? Removing the <code> element
			code.nextElementSibling.removeChild(code.nextElementSibling.firstElementChild);

			outputLineDivElems.forEach((outputDivElem) => {
				code.nextElementSibling.appendChild(outputDivElem);
			});

			// ? Get all unique ranges/line numbers
			let data_line_text = '';
			const unique_line_numbers = Array.from(new Set(all_line_numbers));

			// ? Create the data-line text
			for (let i = 0; i < unique_line_numbers.length; i++)
				data_line_text +=
					i + 1 == unique_line_numbers.length ? unique_line_numbers[i] + '' : unique_line_numbers[i] + ',';
			if (data_line_text !== '') code.setAttribute('data-line', data_line_text);
		}
	});
}

// ? Add class Line-numbers to code blocks
function addLineNumberClass(document) {
	const code_blocks = [];
	Array.from(document.querySelectorAll('code[class*="language-"')).forEach((code) => {
		code = code.parentElement;
		if (code.nextElementSibling && code.nextElementSibling.tagName == 'PRE') {
			code.classList.add('line-numbers');
			code_blocks.push([ code, code.nextElementSibling ]);
		}
		else code_blocks.push([ code ]);
	});
	code_blocks.forEach((code_block) => {
		const codeBlockElem = document.createElement('div');
		if (code_block.length == 1) codeBlockElem.classList.add('snippet-block');
		else codeBlockElem.classList.add('code-block');
		code_block[0].parentElement.insertBefore(codeBlockElem, code_block[0]);
		codeBlockElem.appendChild(code_block[0]);
		if (code_block[1]) codeBlockElem.appendChild(code_block[1]);
	});
}

// ? Group all explanation header and corresponding Ul together
function explanationHeaderGroup(document) {
	Array.from(document.querySelectorAll('.header--explanation')).forEach((header) => {
		let highlight_lines = [];
		if (header.nextElementSibling.tagName == 'UL') {
			header.nextElementSibling.classList.add('explanation-lines');
			explanationBlockElem = htmlElementCreation(document, {
				insertBefore : header,
				classes      : 'explanation-block',
				children     : [ header, header.nextElementSibling ]
			});

			const explanationList = explanationBlockElem.children[1];

			Array.from(explanationList.children).forEach((explanationList_item) => {
				const highlightNumberElem = document.createElement('span');
				const line_priority = explanationList_item.textContent.match(/\d+[LMH]/);
				if (line_priority && line_priority.index == 0) {
					highlight_lines.push(line_priority[0].replace(/[LHM]/, ''));
					const line_number = line_priority[0].match(/\d+/)[0];
					const priority = line_priority[0].match(/[LHM]/)[0];

					if (priority === 'L') highlightNumberElem.classList.add('highlight--low');
					else if (priority === 'M') highlightNumberElem.classList.add('highlight--medium');
					else if (priority === 'H') highlightNumberElem.classList.add('highlight--high');
					highlightNumberElem.textContent = line_number;
					explanationList_item.innerHTML = explanationList_item.innerHTML.replace(line_priority[0], '');
					explanationList_item.insertBefore(highlightNumberElem, explanationList_item.childNodes[0]);
				}
			});
		}
		highlight_lines.forEach((highlight_line) => {
			const code_block = header.parentElement.previousElementSibling.firstElementChild;
			let data_line = code_block.getAttribute('data-line');
			data_line += ',' + highlight_line;
			code_block.setAttribute('data-line', data_line);
		});
	});
}

// ? Checks if the element is custom made
function checkForCustom(element) {
	return element.textContent.includes('➥') ||
	element.textContent.includes('❰ ❱') ||
	element.textContent.includes('Explanation (')
		? true
		: false;
}

// ! Reuse the code and make more efficient algo
function organizeItems(document) {
	Array.from(document.querySelectorAll('h2')).forEach((topicHeader) => {
		topicHeader.classList.add('topic-header');
		const topicContainer = document.createElement('div');
		topicContainer.classList.add('topic-container');
		topicContainer.id = 'topic' + topicHeader.id;
		topicHeader.parentElement.insertBefore(topicContainer, topicHeader);
		topicContainer.appendChild(topicHeader);

		while (topicContainer.nextElementSibling && topicContainer.nextElementSibling.tagName !== 'H2') {
			nextElem = topicContainer.nextElementSibling;
			topicContainer.appendChild(nextElem);
		}
	});

	Array.from(document.querySelectorAll('.topic-container > h3')).forEach((subtopicHeader) => {
		const subtopicContainer = document.createElement('div');
		subtopicHeader.classList.add('subtopic-header');
		subtopicContainer.classList.add('subtopic-container');
		if (subtopicHeader.textContent.includes('➥')) subtopicContainer.classList.add('subtopic-container--custom');
		else subtopicContainer.classList.add('subtopic-container--actual');

		subtopicContainer.id = 'subtopic' + subtopicHeader.id;
		subtopicHeader.parentElement.insertBefore(subtopicContainer, subtopicHeader);
		subtopicContainer.appendChild(subtopicHeader);

		while (subtopicContainer.nextElementSibling && subtopicContainer.nextElementSibling.tagName !== 'H3') {
			nextElem = subtopicContainer.nextElementSibling;
			subtopicContainer.appendChild(nextElem);
		}
	});

	Array.from(document.querySelectorAll('.subtopic-container > h4')).forEach((subtopicHeader) => {
		const subtopicContainer = document.createElement('div');
		subtopicHeader.classList.add('subtopicL2-header');
		subtopicContainer.classList.add('subtopicL2-container');
		if (
			subtopicHeader.textContent.includes('➥') ||
			subtopicHeader.textContent.includes('❰ ❱') ||
			subtopicHeader.textContent.includes('Explanation (')
		)
			subtopicContainer.classList.add('subtopicL2-container--custom');
		else subtopicContainer.classList.add('subtopicL2-container--actual');

		subtopicContainer.id = 'subtopicL2' + subtopicHeader.id;
		subtopicHeader.parentElement.insertBefore(subtopicContainer, subtopicHeader);
		subtopicContainer.appendChild(subtopicHeader);

		while (subtopicContainer.nextElementSibling && subtopicContainer.nextElementSibling.tagName !== 'H4') {
			nextElem = subtopicContainer.nextElementSibling;
			subtopicContainer.appendChild(nextElem);
		}
	});

	Array.from(document.querySelectorAll('.subtopicL2-container > h5')).forEach((subtopicHeader) => {
		const subtopicContainer = document.createElement('div');
		subtopicHeader.classList.add('subtopicL3-header');
		subtopicContainer.classList.add('subtopicL3-container');
		if (
			subtopicHeader.textContent.includes('➥') ||
			subtopicHeader.textContent.includes('❰ ❱') ||
			subtopicHeader.textContent.includes('Explanation (')
		)
			subtopicContainer.classList.add('subtopicL3-container--custom');
		else subtopicContainer.classList.add('subtopicL3-container--actual');

		subtopicContainer.id = 'subtopicL3' + subtopicHeader.id;
		subtopicHeader.parentElement.insertBefore(subtopicContainer, subtopicHeader);
		subtopicContainer.appendChild(subtopicHeader);

		while (subtopicContainer.nextElementSibling && subtopicContainer.nextElementSibling.tagName !== 'H5') {
			nextElem = subtopicContainer.nextElementSibling;
			subtopicContainer.appendChild(nextElem);
		}
	});
}

// ? Add custom scripts
function addCustomScripts(document) {
	const featureJS = fs.readFileSync(path.join(__dirname, 'Components\\feature.js'), 'UTF-8');
	const prismJS = fs.readFileSync(path.join(__dirname, 'Components\\prism.js'), 'UTF-8');

	htmlElementCreation(document, {
		type        : 'script',
		textContent : featureJS,
		parentElem  : document.body
	});

	htmlElementCreation(document, {
		type        : 'script',
		textContent : prismJS,
		parentElem  : document.body
	});
}

// ? Add specific class name to specific text blocks
function addBlockClasses(document) {
	const block = {
		'🔵' : 'info-block',
		'💡' : 'tip-block',
		'📖' : 'example-block',
		'📝' : 'note-block',
		'⚠️' : 'warning-block',
		'❗'  : 'important-block',
		'📙' : 'definition-block',
		'⏩'  : 'syntax-block',
		'Q:' : 'question-block',
		'A:' : 'answer-block'
	};

	Array.from(document.querySelectorAll('p')).forEach((p) => {
		const entries = Object.entries(block);
		for (let i = 0; i < entries.length; i++) {
			if (p.textContent.startsWith(entries[i][0])) {
				p.classList.add('text-block');
				p.classList.add(entries[i][1]);
				break;
			}
			else if (p.firstElementChild && p.firstElementChild.tagName === 'IMG') p.classList.add('image-block');
			else p.classList.add('text-block');
		}
	});
}

// ? Create the necessary block containers
function groupBlocks(document) {
	const blocks = [ 'definition', 'info', 'tip', 'note', 'important', 'warning' ];
	const blockContainer = htmlElementCreation(document, {
		id         : 'blockContainer',
		classes    : 'block-container',
		parentElem : document.querySelector('.content')
	});
	for (let block of blocks) {
		const BlockHeader = htmlElementCreation(document, {
			type        : 'h2',
			textContent : block.charAt(0).toUpperCase() + block.substring(1) + 's',
			id          : `${block}s-header`,
			classes     : 'block-header'
		});

		htmlElementCreation(document, {
			classes        : [ `${block}-block-container`, `block-container` ],
			children       : [ BlockHeader ],
			clonedChildren : Array.from(document.querySelectorAll(`.${block}-block`)),
			parentElem     : blockContainer
		});
	}
}

// ? Add additional HTML Elements to the body
function createAdditionalElem(document) {
	const additionalHTML = `<div class="icon--slider" id="slider-icon">▶</div>
      <div id="overlay">
      </div>
      <div id="theme-icon-container">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 184 184" id="theme-icon"><defs><style>.cls-1{fill:#32578e;}.cls-2{fill:#0f315b;}</style></defs><title>Asset 1</title><g  data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><circle class="cls-1" cx="92" cy="92" r="92"/><circle class="cls-2" cx="104.4" cy="33.8" r="12.4"/><circle class="cls-2" cx="42.2" cy="38.1" r="7.5"/><circle class="cls-2" cx="110.1" cy="161.5" r="5.7"/><circle class="cls-2" cx="49.7" cy="81.7" r="5.7"/><circle class="cls-2" cx="49.7" cy="125.6" r="5.7"/><circle class="cls-2" cx="70.6" cy="64" r="7.5"/><circle class="cls-2" cx="22.5" cy="81.7" r="9.9"/><circle class="cls-2" cx="156.6" cy="106.5" r="9.9"/><circle class="cls-2" cx="46.3" cy="145.8" r="9.9"/></g></g></svg>
      </div>`;

	createElementFromHTML(document, additionalHTML).forEach((elem) => {
		document.body.appendChild(elem);
	});
}

module.exports = {
	convert
};
