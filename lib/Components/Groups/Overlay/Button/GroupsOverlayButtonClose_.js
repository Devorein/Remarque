class GroupsOverlayButtonClose {
	static click() {
		document.getElementById('groups_overlay_button_close').addEventListener('click', e => {
			_groups_overlay.style.display = 'none';
		});
	}

	static register() {
		this.click();
	}
}

module.exports = GroupsOverlayButtonClose;
