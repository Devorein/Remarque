const AppContent = require('./Content/AppContent');
const AppToc = require('./Toc/AppToc');
const AppButtons = require('./Buttons/AppButtons');
const AppClock = require('./Clock/AppClock');
const AppDropzone = require('./Dropzone/AppDropzone');
const AppProgress = require('./Progress/AppProgress');

class App {
	create() {
		makeConstantProp(
			'_app',
			htmlElementCreation({
				id         : 'app',
				classes    : 'page',
				children   : Array.from(BODY.children).slice(0, BODY.children.length - 3),
				parentElem : BODY
			})
		);
		[ AppToc, AppButtons, AppContent, AppClock, AppDropzone, AppProgress ].forEach(Component => {
			new Component().create();
		});
	}
}

module.exports = App;
