class GroupsOverlayButtonNextunique {
	static click() {
		_groups_overlay_button_nextuniq.addEventListener('click', e => {
			const current_start_str = _groups_content_item_content_items[lastBlockSelected].textContent.codePointAt(0);

			let i = lastBlockSelected === _groups_content_item_content_items.length - 1 ? 0 : lastBlockSelected + 1;
			let target_index = 0;

			for (; i < _groups_content_item_content_items.length; ) {
				const new_start_str = _groups_content_item_content_items[i].textContent.codePointAt(0);
				if (current_start_str !== new_start_str) {
					target_index = i;
					break;
				}
				i = i === _groups_content_item_content_items.length - 1 ? 0 : i + 1;
			}
			window.lastBlockSelected = target_index;
			_groups_overlay_content.textContent = _groups_content_item_content_items[lastBlockSelected].textContent;
			_groups_overlay_counter.dispatchEvent(new CustomEvent('overlayItemChanged'));
		});
	}
	static register() {
		this.click();
	}
}

module.exports = GroupsOverlayButtonNextunique;
