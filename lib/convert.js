const { JSDOM } = require('jsdom');
const showdown = require('showdown');
const converter = new showdown.Converter();
const fs = require('fs');
const path = require('path');

const { showErrorMessage, showSuccessMessage } = require('./output');
const { createTOCElem } = require('./toc');
const { addLineNumberClass } = require('./code');

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
		children   : [
			htmlElementCreation(document, {
				id         : 'top',
				parentElem : document.getElementById('content')
			}),
			...Array.from(document.querySelector('body').children)
		]
	});
}

// ? Give appropriate class to all headers
// : Create an object that has key of value to look for and value of the classname
function headersClasses(document) {
	Array.from(document.querySelectorAll('h2,h3,h4,h5')).forEach((header) => {
		const headerLevel = parseInt(header.tagName.substring(1));
		if (header.textContent.includes('❰ ❱')) header.classList.add('header--code');
		else if (header.textContent.includes('Explanation')) addExplanation(document, header);
		else if (header.textContent.includes('📷')) header.classList.add('header--image');
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

// ? Group all explanation header and corresponding Ul together
function addExplanation(document, header) {
	header.classList.add('header--explanation');
	let all_highlight_lines = [];
	if (header.nextElementSibling.tagName == 'UL') {
		header.nextElementSibling.classList.add('explanation-lines');
		const explanationBlockElem = htmlElementCreation(document, {
			insertBefore : header,
			classes      : 'explanation-block',
			children     : [ header, header.nextElementSibling ]
		});

		const explanationList = explanationBlockElem.children[1];
		const explanation_lines = [];
		Array.from(explanationList.children).forEach((explanationList_item) => {
			const explanation_line = htmlElementCreation(document, {
				type    : 'li',
				classes : 'explanation-line'
			});
			const line_priority = explanationList_item.textContent.match(/^(\d+[,-]?)+[LHM]/);
			if (line_priority) {
				const highlight_lines = line_priority[0].match(/\d+[-\d+]*/g);
				all_highlight_lines.push(...highlight_lines);
				const priority = line_priority[0].match(/[LHM]/)[0];

				const highlight_lines_elems = highlight_lines.map((line_number) => {
					return htmlElementCreation(document, {
						type        : 'span',
						classes     : checkPriority(priority),
						textContent : line_number
					});
				});
				highlight_lines_elems.forEach((explanation_highlight_line) => {
					explanation_line.appendChild(explanation_highlight_line);
				});
				const explanation = explanationList_item.innerHTML.substring(line_priority[0].length + 1);
				explanation_line.appendChild(document.createTextNode(explanation));
			}
			else {
				explanation_line.appendChild(
					htmlElementCreation(document, {
						textContent : explanationList_item.textContent
					})
				);
			}
			explanation_lines.push(explanation_line);
		});
		Array.from(header.nextElementSibling.children).forEach((child) => {
			child.parentElement.removeChild(child);
		});
		explanation_lines.forEach((explanation_line) => {
			header.nextElementSibling.appendChild(explanation_line);
		});
	}
	const code_block = header.parentElement.previousElementSibling.previousElementSibling;
	if (code_block) {
		let data_line = code_block.getAttribute('data-line');
		data_line = data_line ? data_line : '';
		all_highlight_lines.forEach((highlight_line) => {
			data_line += ',' + highlight_line;
		});
		code_block.setAttribute('data-line', data_line.slice(1));
	}
}

function checkPriority(priority) {
	if (priority === 'L') return 'highlight--low';
	else if (priority === 'M') return 'highlight--medium';
	else if (priority === 'H') return 'highlight--high';
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
	htmlElementCreation(document, {
		id         : 'bottom',
		parentElem : document.getElementById('content')
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
	const additionalHTML = `
      <div id="overlay">
      </div>
      <div class="dropzone" id = "dropzone-left"></div>
      <div class="dropzone" id = "dropzone-right"></div>
      `;

	createElementFromHTML(document, additionalHTML).forEach((elem) => {
		document.body.appendChild(elem);
	});
}

module.exports = {
	convert
};
