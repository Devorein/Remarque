class AppTocSearchStatus {
	static tocItemChangedH() {
		const _tocItems = Array.from(_app_toc.querySelectorAll('.app_toc_content_item'));
		const total = _tocItems.length;
		let hidden = 0,
			selected = 0;
		_tocItems.forEach(_tocItem => {
			if (_tocItem.style.display === 'none') hidden++;
			else if (_tocItem.querySelector('.checked')) selected++;
		});
		_app_toc_search_status_hidden.textContent = `${hidden}`;
		_app_toc_search_status_selected.textContent = `${selected}`;
		_app_toc_search_status_total.textContent = total;
	}
	static tocItemChanged() {
		_app_toc_search_status.addEventListener('tocItemsChanged', () => {
			this.tocItemChangedH();
		});
	}
	static register() {
		this.tocItemChanged();
	}
}

module.exports = AppTocSearchStatus;
