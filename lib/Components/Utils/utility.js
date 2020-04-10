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

function displayTime() {
	++SETTINGS['__totalSeconds'];
	const hours = Math.floor(SETTINGS['__totalSeconds'] / 3600);
	const secs_left = SETTINGS['__totalSeconds'] % 3600;
	const minutes = Math.floor(secs_left / 60);
	const secs = secs_left % 60;
	_app_clock_timer.textContent = `${hours < 10 ? '0' + hours : hours}:${minutes < 10
		? '0' + minutes
		: minutes}:${secs < 10 ? '0' + secs : secs}`;
}

function scrollHighlightLine(target) {
	target.classList.add('highlight');
	const target_pos = target.offsetTop;
	target.parentElement.parentElement.parentElement.previousElementSibling.scrollIntoView({
		behavior : 'smooth'
	});
	const current_position = target.parentElement.scrollTop;
	if (current_position < target_pos)
		while (target.parentElement.scrollTop + 475 < target_pos) target.parentElement.scrollBy(0, 50);
	else if (target_pos < current_position)
		while (target.parentElement.scrollTop > target_pos) target.parentElement.scrollBy(0, -50);
	setTimeout(() => {
		target.classList.remove('highlight');
	}, 1000);
}

module.exports = {
	download,
	copyToClipboard,
	simulateClick,
	createElementFromHTML,
	removeClass,
	toggleProp,
	switchClass,
	makeConstantProp,
	displayTime,
	scrollHighlightLine
};
