class AppContentList {
	static parse(element) {
		if (element.previousElementSibling.classList.contains('header--explanation'))
			element.classList.add('explanation-block');
	}
}

module.exports = AppContentList;
