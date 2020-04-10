class GroupsOverlayButtonPrev {
	static click() {
		_groups_overlay_button_prev.addEventListener('click', e => {
			if (window.lastBlockSelected === 0)
				window.lastBlockSelected = _groups_content_item_content_items.length - 1;
			else --window.lastBlockSelected;
			_groups_overlay_content.textContent =
				_groups_content_item_content_items[window.lastBlockSelected].textContent;
			_groups_overlay_counter.dispatchEvent(new CustomEvent('overlayItemChanged'));
		});
	}
	static register() {
		this.click();
	}
}

module.exports = GroupsOverlayButtonPrev;
