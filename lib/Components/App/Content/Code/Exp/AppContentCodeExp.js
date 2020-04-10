class AppContentCodeExp {
	static create(_code) {
		return htmlElementCreation({
			classes      : [ 'explanation-group', 'app_content_code_explanation_group' ],
			insertBefore : _code
		});
	}
}

module.exports = AppContentCodeExp;
