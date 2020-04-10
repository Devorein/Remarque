class AppProgress {
	create() {
		return htmlElementCreation({
			id         : 'app_progress',
			children   : [
				htmlElementCreation({
					id : 'app_progress_bar'
				}),
				htmlElementCreation({
					id : 'app_progress_counter'
				})
			],
			parentElem : _app
		});
	}
}

module.exports = AppProgress;
