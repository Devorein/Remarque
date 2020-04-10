class AppTocButtonCollapse {
	static click() {
		_app_toc_button_collapse.addEventListener('click', e => {
			Array.from(
				document.querySelectorAll('.toc--L1-item+.child-container .icon--toggle')
			).forEach(_toggleIcon => {
				if (!_toggleIcon.classList.contains('link--hidden')) simulateClick(_toggleIcon);
			});
		});
	}
	static register() {
		AppTocButtonCollapse.click();
	}
}

module.exports = AppTocButtonCollapse;
