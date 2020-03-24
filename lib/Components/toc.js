const { calculatePageProgress } = require('./utility');

const _tocHiddenItems = document.getElementById('tocHiddenItems');
const _tocTotalItems = document.getElementById('tocTotalItems');

function tocButtonHandler() {
	const _searchIgnoreCapIcon = document.getElementById('searchIgnoreCap');
	const _tocCodeSearchIcon = document.getElementById('tocCodeSearch');
	const _tocToggleCustomIcon = document.getElementById('tocToggleCustom');

	[ _searchIgnoreCapIcon, _tocCodeSearchIcon, _tocToggleCustomIcon ].forEach((button) => {
		button.addEventListener('click', (e) => {
			button.classList.toggle('activated');
			const status = button.classList.contains('activated');
			window.localStorage.setItem(button.id, status);
			searchButtonHandler(button.id, status);
			decideTocItems();
		});
	});
}

function searchButtonHandler(button, status) {
	if (status !== '' && status !== null) {
		Object.entries(allTOCElems).forEach(([ id, textContent ]) => {
			if (button === 'tocCodeSearch' && status.toString() === 'true' && !textContent.includes('❰ ❱'))
				document.getElementById(id).style.display = 'none';
			else if (button === 'tocToggleCustom' && status.toString() === 'true' && !textContent.includes('➥'))
				document.getElementById(id).style.display = 'none';
			else document.getElementById(id).style.display = 'initial';
		});
	}
}

function addTOCSearch() {
	const _tocInputField = document.getElementById('tocInputField');
	_tocInputField.addEventListener('input', (e) => {
		window.localStorage.setItem('tocSearchValue', e.target.value);
		toggleTOCElem(e.target.value);
		decideTocItems();
	});
}

function decideTocItems() {
	const _tocItems = Array.from(_toc.querySelectorAll('.toc-item'));
	const total = _tocItems.length;
	const hidden = _tocItems.filter((tocItem) => tocItem.style.display === 'none').length;
	_tocHiddenItems.textContent = `${hidden}/`;
	_tocTotalItems.textContent = total;
}

function toggleTOCElem(value) {
	const _searchIgnoreCapIcon = document.getElementById('searchIgnoreCap');
	const ignoreCap = _searchIgnoreCapIcon.classList.contains('activated');

	Object.entries(allTOCElems).forEach((tocElem) => {
		if (ignoreCap && tocElem[1].toLowerCase().includes(value.toLowerCase()))
			document.querySelector(`#${tocElem[0]}`).style.display = 'initial';
		else if (!ignoreCap && tocElem[1].includes(value))
			document.querySelector(`#${tocElem[0]}`).style.display = 'initial';
		else document.querySelector(`#${tocElem[0]}`).style.display = 'none';
	});
}

function highlightTOCOnScroll() {
	let previousHighlight = '';
	let timer = null;
	_content.addEventListener('scroll', (e) => {
		calculatePageProgress();
		const entries = Object.entries(allHeadingPos);
		const area = 50;
		if (timer !== null) {
			clearTimeout(timer);
		}
		timer = setTimeout(function() {
			const target = document.getElementById(previousHighlight + '_container');
			if (target)
				target.scrollIntoView({
					behavior : 'smooth'
				});
		}, 150);
		for (let [ id, [ pos, level ] ] of entries) {
			if (Math.abs(pos - e.target.scrollTop) < area && previousHighlight !== id) {
				previousHighlight = id;
				const prev = document.querySelectorAll('.current-link');
				if (prev && prev.length !== 0) {
					if (prev[0]) prev[0].classList.remove('current-link');
					if (prev[1]) prev[1].classList.remove('current-link');
				}
				document.getElementById(id).classList.add('current-link');
				if (document.querySelector(`span[href="${id}"]`))
					document.querySelector(`span[href="${id}"]`).parentElement.classList.add('current-link');
				window.localStorage.setItem('last-link', `#${id}`);
				break;
			}
		}
	});
}

module.exports = {
	addTOCSearch,
	tocButtonHandler,
	highlightTOCOnScroll
};
