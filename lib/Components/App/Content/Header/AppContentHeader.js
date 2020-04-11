// class AppContentHeader {
// 	static parse(_header) {
// 		const _headerContainer = htmlElementCreation({
// 			insertBefore : _header,
// 			classes      : 'app_content_item_header',
// 			id           : _header.id
// 		});

// 		let type = '',
// 			content = '',
// 			_type = null;
// 		if (_header.textContent.match(/^CODE:\s/)) {
// 			type = 'code';
// 			content = _header.textContent.replace('CODE: ', '');
// 			_type = createElementFromHTML(BUTTONS['code'])[0];
// 			_type.classList.add('app_content_item_header_type');
// 		}
// 		else if (_header.textContent.match(/^CUSTOM:\s/)) {
// 			type = 'custom';
// 			content = _header.textContent.replace('CUSTOM', '');
// 			_type = createElementFromHTML(BUTTONS['custom'])[0];
// 			_type.classList.add('app_content_item_header_type');
// 		}
// 		else {
// 			type = 'actual';
// 			content = _header.textContent;
// 		}
// 		_headerContainer.append(
// 			_type,
// 			htmlElementCreation({
// 				classes     : 'app_content_item_header_text',
// 				textContent : content
// 			})
// 		);

// 		_headerContainer.classList.add(`app_content_item_header--${type}`);

// 		if (_header.tagName === 'H2') type = 'topic';
// 		else type = 'subtopic';
// 		_headerContainer.classList.add(`app_content_item_header--${type}`);

// 		_headerContainer.parentElement.classList.add(`app_content_item--${type}`);

// 		if (type === 'subtopic') {
// 			const level = parseInt(_header.tagName.substring(1)) - 2;
// 			_headerContainer.classList.add(`app_content_item_header--subtopicL${level}`);
// 			_headerContainer.parentElement.classList.add(`app_content_item--subtopicL${level}`);
// 		}
// 	}
// }
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

// module.exports = AppContentHeader;
