const fs = require('fs');
const path = require('path');

const { JSDOM } = require('jsdom');
const showdown = require('showdown');
const browserify = require('browserify');

const converter = new showdown.Converter();

const { parseParagraph, checkForCustom, checkPriority } = require('./parser');
const { showErrorMessage, showSuccessMessage } = require('./output');
const { createTOCElem } = require('./toc');
const { addLineNumberClass } = require('./code');
const { preprocessDOM, groupBlocks } = require('./dom');

let { htmlElementCreation } = require('./utility');

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
			global.document = document;
			global.BODY = document.body;

			browserify(path.join(__dirname, 'Components', 'index.js')).bundle((err, buf) => {
				// console.log(err);
				htmlElementCreation({
					type        : 'script',
					textContent : buf.toString(),
					parentElem  : BODY
				});

				preprocessDOM(chapter_name);
				createTOCElem();
				headersClasses();
				addLineNumberClass();
				addBlockClasses();
				groupBlocks();
				addBase64Images(file_dir);
				organizeItems();
				addCustomScripts();
				outputAsHTML(output_dir, file_dir, chapter_name);

				const end_time = Date.now();
				const time_diff = end_time - start_time;
				showSuccessMessage(`Took ${time_diff}ms or ${time_diff / 1000}s`);
			});
		});
	}
	else showErrorMessage(`${markdown_path} doesn't exist`);
}
// * End OF Main function

// ? Check if the user provided the output dir and decide the output directory
function outputAsHTML(output_dir, file_dir, chapter_name) {
	const html_path = output_dir
		? path.join(output_dir, chapter_name + '.html')
		: path.join(file_dir, path.basename(file_dir) + '.html');
	fs.writeFile(html_path, document.documentElement.outerHTML.trim(), 'utf8', (err) => {
		if (err) throw err;
		showSuccessMessage(file_dir);
	});
}

// ? Give appropriate class to all headers
// : Create an object that has key of value to look for and value of the classname
function headersClasses() {
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
function addBase64Images(file_dir) {
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
		const explanationBlockElem = htmlElementCreation({
			insertBefore : header,
			classes      : 'explanation-block',
			children     : [ header, header.nextElementSibling ]
		});

		const explanationList = explanationBlockElem.children[1];
		const explanation_lines = [];
		Array.from(explanationList.children).forEach((explanationList_item) => {
			const explanation_line = htmlElementCreation({
				type    : 'li',
				classes : 'explanation-line'
			});
			const line_priority = explanationList_item.textContent.match(/^(\d+[,-]?)+[LHM]/);
			if (line_priority) {
				const highlight_lines = line_priority[0].match(/\d+[-\d+]*/g);
				all_highlight_lines.push(...highlight_lines);
				const priority = line_priority[0].match(/[LHM]/)[0];

				const highlight_lines_elems = highlight_lines.map((line_number) => {
					return htmlElementCreation({
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
					htmlElementCreation({
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

// ! Reuse the code and make more efficient algo
function organizeItems() {
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
	htmlElementCreation({
		id         : 'bottom',
		parentElem : document.getElementById('content')
	});
}

// ? Add custom scripts
function addCustomScripts() {
	const prismJS = fs.readFileSync(path.join(__dirname, 'Components', 'external', 'prism.js'), 'UTF-8');
	[ prismJS ].forEach((script) => {
		htmlElementCreation({
			type        : 'script',
			textContent : script,
			parentElem  : BODY
		});
	});
}

// ? Add specific class name to specific text blocks
function addBlockClasses() {
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
		parseParagraph(p);
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

module.exports = {
	convert
};
