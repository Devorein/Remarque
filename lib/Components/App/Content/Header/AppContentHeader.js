class AppContentHeader {
	static checkForCustom(element) {
		const custom_tags = [ [ '➥', 'custom' ], [ '❰ ❱', 'code' ], [ 'Explanation (', 'explanation' ] ];
		for (let i = 0; i < custom_tags.length; i++)
			if (element.textContent.includes(custom_tags[i][0])) return custom_tags[i][1];
		return false;
	}

	static parse(element) {
		let custom = AppContentHeader.checkForCustom(element),
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
}

module.exports = AppContentHeader;
