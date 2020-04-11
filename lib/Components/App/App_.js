const AppContent = require('./Content/AppContent_');
const AppToc = require('./Toc/AppToc_');
const AppButtons = require('./Buttons/AppButtons_');
const AppClock = require('./Clock/AppClock_');
const AppDropzone = require('./Dropzone/AppDropzone_');
const AppProgress = require('./Progress/AppProgress_');
const AppClockTransfer = require('./Clock/AppClockTransfer_');

class App {
	static scroll() {
		let timer = null;
		Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6')).forEach(_header => {
			const observer = new IntersectionObserver(
				entries => {
					removeClass('.current-link', 'current-link');
					entries[0].target.classList.add('current-link');
					SETTINGS['__lastLink'] = entries[0].target.id;

					if (timer !== null) clearTimeout(timer);

					timer = setTimeout(function() {
						const _target = document.querySelector(`span[href="${entries[0].target.id}"]`);
						if (_target) {
							const _parent = _target.parentElement;
							_parent.classList.add('current-link');
							for (let i = 0; i < _app_toc_content_items.length; i++) {
								if (_app_toc_content_items[i].classList.contains('current-link')) {
									window.selected_index = i;
									break;
								}
							}
							if (SETTINGS['__currentPage'] === 'app')
								_parent.scrollIntoView({
									behavior : 'smooth'
								});
						}
					}, 500);
				},
				{ threshold: [ 1 ], root: _app_content, rootMargin: '0px 0px -650px 0px' }
			);
			observer.observe(_header);
		});
	}

	static tocSizeChangedH() {
		const app_toc__position = SETTINGS['app_toc__position'];
		const app_toc__size = parseInt(SETTINGS['app_toc__size']) + 30;
		_app_toc.parentElement.style.width = `${app_toc__size - 30}px`;
		if (app_toc__position === 'left') _app_content.style.left = `${app_toc__size}px`;
		else if (app_toc__position === 'right') _app_content.style.left = '0px';
		_app_content.style.width = `calc(100% - ${app_toc__size}px)`;
		_app_progress.style.width = _app_content.style.width;
		_app_progress.style.left = `${parseInt(_app_content.style.left.replace('px', '')) + 10}px`;
	}

	static tocSizeChanged() {
		_app.addEventListener('tocSizeChanged', e => {
			this.tocSizeChangedH();
			AppClockTransfer.clickH();
		});
	}

	static register() {
		[ AppToc, AppButtons, AppContent, AppClock, AppDropzone, AppProgress ].forEach(Component => {
			Component.register();
		});
		App.tocSizeChanged();
		App.scroll();
	}
}

module.exports = App;
