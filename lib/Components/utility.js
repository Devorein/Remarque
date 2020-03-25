const _clock = document.getElementById('clock');

function download(filename, text) {
	const element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}

function copyToClipboard(str) {
	const el = document.createElement('textarea');
	el.value = str;
	el.setAttribute('readonly', '');
	el.style.position = 'absolute';
	el.style.left = '-9999px';
	document.body.appendChild(el);
	const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);
	if (selected) {
		document.getSelection().removeAllRanges();
		document.getSelection().addRange(selected);
	}
}

function simulateClick(elem) {
	let evt = new MouseEvent('click', {
		bubbles    : true,
		cancelable : true,
		view       : window
	});
	elem.dispatchEvent(evt);
}

function displayTime() {
	++total_seconds;
	const hours = Math.floor(total_seconds / 3600);
	const secs_left = total_seconds % 3600;
	const minutes = Math.floor(secs_left / 60);
	const secs = secs_left % 60;
	_clock.textContent = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${secs < 10
		? '0' + secs
		: secs}`;
}

function calculatePageProgress() {
	const _content = document.getElementById('content');
	const _progressCounter = document.getElementById('progressCounter');
	const _progressBar = document.getElementById('progressBar');
	const _progress = document.getElementById('progress');

	const percent = _content.scrollTop / (_content.scrollHeight - document.documentElement.clientHeight) * 100;
	let res = percent.toFixed(2);
	res = res < 100 ? res : 100;
	_progressCounter.textContent = `${res}%`;
	_progress.style.top = `${_content.scrollTop}px`;
	_progressBar.style.width = `${res}%`;
	const green = res / 100 * 255;
	const red = 255 - green;
	_progressBar.style.backgroundColor = `rgba(${red},${green},0,.75)`;
	_clock.style.top = `${parseInt(_content.scrollTop) + parseInt(document.documentElement.clientHeight) - 30}px`;
}

function createElementFromHTML(htmlString) {
	var div = document.createElement('div');
	div.innerHTML = htmlString.trim();
	return div.firstElementChild;
}

function themeToggler(removeTheme, addTheme) {
	const darkIcon = `<svg xmlns="http://www.w3.org/2000/svg" id="theme-icon" class="icon" viewBox="0 0 184 184"><defs><style>.cls-1{fill:#32578e;}.cls-2{fill:#0f315b;}</style></defs><title>Asset 1</title><g data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><circle class="cls-1" cx="92" cy="92" r="92"/><circle class="cls-2" cx="104.4" cy="33.8" r="12.4"/><circle class="cls-2" cx="42.2" cy="38.1" r="7.5"/><circle class="cls-2" cx="110.1" cy="161.5" r="5.7"/><circle class="cls-2" cx="49.7" cy="81.7" r="5.7"/><circle class="cls-2" cx="49.7" cy="125.6" r="5.7"/><circle class="cls-2" cx="70.6" cy="64" r="7.5"/><circle class="cls-2" cx="22.5" cy="81.7" r="9.9"/><circle class="cls-2" cx="156.6" cy="106.5" r="9.9"/><circle class="cls-2" cx="46.3" cy="145.8" r="9.9"/></g></g></svg>`;
	const lightIcon = `<svg xmlns="http://www.w3.org/2000/svg" id="theme-icon" class="icon" viewBox="0 0 291.18 286.8"><defs><style>.cls-1{fill:#ffe817;}.cls-2{fill:#f7bc00;}</style></defs><title>Asset 2</title><g data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M289.23,139.85l-24.6-14.3a4.05,4.05,0,0,1-1.1-6.1l18.1-21.8a4,4,0,0,0-2.4-6.6L251.33,86a4,4,0,0,1-3.1-5.4l9.6-26.7a4.09,4.09,0,0,0-4.5-5.4l-28,4.8a4.12,4.12,0,0,1-4.8-4l-.1-28.4a4.06,4.06,0,0,0-6.1-3.5l-24.7,14a4.2,4.2,0,0,1-5.9-2.1l-9.8-26.6a4,4,0,0,0-6.9-1.2l-18.4,21.6a4.08,4.08,0,0,1-6.2,0L124,1.45a4,4,0,0,0-6.9,1.2l-9.8,26.6a4.07,4.07,0,0,1-5.9,2.1l-24.6-14.1a4.09,4.09,0,0,0-6.1,3.5l-.1,28.4a4.12,4.12,0,0,1-4.8,4l-28-4.8a4.06,4.06,0,0,0-4.5,5.4l9.6,26.7a4,4,0,0,1-3.1,5.4L11.93,91a4.05,4.05,0,0,0-2.4,6.6l18.09,21.8a4,4,0,0,1-1.09,6.1L2,139.75a4,4,0,0,0,0,7l24.4,14.5a4.05,4.05,0,0,1,1.1,6.1l-18.1,21.9a4,4,0,0,0,2.4,6.6l27.9,5.1a4,4,0,0,1,3.1,5.4l-9.6,26.7a4.09,4.09,0,0,0,4.5,5.4l28-4.8a4.12,4.12,0,0,1,4.8,4l.1,28.4a4.06,4.06,0,0,0,6.1,3.5l24.7-14.1a4.2,4.2,0,0,1,5.9,2.1l9.8,26.6a4,4,0,0,0,6.9,1.2l18.4-21.6a4.08,4.08,0,0,1,6.2,0l18.4,21.6a4,4,0,0,0,6.9-1.2l9.8-26.6a4.07,4.07,0,0,1,5.9-2.1l24.7,14.1a4.09,4.09,0,0,0,6.1-3.5l.1-28.4a4.12,4.12,0,0,1,4.8-4l28,4.8a4.06,4.06,0,0,0,4.5-5.4l-9.61-26.7a4.06,4.06,0,0,1,3.11-5.4l27.89-5.1a4.05,4.05,0,0,0,2.4-6.6l-18-21.9a4,4,0,0,1,1.1-6.1l24.5-14.3A4.21,4.21,0,0,0,289.23,139.85Zm-143.7,109.5a105.9,105.9,0,1,1,105.9-105.9A105.88,105.88,0,0,1,145.53,249.35Z"/><circle class="cls-2" cx="145.53" cy="143.45" r="92"/></g></g></svg>`;
	const themeIcon = document.getElementById('theme-icon');
	const themeIconContainer = document.getElementById('theme-icon-container');
	document.body.classList.remove(removeTheme);
	document.body.classList.add(addTheme);
	themeIconContainer.removeChild(themeIcon);
	if (removeTheme === 'light') themeIconContainer.appendChild(createElementFromHTML(darkIcon));
	else if (removeTheme === 'dark') themeIconContainer.appendChild(createElementFromHTML(lightIcon));
}

module.exports = {
	download,
	copyToClipboard,
	simulateClick,
	displayTime,
	calculatePageProgress,
	createElementFromHTML,
	themeToggler
};
