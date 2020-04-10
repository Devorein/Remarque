const ButtonTheme = require('./ButtonTheme_');

class Buttons {
	static togglePageH() {
		const _targetPage = window[`_${SETTINGS['__currentPage']}`];
		const _targetButton = window[`_button_${SETTINGS['__currentPage']}`];
		const _pages = Array.from(document.querySelectorAll('.page'));
		const _pagebuttons = [ _button_groups, _button_app, _button_settings ];
		_pages.forEach((_page, index) => {
			_page.style.left = '100%';
			_pagebuttons[index].classList.remove('activated');
		});
		_targetPage.style.left = '0%';
		_targetButton.classList.add('activated');
	}
	static togglePage() {
		[ 'app', 'groups', 'settings' ].forEach(page => {
			const _target = window[`_button_${page}`];
			_target.addEventListener('click', e => {
				SETTINGS['__currentPage'] = page;
				this.togglePageH();
			});
		});
	}

	static register() {
		this.togglePage();
		[ ButtonTheme ].forEach(C => C.register());
	}
}

module.exports = Buttons;
