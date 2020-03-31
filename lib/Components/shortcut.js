const { simulateClick } = require('./utility');

// ✅
function addShortcuts() {
	keyPressShortcuts();
	keyDownShortcuts();
}

function keyPressShortcuts() {
	const _codeDisplayIcon = document.getElementById('codeDisplayIcon');
	document.addEventListener('keypress', e => {
		if (e.shiftKey) {
			if (e.code === 'KeyT') simulateClick(_themeIconContainer);
			else if (e.code === 'KeyS') simulateClick(_tocToggleIcon);
			else if (e.code === 'KeyA') simulateClick(_expandTOCIcon);
			else if (e.code === 'KeyH') simulateClick(_collapseTOCIcon);
			else if (e.code === 'KeyC') simulateClick(_codeDisplayIcon);
		}
	});
}

// ? Switch the block containers on arrows keys
function keyDownShortcuts() {
	document.addEventListener('keydown', e => {
		if (_overlay.style.display === 'block') {
			const _overlayNextIcon = document.getElementById('overlayNextIcon');
			const _overlayPrevIcon = document.getElementById('overlayPrevIcon');
			const _overlayCancelIcon = document.getElementById('overlayCancelIcon');
			if (e.code === 'ArrowLeft') simulateClick(_overlayPrevIcon);
			else if (e.code == 'ArrowRight') simulateClick(_overlayNextIcon);
			else if (e.code === 'Escape') simulateClick(_overlayCancelIcon);
		}
		else {
			if (e.shiftKey) {
				if (e.code === 'ArrowUp') {
					if (e.ctrlKey && e.altKey) simulateClick(_pageExtremeTopIcon);
					else if (e.ctrlKey) {
						for (let i = window.selected_index - 1; i >= 0; i--)
							if (_toc_items[i].classList.contains('toc--L2-item')) {
								window.selected_index = i;
								break;
							}
						simulateClick(_toc_items[selected_index].querySelector('.toc--content'));
					}
					else {
						window.selected_index = selected_index === 0 ? _toc_items.length - 1 : selected_index - 1;
						simulateClick(_toc_items[selected_index].querySelector('.toc--content'));
					}
				}
				else if (e.code === 'ArrowDown') {
					if (e.ctrlKey && e.altKey) simulateClick(_pageExtremeBottomIcon);
					else if (e.ctrlKey) {
						for (let i = selected_index + 1; i < _toc_items.length; i++)
							if (_toc_items[i].classList.contains('toc--L2-item')) {
								window.selected_index = i;
								break;
							}
						simulateClick(_toc_items[selected_index].querySelector('.toc--content'));
					}
					else {
						window.selected_index = selected_index === _toc_items.length - 1 ? 0 : ++selected_index;
						simulateClick(_toc_items[selected_index].querySelector('.toc--content'));
					}
				}
			}
		}
	});
}

module.exports = {
	addShortcuts
};
