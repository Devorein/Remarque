window.onload = () => {
	const allHeadingPos = {};
	const allTOCElems = {};

	const _toc = document.getElementById('TOC');
	const _slider = document.getElementById('slider');
	const _content = document.getElementById('content');
	const _tocInputField = document.getElementById('tocInputField');
	const _tocCodeSearch = document.getElementById('tocCodeSearch');
	const _tocToggleCustom = document.getElementById('tocToggleCustom');
	const _searchIgnoreCap = document.getElementById('searchIgnoreCap');
	const _codeDisplayIcon = document.getElementById('codeDisplayIcon');
	const _overlay = document.getElementById('overlay');
	const _expandTOCIcon = document.getElementById('expandTOC');
	const _collapseTOCIcon = document.getElementById('collapseTOC');
	const _pageExtremeTopIcon = document.getElementById('pageExtremeTopIcon');
	const _pageExtremeBottomIcon = document.getElementById('pageExtremeBottomIcon');
	const _leftDropZone = document.getElementById('dropzone-left');
	const _rightDropZone = document.getElementById('dropzone-right');

	let allCustomSubtopicsTocs = [];
	_toc.classList.add('dropzone-left');

	Array.from(document.querySelectorAll('.toc--content')).forEach((tocContent) => {
		if (
			tocContent.textContent.includes('➥') ||
			tocContent.textContent.includes('Explanation (') ||
			tocContent.textContent.includes('❰ ❱')
		)
			allCustomSubtopicsTocs.push(tocContent.getAttribute('href'));
	});

	let blockContainerChild = 0;
	let totalBlockContainerChild = Array.from(document.querySelectorAll('.block-container .text-block')).length;

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

	(function getHeaderPosition() {
		Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).forEach((header) => {
			const top = header.offsetTop;
			const level = header.tagName.substring(1);
			allHeadingPos[header.id] = [ top, level ];
		});
	})();

	(function getallTOCElems() {
		Array.from(document.querySelectorAll('.toc--L1 .toc-item')).forEach((tocElem) => {
			allTOCElems[tocElem.id] = tocElem.textContent;
		});
	})();

	(function detectNewFile() {
		const isSameFile = currentFilePath === lastFilePath;
		if (!isSameFile) {
			window.localStorage.removeItem('last-link');
			window.localStorage.setItem('last-file', currentFilePath);
		}
		else {
			toggleTOCElem(tocSearchValue);
			_tocInputField.value = tocSearchValue;
			changeCodeDisplay(codeDisplay);
			if (tocCodeSearch === 'true') _tocCodeSearch.classList.add('activated');
			searchButtonHandler('tocCodeSearch', tocCodeSearch);
			if (tocToggleCustom === 'true') _tocToggleCustom.classList.add('activated');
			searchButtonHandler('tocToggleCustom', tocToggleCustom);
			_toc.style.width = `${tocSize}px`;
			_leftDropZone.style.width = `${tocSize}px`;
			_rightDropZone.style.width = `${tocSize}px`;
			_content.style.width = `calc(100% - ${tocSize}px)`;
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
	})();

	(function scrollExtremeToggle() {
		[ _pageExtremeTopIcon, _pageExtremeBottomIcon ].forEach((icon) => {
			icon.addEventListener('click', (e) => {
				document.getElementById(icon.id.includes('Bottom') ? 'bottom' : 'top').scrollIntoView({
					behavior : 'smooth'
				});
			});
		});
	})();

	// ? Use last saved settings by user
	(function usePreviousSetup() {
		_overlay.addEventListener('click', (e) => {
			_overlay.style.display = 'none';
			_overlay.removeChild(_overlay.firstElementChild);
		});

		if (theme === 'dark') themeToggler('light', 'dark');
		else if (theme === 'light') themeToggler('dark', 'light');
	})();

	(function addTOCSearch() {
		_tocInputField.addEventListener('input', (e) => {
			window.localStorage.setItem('tocSearchValue', e.target.value);
			toggleTOCElem(e.target.value);
		});
	})();

	function toggleTOCElem(value) {
		const ignoreCap = _searchIgnoreCap.classList.contains('activated');
		Object.entries(allTOCElems).forEach((tocElem) => {
			if (ignoreCap && tocElem[1].toLowerCase().includes(value.toLowerCase()))
				document.querySelector(`#${tocElem[0]}`).style.display = 'initial';
			else if (!ignoreCap && tocElem[1].includes(value))
				document.querySelector(`#${tocElem[0]}`).style.display = 'initial';
			else document.querySelector(`#${tocElem[0]}`).style.display = 'none';
		});
	}

	let dragged;

	(function dragTOC() {
		document.addEventListener(
			'dragover',
			function(event) {
				// prevent default to allow drop
				event.preventDefault();
			},
			false
		);

		document.addEventListener(
			'dragenter',
			function(event) {
				if (event.target.className == 'dropzone' && !dragged.classList.contains(event.target.id)) {
					event.target.style.background = 'purple';
					event.target.style.opacity = '0.5';
				}
			},
			false
		);

		document.addEventListener(
			'dragleave',
			function(event) {
				if (event.target.className == 'dropzone') {
					event.target.style.background = '';
				}
			},
			false
		);

		document.addEventListener(
			'drop',
			function(event) {
				event.preventDefault();
				if (event.target.className == 'dropzone') {
					event.target.style.background = '';
					event.target.style.opacity = '1';
					dragged.parentNode.removeChild(dragged);
					event.target.appendChild(dragged);
					window.localStorage.setItem('tocPosition', _toc.parentElement.id.split('-')[1]);
					repositionSlider(event.target.id);
				}
			},
			false
		);
	})();

	function repositionSlider(id) {
		_toc.classList.add(id);
		if (id === 'dropzone-left') {
			_toc.classList.remove('dropzone-right');
			_toc.style.left = '0px';
			_content.style.left = `${parseInt(_toc.style.width)}px`;
		}
		else if (id === 'dropzone-right') {
			_toc.classList.remove('dropzone-left');
			_content.style.left = '0px';
			_toc.style.width = `${parseInt(window.innerWidth - _content.style.width)}px)`;
		}
	}

	(function dragSlider() {
		_slider.addEventListener('drag', (e) => {
			resizeContent(e.clientX);
		});

		document.addEventListener(
			'dragstart',
			function(event) {
				dragged = event.target.parentElement;
			},
			false
		);

		_slider.addEventListener('dragend', (e) => {
			resizeContent(e.clientX);
		});
	})();

	// : Check for refactoring
	function resizeContent(lastWidth) {
		if (lastWidth < 500 && _toc.classList.contains('dropzone-left')) {
			_toc.style.width = `${lastWidth}px`;
			_toc.style.left = '0px';
			_content.style.width = `calc(100% - ${parseInt(_toc.style.width)}px)`;
			_content.style.left = `${parseInt(_toc.style.width)}px`;
			_leftDropZone.style.width = `${lastWidth}px`;
			_rightDropZone.style.width = `${lastWidth}px`;
		}
		else if (lastWidth > window.innerWidth - 500 && _toc.classList.contains('dropzone-right')) {
			_toc.style.width = `${parseInt(window.innerWidth - lastWidth)}px`;
			_toc.style.left = `calc(100% - ${parseInt(_toc.style.width)}px)`;
			_content.style.width = `calc(100% - ${parseInt(_toc.style.width)}px)`;
			_content.style.left = `0px`;
			const calculatedWidth = Math.abs(parseInt(window.innerWidth - lastWidth));
			_leftDropZone.style.width = `${calculatedWidth}px`;
			_rightDropZone.style.width = `${calculatedWidth}px`;
		}
		if (parseInt(window.getComputedStyle(_toc).width.replace('px')) < 250) {
			console.log(``);
			if (!_toc.classList.contains('limit')) _toc.classList.add('limit');
		}
		else _toc.classList.remove('limit');
		window.localStorage.setItem('tocSize', _toc.style.width.replace('px', ''));
	}

	// ? Clicking on an image enlargens it
	(function imageEnlargener() {
		Array.from(document.querySelectorAll('img')).forEach((image) => {
			image.addEventListener('click', (e) => {
				_overlay.style.display = 'block';
				const clonedImage = image.cloneNode(true);
				clonedImage.classList.add('swoosh');
				_overlay.appendChild(clonedImage);
			});
		});
	})();

	// ? Switch the block containers on arrows
	(function switchBlock() {
		document.addEventListener('keydown', (e) => {
			if (_overlay.style.display === 'block') {
				if (e.keyCode == 37) {
					const prevItem =
						blockContainerChild == 0
							? (blockContainerChild = totalBlockContainerChild - 1)
							: --blockContainerChild;
					const textBlock = Array.from(document.querySelectorAll('.block-container .text-block'))[prevItem];
					appendToOverlay(textBlock);
				}
				else if (e.keyCode == 39) {
					const nextItem =
						blockContainerChild == totalBlockContainerChild - 1
							? (blockContainerChild = 0)
							: ++blockContainerChild;
					const textBlock = Array.from(document.querySelectorAll('.block-container .text-block'))[nextItem];
					appendToOverlay(textBlock);
				}
			}
			else {
				const topPos = _content.scrollTop;
				if (e.shiftKey) {
					if (e.keyCode == 38) {
						if (e.ctrlKey && e.altKey)
							document.getElementById('top').scrollIntoView({
								behavior : 'smooth'
							});
						else if (e.ctrlKey) entries = findHeaders(allHeadingPos, 'up', topPos, '2');
						else entries = findHeaders(allHeadingPos, 'up', topPos);
					}
					else if (e.keyCode == 40) {
						if (e.ctrlKey && e.altKey)
							document.getElementById('bottom').scrollIntoView({
								behavior : 'smooth'
							});
						else if (e.ctrlKey) entries = findHeaders(allHeadingPos, 'down', topPos, '2');
						else entries = findHeaders(allHeadingPos, 'down', topPos);
					}
				}
			}
		});
	})();

	function appendToOverlay(textBlock) {
		_overlay.removeChild(_overlay.firstElementChild);
		const clonedtextBlock = textBlock.cloneNode(true);
		_overlay.appendChild(clonedtextBlock);
	}

	(function blockEnlarger() {
		Array.from(document.querySelectorAll('.block-container .text-block')).forEach((textBlock, index) => {
			textBlock.addEventListener('click', (e) => {
				blockContainerChild = index;
				_overlay.style.display = 'block';
				const clonedtextBlock = textBlock.cloneNode(true);
				_overlay.appendChild(clonedtextBlock);
			});
		});
	})();
	(function toggleTOCLinks() {
		_expandTOCIcon.addEventListener('click', (e) => {
			Array.from(document.querySelectorAll('.icon--toggle')).forEach((toggleIcon) => {
				if (toggleIcon.classList.contains('link--hidden')) {
					simulateClick(toggleIcon);
				}
			});
		});

		_collapseTOCIcon.addEventListener('click', (e) => {
			Array.from(document.querySelectorAll('.icon--toggle')).forEach((toggleIcon) => {
				if (!toggleIcon.classList.contains('link--hidden')) {
					simulateClick(toggleIcon);
				}
			});
		});
	})();
	let previousHighlight = '';
	let timer = null;
	(function highlightTOC() {
		_content.addEventListener('scroll', (e) => {
			const entries = Object.entries(allHeadingPos);
			const area = 50;
			if (timer !== null) {
				clearTimeout(timer);
			}
			timer = setTimeout(function() {
				const target = document.getElementById(previousHighlight + '_container');
				if (target)
					target.scrollIntoView({
						behavior : 'smooth'
					});
			}, 150);
			for (let [ id, [ pos, level ] ] of entries) {
				if (Math.abs(pos - e.target.scrollTop) < area && previousHighlight !== id) {
					previousHighlight = id;
					const prev = document.querySelectorAll('.current-link');
					if (prev && prev.length !== 0) {
						if (prev[0]) prev[0].classList.remove('current-link');
						if (prev[1]) prev[1].classList.remove('current-link');
					}
					document.getElementById(id).classList.add('current-link');
					if (document.querySelector(`span[href="${id}"]`))
						document.querySelector(`span[href="${id}"]`).parentElement.classList.add('current-link');
					window.localStorage.setItem('last-link', `#${id}`);
					break;
				}
			}
		});
	})();

	(function addShortcuts() {
		document.addEventListener('keypress', (e) => {
			if (e.shiftKey) {
				if (e.code === 'KeyT') simulateClick(document.getElementById('theme-icon-container'));
				else if (e.code === 'KeyS') simulateClick(document.getElementById('slider-icon'));
				else if (e.code === 'KeyA') simulateClick(_expandTOCIcon);
				else if (e.code === 'KeyH') simulateClick(_collapseTOCIcon);
				else if (e.code === 'KeyC') simulateClick(_codeDisplayIcon);
			}
		});
	})();

	(function toggleCodeDisplay() {
		_codeDisplayIcon.addEventListener('click', (e) => {
			const isRow = _codeDisplayIcon.classList.contains('row-view');
			if (isRow) {
				_codeDisplayIcon.classList.add('column-view');
				_codeDisplayIcon.classList.remove('row-view');
			}
			else {
				_codeDisplayIcon.classList.add('row-view');
				_codeDisplayIcon.classList.remove('column-view');
			}
			changeCodeDisplay(isRow ? 'R' : 'C');
			window.localStorage.setItem('codeDisplay', isRow ? 'R' : 'C');
		});
	})();

	function changeCodeDisplay(value) {
		Array.from(document.querySelectorAll('.code-block')).forEach((codeBlock) => {
			codeBlock.style.flexDirection = value === 'C' ? 'row' : 'column';
		});
	}

	(function addCopyIcon() {
		Array.from(document.querySelectorAll('pre[class*="language"]')).forEach((codeBlock) => {
			createCopyIcon(codeBlock);
		});

		function createCopyIcon(parent) {
			const copy_icon = document.createElement('div');
			copy_icon.classList.add('icon--copy');
			copy_icon.innerText = '📄';
			copy_icon.addEventListener('click', () => {
				copyToClipboard(parent.querySelector('code').textContent);
				copy_icon.textContent = 'copied';
				copy_icon.style.left = 'calc(100% - 65px)';
				setTimeout(() => {
					copy_icon.textContent = '📄';
					copy_icon.style.left = 'calc(100% - 30px)';
				}, 1000);
			});
			parent.appendChild(copy_icon);
		}
	})();

	(function smoothScroll() {
		Array.from(document.querySelectorAll('.toc--content')).forEach((link) => {
			link.addEventListener('click', (e) => {
				const _link = link.getAttribute('href');
				document.getElementById(_link).scrollIntoView({
					behavior : 'smooth'
				});
				window.localStorage.setItem('last-link', '#' + _link);
				window.localStorage.setItem('last-file', window.location.pathname);
			});
		});
	})();

	// ? Change from dark to light theme
	(function changeTheme() {
		document.querySelector('#theme-icon-container').addEventListener('click', () => {
			const body = document.querySelector('body#preview');
			if (body.classList.contains('dark')) {
				themeToggler('dark', 'light');
				window.localStorage.setItem('theme', 'light');
			}
			else if (body.classList.contains('light')) {
				themeToggler('light', 'dark');
				window.localStorage.setItem('theme', 'dark');
			}
		});
	})();

	(function scrollIntoViewOutput() {
		const all_outputs = Array.from(document.querySelectorAll('.output-line'));
		all_outputs.forEach((all_output) => {
			all_output.addEventListener('click', (e) => {
				const target = e.target.parentElement.parentElement.previousElementSibling.querySelector(
					`div[data-range='${e.target.textContent}']`
				);
				target.classList.add('highlight');
				// target.scrollIntoView({
				// 	behavior : 'smooth'
				// });
				setTimeout(() => {
					target.classList.remove('highlight');
				}, 1000);
			});
		});
	})();

	(function collapseLinks() {
		Array.from(document.querySelectorAll('.icon--toggle')).forEach((icon) => {
			icon.addEventListener('click', (e) => {
				icon.classList.toggle('link--hidden');
				icon.parentElement.nextElementSibling.classList.toggle('hidden');
			});
		});
	})();

	(function addLineHighlight() {
		Array.from(
			document.querySelectorAll('.call-line-number,.input-line-number,.error-line-number')
		).forEach((line_highlight) => {
			const line_number = line_highlight.textContent;
			const code = line_highlight.parentElement.parentElement.previousElementSibling.querySelectorAll(
				`div[data-range='${line_number}']`
			);
			if (code.length > 1) {
				code[0].style.left = '100%';
				code[0].style.width = '25%';
				code[0].style.transform = 'translateX(-100%)';
			}
			code[0].classList.add(`code-${line_highlight.classList[0]}`);
		});
		Array.from(
			document.querySelectorAll('.highlight--low,.highlight--medium,.highlight--high')
		).forEach((line_highlight) => {
			const line_number = line_highlight.textContent;
			const highlight_lines = line_highlight.parentElement.parentElement.parentElement.previousElementSibling.firstElementChild.querySelectorAll(
				`div[data-range='${line_number}']`
			);
			const _class = line_highlight.classList[0].split('--');
			const check_class = `${_class[0]}-line--${_class[1]}`;
			for (let i = 0; i < highlight_lines.length; i++)
				if (!highlight_lines[i].className.includes('-line-number')) {
					highlight_lines[i].classList.add(check_class);
					break;
				}
		});
	})();

	// ? only show code in _toc

	[ _searchIgnoreCap, _tocCodeSearch, _tocToggleCustom ].forEach((button) => {
		button.addEventListener('click', (e) => {
			button.classList.toggle('activated');
			const status = button.classList.contains('activated');
			window.localStorage.setItem(button.id, status);
			searchButtonHandler(button.id, status);
		});
	});

	function searchButtonHandler(button, status) {
		if (status !== '' && status !== null) {
			Object.entries(allTOCElems).forEach(([ id, textContent ]) => {
				if (button === 'tocCodeSearch' && status.toString() === 'true' && !textContent.includes('❰ ❱'))
					document.getElementById(id).style.display = 'none';
				else if (button === 'tocToggleCustom' && status.toString() === 'true' && !textContent.includes('➥'))
					document.getElementById(id).style.display = 'none';
				else document.getElementById(id).style.display = 'initial';
			});
		}
	}

	(function respositionLineHighlights() {
		Array.from(document.querySelectorAll('.line-highlight')).forEach((line_highlight) => {
			line_highlight.parentElement
				.querySelector('code')
				.appendChild(line_highlight.parentElement.removeChild(line_highlight));
		});
	})();
	// : Refactor and merge with the output block highlight
	(function highlightLineHighlights() {
		Array.from(
			document.querySelectorAll('.highlight--low,.highlight--medium,.highlight--high')
		).forEach((line_highlight) => {
			line_highlight.addEventListener('click', () => {
				const line_number = line_highlight.textContent;
				const highlight_line = line_highlight.parentElement.parentElement.parentElement.previousElementSibling.firstElementChild.querySelector(
					`div[data-range='${line_number}']`
				);
				const priority = highlight_line.classList[1].replace('highlight--', '');
				highlight_line.classList.add(`${priority}--highlight`);
				// highlight_line.scrollIntoView({
				// 	behavior : 'smooth'
				// });
				setTimeout(() => {
					highlight_line.classList.remove(`${priority}--highlight`);
				}, 1000);
			});
		});
	})();
};

