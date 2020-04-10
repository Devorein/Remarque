const initialSetup = require('./setup');
const addShortcuts = require('./Utils/shortcut');
const App = require('./App/App_');
const Settings = require('./Settings/Settings_');
const Groups = require('./Groups/Groups_');
const Buttons = require('./Buttons/Buttons_');

window.onload = () => {
	initialSetup();
	[ App, Settings, Groups, Buttons ].forEach(Components => {
		Components.register();
	});
	addShortcuts();
};
