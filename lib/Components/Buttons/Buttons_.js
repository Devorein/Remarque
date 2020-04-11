const ButtonTheme = require('./ButtonTheme_');

class Buttons {
	static togglePageH(prevPage) {
		const { __currentPage: currentPage } = SETTINGS;
		const _targetPage = window[`_${SETTINGS['__currentPage']}`];
		const _pages = [ _app, _settings, _groups ];
		const _targetButton = window[`_button_${SETTINGS['__currentPage']}`];
		const _pagebuttons = [ _button_groups, _button_app, _button_settings ];
		_pagebuttons.forEach((_pagebutton, index) => {
			_pages[index].style.opacity = '0';
			_pagebutton.classList.remove('activated');
		});
		if (currentPage === 'app' && prevPage === 'groups') _groups.style.left = '-100%';
		else if (currentPage === 'settings' && prevPage === 'app') _app.style.left = '-100%';
		else if (currentPage === 'groups' && prevPage === 'settings') _settings.style.left = '-100%';
		else if (currentPage === 'settings' && prevPage === 'groups') _groups.style.left = '100%';
		else if (currentPage === 'groups' && prevPage === 'app') _app.style.left = '100%';
		else if (currentPage === 'app' && prevPage === 'settings') _settings.style.left = '100%';
		_targetPage.style.left = '0%';
		_targetPage.style.opacity = '1';
		_targetButton.classList.add('activated');
	}
	static togglePage() {
		[ 'app', 'groups', 'settings' ].forEach(page => {
			const _target = window[`_button_${page}`];
			_target.addEventListener('click', e => {
				const prevPage = SETTINGS['__currentPage'];
				SETTINGS['__currentPage'] = page;
				this.togglePageH(prevPage);
			});
		});
	}

	static register() {
		this.togglePage();
		[ ButtonTheme ].forEach(C => C.register());
	}
}

module.exports = Buttons;
