class AppTocContentItemCheck {
	static _checkOnLoad() {
		const _checkmarks = Array.from(document.querySelectorAll('.checkmark'));
		SETTINGS['app_toc__clickedItems'].forEach(index => {
			_checkmarks[index - 1].firstElementChild.style.display = 'initial';
			_checkmarks[index - 1].classList.add('checked');
		});
	}

	static addToSelectedToc(_item) {
		const checked = _item.classList.contains('checked');
		const index = parseInt(_item.parentElement.getAttribute('item-num'));
		if (checked) SETTINGS['app_toc__clickedItems'].push(index);
		else SETTINGS['app_toc__clickedItems'] = SETTINGS['app_toc__clickedItems'].filter(item => item != index);
	}

	static click() {
		Array.from(document.querySelectorAll('.checkmark')).forEach((_checkmark, index) => {
			_checkmark.addEventListener('click', e => {
				if (!e.shiftKey) {
					const checked = _checkmark.classList.toggle('checked');
					if (checked) _checkmark.firstElementChild.style.display = 'initial';
					else _checkmark.firstElementChild.style.display = 'none';
					this.addToSelectedToc(_checkmark);
					this.checkForTOCChildrenSelection(_checkmark);
					this.checkForTOCParentSelection(_checkmark);
				}
				else if (e.shiftKey) {
					const checked = !_checkmark.classList.contains('checked');
					const containsChild = _checkmark.parentElement.nextElementSibling;
					if (containsChild) {
						_checkmark.classList.add('checked');
						this.checkForTOCChildrenSelection(_checkmark);
					}
					for (let i = index; i >= 0; i--) {
						const _checkmark = _app_toc_content_item_checkmarks[i];
						if (checked) {
							const _parent = _checkmark.parentElement.nextElementSibling;
							if (!_parent) {
								_checkmark.classList.add('checked');
								if (!_checkmark.firstElementChild) {
									_checkmark.firstElementChild.style.display = 'initial';
									this.addToSelectedToc(_checkmark);
								}
							}
							else if (
								_parent &&
								_parent.querySelectorAll('.app_toc_content_item').length ===
									_parent.querySelectorAll('.checked').length
							) {
								_checkmark.classList.add('checked');
								if (!_checkmark.firstElementChild) {
									_checkmark.firstElementChild.style.display = 'initial';
									this.addToSelectedToc(_checkmark);
								}
							}
						}
						else if (!checked) {
							const _parent = _checkmark.parentElement.nextElementSibling;
							if (!_parent) {
								_checkmark.classList.remove('checked');
								if (_checkmark.firstElementChild) {
									_checkmark.removeChild(_checkmark.firstElementChild);
									this.addToSelectedToc(_checkmark);
								}
							}
							else if (
								_parent &&
								_parent.querySelectorAll('.app_toc_content_item').length !==
									_parent.querySelectorAll('.checked').length
							) {
								_checkmark.classList.remove('checked');
								if (_checkmark.firstElementChild) {
									_checkmark.removeChild(_checkmark.firstElementChild);
									this.addToSelectedToc(_checkmark);
								}
							}
						}
					}
				}
				_app_toc_search_status.dispatchEvent(new CustomEvent('tocItemsChanged'));
			});
		});
	}

	static checkForTOCParentSelection(_checkmark) {
		let _parent = _checkmark.parentElement.parentElement.parentElement.parentElement;
		while (_parent && !_parent.classList.contains('toc--L1-item-container')) {
			if (_parent) {
				const _parentCheckmark = _parent.firstElementChild.firstElementChild;
				if (
					_parent.querySelectorAll('.app_toc_content_item').length - 1 ===
						_parent.querySelectorAll('.checked').length &&
					!_parentCheckmark.classList.contains('checked')
				) {
					_parentCheckmark.firstElementChild.style.display = 'initial';
					_parentCheckmark.classList.add('checked');
					this.addToSelectedToc(_parentCheckmark);
				}
				else if (
					_parent.querySelectorAll('.checked').length !==
						_parent.querySelectorAll('.app_toc_content_item').length &&
					_parentCheckmark.classList.contains('checked')
				) {
					_parentCheckmark.firstElementChild.style.display = 'none';
					_parentCheckmark.classList.remove('checked');
					this.addToSelectedToc(_parentCheckmark);
				}
			}
			_parent = _parent.parentElement.parentElement;
		}
	}

	static checkForTOCChildrenSelection(_checkmark) {
		const checked = _checkmark.classList.contains('checked');
		const _tocItems = _checkmark.parentElement.parentElement.querySelectorAll('.app_toc_content_item');
		_tocItems.forEach(_tocItem => {
			const _childChechmark = _tocItem.firstElementChild;
			if (checked && !_childChechmark.classList.contains('checked')) {
				_childChechmark.classList.add('checked');
				_childChechmark.firstElementChild.style.display = 'initial';
				this.addToSelectedToc(_childChechmark);
			}
			else if (!checked && _childChechmark.classList.contains('checked')) {
				_childChechmark.classList.remove('checked');
				_childChechmark.firstElementChild.style.display = 'none';
				this.addToSelectedToc(_childChechmark);
			}
		});
	}

	static register() {
		this.click();
	}
}

module.exports = AppTocContentItemCheck;