function simulateClick(elem) {
	let evt = new MouseEvent('click', {
		bubbles    : true,
		cancelable : true,
		view       : window
	});
	elem.dispatchEvent(evt);
}

const copyToClipboard = (str) => {
	const el = document.createElement('textarea'); // Create a <textarea> element
	el.value = str; // Set its value to the string that you want copied
	el.setAttribute('readonly', ''); // Make it readonly to be tamper-proof
	el.style.position = 'absolute';
	el.style.left = '-9999px'; // Move outside the screen to make it invisible
	document.body.appendChild(el); // Append the <textarea> element to the HTML document
	const selected =
		document.getSelection().rangeCount > 0 // Check if there is any content selected previously
			? document.getSelection().getRangeAt(0) // Store selection if found
			: false; // Mark as false to know no selection existed before
	el.select(); // Select the <textarea> content
	document.execCommand('copy'); // Copy - only works as a result of a user action (e.g. click events)
	document.body.removeChild(el); // Remove the <textarea> element
	if (selected) {
		// If a selection existed before copying
		document.getSelection().removeAllRanges(); // Unselect everything on the HTML document
		document.getSelection().addRange(selected); // Restore the original selection
	}
};

function themeToggler(removeTheme, addTheme) {
	const darkIcon = `<svg xmlns="http://www.w3.org/2000/svg" id="theme-icon" class="icon" viewBox="0 0 184 184"><defs><style>.cls-1{fill:#32578e;}.cls-2{fill:#0f315b;}</style></defs><title>Asset 1</title><g data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><circle class="cls-1" cx="92" cy="92" r="92"/><circle class="cls-2" cx="104.4" cy="33.8" r="12.4"/><circle class="cls-2" cx="42.2" cy="38.1" r="7.5"/><circle class="cls-2" cx="110.1" cy="161.5" r="5.7"/><circle class="cls-2" cx="49.7" cy="81.7" r="5.7"/><circle class="cls-2" cx="49.7" cy="125.6" r="5.7"/><circle class="cls-2" cx="70.6" cy="64" r="7.5"/><circle class="cls-2" cx="22.5" cy="81.7" r="9.9"/><circle class="cls-2" cx="156.6" cy="106.5" r="9.9"/><circle class="cls-2" cx="46.3" cy="145.8" r="9.9"/></g></g></svg>`;
	const lightIcon = `<svg xmlns="http://www.w3.org/2000/svg" id="theme-icon" class="icon" viewBox="0 0 291.18 286.8"><defs><style>.cls-1{fill:#ffe817;}.cls-2{fill:#f7bc00;}</style></defs><title>Asset 2</title><g data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M289.23,139.85l-24.6-14.3a4.05,4.05,0,0,1-1.1-6.1l18.1-21.8a4,4,0,0,0-2.4-6.6L251.33,86a4,4,0,0,1-3.1-5.4l9.6-26.7a4.09,4.09,0,0,0-4.5-5.4l-28,4.8a4.12,4.12,0,0,1-4.8-4l-.1-28.4a4.06,4.06,0,0,0-6.1-3.5l-24.7,14a4.2,4.2,0,0,1-5.9-2.1l-9.8-26.6a4,4,0,0,0-6.9-1.2l-18.4,21.6a4.08,4.08,0,0,1-6.2,0L124,1.45a4,4,0,0,0-6.9,1.2l-9.8,26.6a4.07,4.07,0,0,1-5.9,2.1l-24.6-14.1a4.09,4.09,0,0,0-6.1,3.5l-.1,28.4a4.12,4.12,0,0,1-4.8,4l-28-4.8a4.06,4.06,0,0,0-4.5,5.4l9.6,26.7a4,4,0,0,1-3.1,5.4L11.93,91a4.05,4.05,0,0,0-2.4,6.6l18.09,21.8a4,4,0,0,1-1.09,6.1L2,139.75a4,4,0,0,0,0,7l24.4,14.5a4.05,4.05,0,0,1,1.1,6.1l-18.1,21.9a4,4,0,0,0,2.4,6.6l27.9,5.1a4,4,0,0,1,3.1,5.4l-9.6,26.7a4.09,4.09,0,0,0,4.5,5.4l28-4.8a4.12,4.12,0,0,1,4.8,4l.1,28.4a4.06,4.06,0,0,0,6.1,3.5l24.7-14.1a4.2,4.2,0,0,1,5.9,2.1l9.8,26.6a4,4,0,0,0,6.9,1.2l18.4-21.6a4.08,4.08,0,0,1,6.2,0l18.4,21.6a4,4,0,0,0,6.9-1.2l9.8-26.6a4.07,4.07,0,0,1,5.9-2.1l24.7,14.1a4.09,4.09,0,0,0,6.1-3.5l.1-28.4a4.12,4.12,0,0,1,4.8-4l28,4.8a4.06,4.06,0,0,0,4.5-5.4l-9.61-26.7a4.06,4.06,0,0,1,3.11-5.4l27.89-5.1a4.05,4.05,0,0,0,2.4-6.6l-18-21.9a4,4,0,0,1,1.1-6.1l24.5-14.3A4.21,4.21,0,0,0,289.23,139.85Zm-143.7,109.5a105.9,105.9,0,1,1,105.9-105.9A105.88,105.88,0,0,1,145.53,249.35Z"/><circle class="cls-2" cx="145.53" cy="143.45" r="92"/></g></g></svg>`;
	const themeIcon = document.getElementById('theme-icon');
	const themeIconContainer = document.getElementById('theme-icon-container');
	document.body.classList.remove(removeTheme);
	document.body.classList.add(addTheme);
	themeIconContainer.removeChild(themeIcon);
	if (removeTheme === 'light') themeIconContainer.appendChild(createElementFromHTML(darkIcon));
	else if (removeTheme === 'dark') themeIconContainer.appendChild(createElementFromHTML(lightIcon));
}

function createElementFromHTML(htmlString) {
	var div = document.createElement('div');
	div.innerHTML = htmlString.trim();
	return div.firstElementChild;
}

function findHeaders(allHeaders, move, topPos, specificLevel) {
	let entries = [];
	if (move === 'down') {
		if (!specificLevel) entries = Object.entries(allHeaders).find(([ id, [ pos, level ] ]) => pos >= topPos + 150);
		else
			entries = Object.entries(allHeaders).find(
				([ id, [ pos, level ] ]) => pos >= topPos + 150 && level == specificLevel
			);
	}
	else if (move === 'up') {
		if (!specificLevel)
			entries = Object.entries(allHeaders)
				.filter(([ id, [ pos, level ] ]) => pos <= topPos)
				.reverse()
				.find(([ id, [ pos, level ] ]) => pos <= topPos - 150);
		else
			entries = Object.entries(allHeaders)
				.filter(([ id, [ pos, level ] ]) => pos <= topPos)
				.reverse()
				.find(([ id, [ pos, level ] ]) => pos <= topPos - 150 && level === specificLevel);
	}
	const tocElem = document.querySelector(`span[href="${entries ? entries[0] : ''}"]`);
	if (tocElem) simulateClick(tocElem);
}
