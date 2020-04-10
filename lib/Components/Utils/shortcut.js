// ✅
function addShortcuts() {
	addGlobalShortcuts();
	keyDownShortcuts();
}

function addGlobalShortcuts() {
	document.addEventListener('keypress', e => {
		e.preventDefault();
		console.log(e.code);
		if (e.shiftKey) {
			if (e.code.match(/^Digit[0-9]$/)) {
				const target = parseInt(e.code.replace('Digit', ''));
				const _target = _buttons.children[target - 1];
				if (_target) simulateClick(_target);
			}
		}
		else {
			if (e.code.match(/^Digit[0-9]$/)) {
				const { __currentPage } = SETTINGS;
				const target = parseInt(e.code.replace('Digit', ''));
				let _target = null;
				if (__currentPage === 'app') _target = _app_buttons;
				else if (__currentPage === 'settings') _target = _settings_buttons;
				else if (__currentPage === 'groups') _target = _groups_buttons;
				_target = _target.children[target - 1];
				if (_target) simulateClick(_target);
			}
		}
	});
}

function keyDownShortcuts() {
	document.addEventListener('keyup', e => {
		if (e.code === 'F11') {
			e.preventDefault();
			e.stopPropagation();
			if (!document.fullscreenElement) {
				document.documentElement
					.requestFullscreen()
					.then(e => {
						_app_button_zen.dispatchEvent(new CustomEvent('zenChanged'));
					})
					.catch(err => {
						console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
					});
			}
		}
		if (SETTINGS['__currentPage'] === 'groups' && _groups_overlay.style.display === 'block') {
			if (e.code === 'ArrowLeft') simulateClick(_groups_overlay_button_prev);
			else if (e.code == 'ArrowRight') simulateClick(_groups_overlay_button_next);
			else if (e.code === 'ArrowDown') simulateClick(_groups_overlay_button_prevuniq);
			else if (e.code === 'ArrowUp') simulateClick(_groups_overlay_button_nextuniq);
			else if (e.code === 'Escape') simulateClick(_groups_overlay_button_close);
		}
		else if (SETTINGS['__currentPage'] === 'app') {
			if (e.shiftKey) {
				if (e.code === 'ArrowUp') {
					console.log(`1`);
					if (e.ctrlKey && e.altKey) simulateClick(_app_content_button_top);
					else if (e.ctrlKey) {
						for (let i = window.selected_index - 1; i >= 0; i--)
							if (_app_toc_content_items[i].classList.contains('toc--L2-item')) {
								window.selected_index = i;
								break;
							}
						simulateClick(_app_toc_content_items[selected_index].querySelector('.toc--content'));
					}
					else {
						window.selected_index =
							selected_index === 0 ? _app_toc_content_items.length - 1 : selected_index - 1;
						simulateClick(_app_toc_content_items[selected_index].querySelector('.toc--content'));
					}
				}
				else if (e.code === 'ArrowDown') {
					if (e.ctrlKey && e.altKey) simulateClick(_app_content_button_bottom);
					else if (e.ctrlKey) {
						for (let i = selected_index + 1; i < _app_toc_content_items.length; i++)
							if (_app_toc_content_items[i].classList.contains('toc--L2-item')) {
								window.selected_index = i;
								break;
							}
						simulateClick(_app_toc_content_items[selected_index].querySelector('.toc--content'));
					}
					else {
						window.selected_index =
							selected_index === _app_toc_content_items.length - 1 ? 0 : ++selected_index;
						simulateClick(_app_toc_content_items[selected_index].querySelector('.toc--content'));
					}
				}
			}
		}
	});
}

module.exports = addShortcuts;
