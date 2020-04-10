class AppContentCodeOutput {
	static create(_code) {
		return htmlElementCreation({
			classes      : [ 'output-group', 'app_content_code_output_group' ],
			insertBefore : _code
		});
	}
}

module.exports = AppContentCodeOutput;
