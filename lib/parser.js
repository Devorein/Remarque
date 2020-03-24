function parseParagraph(paragraph) {
	let sentence = paragraph.textContent;
	const res = [],
		regex = /\|{1,3}/g;
	const words = sentence.split(' ');
	const { length } = words;
	for (let i = 0; i < length; i++) {
		const word = words[i];
		if (word.startsWith('|')) {
			const temp = [];
			temp.push(word);
			const priority = detectPriority(word.match(regex)[0]);
			for (let j = i + 1; j < length; j++) {
				const _word = words[j];
				temp.push(_word);
				if (_word.endsWith('|')) {
					i = j;
					const sentence = temp.join(' ').replace(regex, '');
					res.push({
						sentence,
						priority
					});
					break;
				}
			}
		}
	}
	res.unshift({
		sentence : sentence.substring(0, sentence.indexOf('|')).trim(),
		priority : 'normal'
	});
	res.push({
		sentence : sentence.substring(sentence.lastIndexOf('|')).replace(regex, '').trim(),
		priority : 'normal'
	});

	while (paragraph.firstChild) paragraph.removeChild(paragraph.firstChild);
	res.filter(({ sentence }) => sentence !== '' && sentence !== ' ').forEach((block) => {
		const _text_node = document.createElement('span');
		_text_node.classList.add(`${block.priority}--text`);
		_text_node.textContent = block.sentence;
		paragraph.appendChild(_text_node);
	});
}

function detectPriority(word) {
	const priority = word.length;
	switch (priority) {
		case 1:
			return 'low';
		case 2:
			return 'medium';
		case 3:
			return 'high';
	}
}

module.exports = {
	parseParagraph
};
