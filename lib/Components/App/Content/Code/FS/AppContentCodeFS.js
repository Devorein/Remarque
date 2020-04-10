class AppContentCodeFS {
	static create(_code) {
		const _prev = _code.previousElementSibling;

		const _fileGroup = htmlElementCreation({
			classes      : 'file-group',
			children     : [ ..._prev.children ],
			insertBefore : _code
		});

		_fileGroup.appendChild(
			htmlElementCreation({
				type     : 'span',
				classes  : 'file-toggle',
				children : [ createElementFromHTML(BUTTONS['triangle'])[0] ]
			})
		);
		if (_prev.tagName === 'UL') {
			_prev.parentElement.removeChild(_prev);
			[ ..._fileGroup.querySelectorAll('li') ].forEach(list => {
				if (list.children.length === 0) {
					const _fileName = htmlElementCreation({
						classes      : [ 'file-name', 'file-item', 'file-item--file' ],
						insertBefore : list
					});
					const filename = list.textContent;
					list.parentElement.removeChild(list);
					_fileName.append(
						htmlElementCreation({
							type     : 'span',
							classes  : 'file-item--icon',
							children : [ ...createElementFromHTML(ICONS[filename.split('.')[1]]) ]
						}),
						htmlElementCreation({
							type        : 'span',
							classes     : 'file-item--name',
							textContent : filename
						})
					);
				}
				else if (list.children.length !== 0) {
					const dirName = list.childNodes[0].textContent;
					htmlElementCreation({
						classes      : [ 'file-dir', 'file-block' ],
						insertBefore : list,
						children     : [
							htmlElementCreation({
								classes  : [ 'file-item', 'file-item--folder' ],
								children : [
									htmlElementCreation({
										type     : 'span',
										classes  : 'file-item--icon',
										children : [ ...createElementFromHTML(ICONS['folder']) ]
									}),
									htmlElementCreation({
										type        : 'span',
										classes     : 'file-item--name',
										textContent : dirName
									}),
									htmlElementCreation({
										type     : 'span',
										classes  : 'file-item--toggle',
										children : [ createElementFromHTML(BUTTONS['triangle'])[0] ]
									})
								]
							}),
							htmlElementCreation({
								classes  : 'file-item-children',
								children : [ ...(list.children[1] ? list.children[1] : list.children[0]).children ]
							})
						]
					});
					list.parentElement.removeChild(list);
				}
			});
		}
		return _fileGroup;
	}
}

module.exports = AppContentCodeFS;
