class GroupsOverlayCounter {
	static overlayItemChanged() {
		_groups_overlay_counter.addEventListener('overlayItemChanged', e => {
			_groups_overlay_counter.textContent = `${window.lastBlockSelected +
				1}/${_groups_content_item_content_items.length}`;
		});
	}
	static register() {
		this.overlayItemChanged();
	}
}

module.exports = GroupsOverlayCounter;
