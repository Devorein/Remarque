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

window.simulateClick = elem => {
	let evt = new MouseEvent('click', {
		bubbles    : true,
		cancelable : true,
		view       : window
	});
	elem.dispatchEvent(evt);
};

function calculatePageProgress() {
	const _content = document.getElementById('content');
	const _progressCounter = document.getElementById('progressCounter');
	const _progressBar = document.getElementById('progressBar');
	const _progressContainer = document.getElementById('progressContainer');

	const percent = _content.scrollTop / (_content.scrollHeight - document.documentElement.clientHeight) * 100;
	let res = percent.toFixed(2);
	res = res < 100 ? res : 100;
	_progressCounter.textContent = `${res}%`;
	_progressContainer.style.top = `${_content.scrollTop}px`;
	_progressBar.style.width = `${res}%`;
	const green = res / 100 * 255;
	const red = 255 - green;
	_progressBar.style.backgroundColor = `rgba(${red},${green},0,.75)`;
	_clockContainer.style.top = `${parseInt(_content.scrollTop) + parseInt(document.documentElement.clientHeight)}px`;
}

function createElementFromHTML(htmlString) {
	var div = document.createElement('div');
	div.innerHTML = htmlString.trim();
	return div.firstElementChild;
}

function removeClass(selector, class_) {
	Array.from(document.querySelectorAll(selector)).forEach(_selected => {
		_selected.classList.remove(class_);
	});
}

function toggleProp(infoObj) {
	const { _source, _target, _class, cases, prop } = infoObj;
	const class_ = _class ? _class : 'activated';
	const active = _source.classList.toggle(class_);
	_target.style[prop] = active ? cases[0] : cases[1];
}

function switchClass([ check, switch_ ], _target) {
	if (_target.classList.contains(check)) {
		_target.classList.remove(check);
		_target.classList.add(switch_);
		return true;
	}
}

function makeConstantProp(prop, value) {
	Object.defineProperty(window, prop, {
		value,
		writable     : false,
		enumerable   : true,
		configurable : true
	});
}

module.exports = {
	download,
	copyToClipboard,
	simulateClick,
	calculatePageProgress,
	createElementFromHTML,
	removeClass,
	toggleProp,
	switchClass,
	makeConstantProp
};
