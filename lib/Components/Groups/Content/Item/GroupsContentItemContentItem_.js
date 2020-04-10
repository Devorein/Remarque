class GroupsContentItemContentItem {
	static click() {
		Array.from(
			document.querySelectorAll('.groups_content_item_content_item')
		).forEach((_customBlock, index, arr) => {
			_customBlock.addEventListener('click', e => {
				lastBlockSelected = index;
				_groups_overlay.style.display = 'block';
				_groups_overlay_content.textContent = _customBlock.textContent;
				_groups_overlay_counter.dispatchEvent(new CustomEvent('overlayItemChanged'));
			});
		});
	}
	static register() {
		this.click();
	}
}

module.exports = GroupsContentItemContentItem;
