class AppClock {
	create() {
		htmlElementCreation({
			id         : 'app_clock',
			children   : [
				htmlElementCreation({
					id       : 'app_clock_playpause',
					children : [ createElementFromHTML(BUTTONS['play'])[0], createElementFromHTML(BUTTONS['pause'])[0] ]
				}),
				htmlElementCreation({
					id       : 'app_clock_restart',
					children : [ ...createElementFromHTML(BUTTONS['restart']) ]
				}),
				htmlElementCreation({
					id       : 'app_clock_transfer',
					children : [ ...createElementFromHTML(BUTTONS['transfer']) ]
				}),
				htmlElementCreation({
					id : 'app_clock_timer'
				})
			],
			parentElem : _app
		});
	}
}

module.exports = AppClock;
