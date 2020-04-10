class GroupsOverlayButtonNextunique {
	static click() {
		_groups_overlay_button_next.addEventListener('click', e => {
			if (window.lastBlockSelected === _groups_content_item_content_items.length - 1)
				window.lastBlockSelected = 0;
			else ++window.lastBlockSelected;
			_groups_overlay_content.textContent =
				_groups_content_item_content_items[window.lastBlockSelected].textContent;
			_groups_overlay_counter.dispatchEvent(new CustomEvent('overlayItemChanged'));
		});
	}
	static register() {
		this.click();
	}
}

module.exports = GroupsOverlayButtonNextunique;
