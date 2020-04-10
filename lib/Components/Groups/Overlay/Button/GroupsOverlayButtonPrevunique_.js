class GroupsOverlayButtonPrevunique {
	static click() {
		_groups_overlay_button_prevuniq.addEventListener('click', e => {
			const current_start_str = _groups_content_item_content_items[lastBlockSelected].textContent.codePointAt(0);

			let i = lastBlockSelected === 0 ? _groups_content_item_content_items.length - 1 : lastBlockSelected - 1;
			let target_index = 0;

			for (; i >= 0; ) {
				const new_start_str = _groups_content_item_content_items[i].textContent.codePointAt(0);
				if (current_start_str !== new_start_str) {
					target_index = i;
					break;
				}
				i = i === 0 ? _groups_content_item_content_items.length - 1 : i - 1;
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

module.exports = GroupsOverlayButtonPrevunique;
