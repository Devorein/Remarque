class AppTocContentItemContent {
	static clickH() {
		const { __lastLink } = SETTINGS;
		if (__lastLink !== '') {
			const _target = document.getElementById(__lastLink);
			if (_target)
				_target.scrollIntoView({
					behavior : 'smooth'
				});
		}
	}
	static click() {
		_app_toc_contents.forEach(_link => {
			_link.addEventListener('click', e => {
				SETTINGS['__lastLink'] = _link.getAttribute('href');
				document.getElementById('clickSound').play();
				AppTocContentItemContent.clickH();
			});
		});
	}
	static register() {
		AppTocContentItemContent.click();
	}
}

module.exports = AppTocContentItemContent;
