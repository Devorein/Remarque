function getHeaderPosition() {
	const temp = {};
	Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).forEach((header) => {
		const top = header.offsetTop;
		const level = header.tagName.substring(1);
		temp[header.id] = [ top, level ];
	});
	return temp;
}

function getallTOCElems() {
	const temp = {};
	Array.from(document.querySelectorAll('.toc--L1 .toc-item')).forEach((tocElem) => {
		temp[tocElem.id] = tocElem.textContent;
	});
	return temp;
}

function initialSetup() {
	window._toc = document.getElementById('TOC');
	window._content = document.getElementById('content');
	window._overlay = document.getElementById('overlay');
	window._slider = document.getElementById('slider');

	globa.total_seconds = 0;
	_toc.classList.add('dropzone-left');
	window.allTOCElems = getallTOCElems();
	window.allHeadingPos = getHeaderPosition();
}

function usePreviousSetup() {
	const theme = window.localStorage.getItem('theme');
	const lastLink = window.localStorage.getItem('last-link');
	const lastFilePath = window.localStorage.getItem('last-file');
	const tocSearchValue = window.localStorage.getItem('tocSearchValue');
	const codeDisplay = window.localStorage.getItem('codeDisplay');
	const tocCodeSearch = window.localStorage.getItem('tocCodeSearch');
	const tocToggleCustom = window.localStorage.getItem('tocToggleCustom');
	const tocPosition = window.localStorage.getItem('tocPosition');
	const tocSize = window.localStorage.getItem('tocSize');

	const currentFilePath = window.location.pathname;

	const _leftDropZone = document.getElementById('dropzone-left');
	const _rightDropZone = document.getElementById('dropzone-right');
	const _tocCodeSearchIcon = document.getElementById('tocCodeSearch');
	const _tocToggleCustomIcon = document.getElementById('tocToggleCustom');

	if (theme === 'dark') themeToggler('light', 'dark');
	else if (theme === 'light') themeToggler('dark', 'light');
	const isSameFile = currentFilePath === lastFilePath;
	if (!isSameFile) {
		window.localStorage.removeItem('last-link');
		window.localStorage.setItem('last-file', currentFilePath);
	}
	else {
		Array.from(document.querySelectorAll('.code-block')).forEach((codeBlock) => {
			codeBlock.style.flexDirection = codeDisplay === 'C' ? 'row' : 'column';
		});
		toggleTOCElem(tocSearchValue);
		_tocInputField.value = tocSearchValue;
		if (tocCodeSearch === 'true') _tocCodeSearchIcon.classList.add('activated');
		searchButtonHandler('tocCodeSearch', tocCodeSearch);
		if (tocToggleCustom === 'true') _tocToggleCustomIcon.classList.add('activated');
		searchButtonHandler('tocToggleCustom', tocToggleCustom);
		_toc.style.width = `${tocSize}px`;
		if (tocPosition === 'left') _leftDropZone.style.width = `${tocSize}px`;
		else if (tocPosition === 'right') _rightDropZone.style.width = `${tocSize}px`;
		_content.style.width = `calc(100% - ${parseInt(tocSize) + 25}px)`;
		document.getElementById(`dropzone-${tocPosition}`).appendChild(_toc);
		repositionSlider(`dropzone-${tocPosition}`);

		if (lastLink && document.getElementById(lastLink.substring(1))) {
			const lastLinkContainer = document.getElementById(lastLink.substring(1) + '_container');
			if (lastLinkContainer)
				lastLinkContainer.scrollIntoView({
					behavior : 'smooth'
				});
			document.getElementById(lastLink.substring(1)).scrollIntoView({
				behavior : 'smooth'
			});
		}
	}
}

module.exports = {
	initialSetup,
	usePreviousSetup
};
