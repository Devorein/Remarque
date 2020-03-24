const { simulateClick } = require('./utility');

function addShortcuts() {
	const _codeDisplayIcon = document.getElementById('codeDisplayIcon');
	const _collapseTOCIcon = document.getElementById('collapseTOC');
	const _expandTOCIcon = document.getElementById('expandTOC');

	document.addEventListener('keypress', (e) => {
		if (e.shiftKey) {
			if (e.code === 'KeyT') simulateClick(document.getElementById('theme-icon-container'));
			else if (e.code === 'KeyS') simulateClick(document.getElementById('slider-icon'));
			else if (e.code === 'KeyA') simulateClick(_expandTOCIcon);
			else if (e.code === 'KeyH') simulateClick(_collapseTOCIcon);
			else if (e.code === 'KeyC') simulateClick(_codeDisplayIcon);
		}
	});
}

// ? Switch the block containers on arrows keys
function switchBlock() {
	let blockContainerChild = 0;
	let totalBlockContainerChild = Array.from(document.querySelectorAll('.block-container .text-block')).length;

	document.addEventListener('keydown', (e) => {
		if (_overlay.style.display === 'block') {
			let textBlock = null;
			if (e.keyCode == 37) {
				const prevItem =
					blockContainerChild == 0
						? (blockContainerChild = totalBlockContainerChild - 1)
						: --blockContainerChild;
				textBlock = Array.from(document.querySelectorAll('.block-container .text-block'))[prevItem];
			}
			else if (e.keyCode == 39) {
				const nextItem =
					blockContainerChild == totalBlockContainerChild - 1
						? (blockContainerChild = 0)
						: ++blockContainerChild;
				textBlock = Array.from(document.querySelectorAll('.block-container .text-block'))[nextItem];
			}

			_overlay.removeChild(_overlay.firstElementChild);
			const clonedtextBlock = textBlock.cloneNode(true);
			_overlay.appendChild(clonedtextBlock);
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
}

function findHeaders(allHeaders, move, topPos, specificLevel) {
	let entries = [];
	if (move === 'down') {
		if (!specificLevel) entries = Object.entries(allHeaders).find(([ id, [ pos, level ] ]) => pos >= topPos + 150);
		else
			entries = Object.entries(allHeaders).find(
				([ id, [ pos, level ] ]) => pos >= topPos + 50 && level == specificLevel
			);
	}
	else if (move === 'up') {
		if (!specificLevel)
			entries = Object.entries(allHeaders)
				.filter(([ id, [ pos, level ] ]) => pos <= topPos)
				.reverse()
				.find(([ id, [ pos, level ] ]) => pos <= topPos - 50);
		else
			entries = Object.entries(allHeaders)
				.filter(([ id, [ pos, level ] ]) => pos <= topPos)
				.reverse()
				.find(([ id, [ pos, level ] ]) => pos <= topPos - 50 && level === specificLevel);
	}
	const tocElem = document.querySelector(`span[href="${entries ? entries[0] : ''}"]`);
	if (tocElem) simulateClick(tocElem);
}

module.exports = {
	addShortcuts,
	switchBlock
};
