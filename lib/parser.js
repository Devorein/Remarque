const { getImageData } = require('./file');

const { checkForCustom, htmlElementCreation } = require('./utility');
const { distinguishCodeBlock, addCodeHighlight } = require('./code');

function parseInside(txt, left, right) {
	return left + txt + right;
}

function parseParagraph(paragraph) {
	let { innerHTML: text } = paragraph;
	text = text.replace(/\|\|\|(\S[\s\S]*?)\|\|\|/g, function(wm, m) {
		return /\S$/.test(m) ? parseInside(m, '<span class="high--text">', '</span>') : wm;
	});
	text = text.replace(/\|\|(\S[\s\S]*?)\|\|/g, function(wm, m) {
		return /\S$/.test(m) ? parseInside(m, '<span class="medium--text">', '</span>') : wm;
	});
	text = text.replace(/\|([^\s*][\s\S]*?)\|/g, function(wm, m) {
		return /\S$/.test(m) ? parseInside(m, '<span class="low--text">', '</span>') : wm;
	});
	paragraph.innerHTML = text;
	return paragraph;
}

// ! Do toc manip here
function parseHeader(element) {
	let custom = checkForCustom(element),
		type = '';
	if (element.tagName === 'H2') type = 'topic';
	else type = 'subtopic';
	element.classList.add(`${type}-header`);
	element.parentElement.classList.add(`${type}-container`);
	element.parentElement.id = `${element.id}_Container`;
	if (type === 'subtopic') {
		const level = parseInt(element.tagName.substring(1)) - 2;
		element.classList.add(`subtopicL${level}-header`);
		element.parentElement.classList.add(`subtopicL${level}-container`);
	}
	if (custom) {
		element.classList.add(`${type}-header--custom`);
		element.classList.add(`header--${custom}`);
	}
	else element.classList.add(`${type}-header--actual`);
}

// ? Add specific class name to specific text blocks
function addBlockClass(p) {
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
	const entries = Object.entries(block);
	for (let i = 0; i < entries.length; i++) {
		if (p.textContent.startsWith(entries[i][0])) {
			p.classList.add('text-block');
			p.classList.add(entries[i][1]);
			break;
		}
		else if (p.firstElementChild && p.firstElementChild.tagName === 'IMG') {
			p.classList.add('image-block');
			parseImage(p.firstElementChild);
			break;
		}
		else p.classList.add('text-block');
	}
	return p;
}

// ? Integrate all images as base64 text in img tag
function parseImage(image) {
	const image_encoded = getImageData(image.src);
	image.setAttribute('src', 'data:image/png;base64, ' + image_encoded);
}

function decideDOMLevel(_traverser, _parent) {
	const traverserTag = _traverser.tagName;
	const parentLevel = parseInt(_parent.firstElementChild.tagName.substring(1));
	if (!traverserTag.match(/H[1-6]/)) return 1;
	else if (traverserTag === `H${parentLevel + 1}`) return 2;
	else if (traverserTag === `H${parentLevel}`) return 3;
	else if (traverserTag === `H${parentLevel - 1}`) return 4;
	else return 5;
}

function parseList(_list) {
	if (_list.previousElementSibling.classList.contains('header--explanation')) {
		_list.classList.add('explanation-block');
	}
}

function parseCode(code) {
	distinguishCodeBlock(code);
}

module.exports = {
	parseParagraph,
	parseHeader,
	parseCode,
	parseList,
	addBlockClass,
	decideDOMLevel
};
