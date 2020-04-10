class AppTocSearchInput {
	create() {
		htmlElementCreation({
			type       : 'input',
			classes    : [ 'toc--input', 'icon' ],
			id         : 'app_toc_search_input',
			attributes : { type: 'text', autocomplete: 'off' },
			parentElem : _app_toc_search
		});
	}
}

module.exports = AppTocSearchInput;
