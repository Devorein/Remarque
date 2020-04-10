class AppTocSearchStatus {
	create() {
		htmlElementCreation({
			id         : 'app_toc_search_status',
			children   : [
				htmlElementCreation({
					id          : 'app_toc_search_status_selected',
					textContent : 0
				}),
				htmlElementCreation({
					id          : 'app_toc_search_status_hidden',
					textContent : 0
				}),
				htmlElementCreation({
					id          : 'app_toc_search_status_total',
					textContent : 0
				})
			],
			parentElem : _app_toc_search
		});
	}
}
module.exports = AppTocSearchStatus;
