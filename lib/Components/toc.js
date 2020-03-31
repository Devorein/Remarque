const { calculatePageProgress, removeClass } = require('./utility');
const { searchButtonHandler } = require('./handlers');

function tocButtonHandler() {
	const _searchIgnoreCapIcon = document.getElementById('searchIgnoreCap');
	const _tocCodeSearchIcon = document.getElementById('tocCodeSearch');
	const _tocToggleCustomIcon = document.getElementById('tocToggleCustom');

	[ _searchIgnoreCapIcon, _tocCodeSearchIcon, _tocToggleCustomIcon ].forEach(_button => {
		_button.addEventListener('click', e => {
			const status = _button.classList.toggle('activated');
			window.localStorage.setItem(_button.id, status);
			searchButtonHandler();
			decideTocItems();
		});
	});
}

function addTOCSearch() {
	_tocInputField.addEventListener('input', e => {
		window.localStorage.setItem('tocSearchValue', e.target.value);
		toggleTOCElem(e.target.value);
		decideTocItems();
	});
}

function decideTocItems() {
	const _tocItems = Array.from(_toc.querySelectorAll('.toc-item'));
	const total = _tocItems.length;
	const hidden = _tocItems.filter(tocItem => tocItem.style.display === 'none').length;
	_tocHiddenItems.textContent = `${hidden}/`;
	_tocTotalItems.textContent = total;
}

// ✅
function toc_linkClickScrollLink() {
	Array.from(document.querySelectorAll('.toc--content')).forEach(_link => {
		_link.addEventListener('click', e => {
			const link = _link.getAttribute('href');
			document.getElementById(link).scrollIntoView({
				behavior : 'smooth'
			});
			window.localStorage.setItem('last-link', '#' + link);
			window.localStorage.setItem('last-file', window.location.pathname);
		});
	});
}

function toggleTOCElem(value) {
	const _searchIgnoreCapIcon = document.getElementById('searchIgnoreCap');
	const ignoreCap = _searchIgnoreCapIcon.classList.contains('activated');
	Object.entries(allTOCElems).forEach(tocElem => {
		if (ignoreCap && tocElem[1].toLowerCase().includes(value.toLowerCase()))
			document.querySelector(`span[href="${tocElem[0]}"]`).parentElement.style.display = 'inherit';
		else if (!ignoreCap && tocElem[1].includes(value))
			document.querySelector(`span[href="${tocElem[0]}"]`).parentElement.style.display = 'inherit';
		else document.querySelector(`span[href="${tocElem[0]}"]`).parentElement.style.display = 'none';
	});
}

(() => {
	document.querySelector('#content').addEventListener('scroll', e => {
		calculatePageProgress();
	});
})();

function highlightTOCOnScroll() {
	let timer = null;
	Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6')).forEach(_header => {
		const observer = new IntersectionObserver(
			entries => {
				removeClass('.current-link', 'current-link');
				entries[0].target.classList.add('current-link');
				if (timer !== null) clearTimeout(timer);

				timer = setTimeout(function() {
					const _target = document.querySelector(`span[href="${entries[0].target.id}"]`);
					if (_target) {
						const _parent = _target.parentElement;
						_parent.classList.add('current-link');
						for (let i = 0; i < _toc_items.length; i++) {
							if (_toc_items[i].classList.contains('current-link')) {
								window.selected_index = i;
								break;
							}
						}
						_parent.scrollIntoView({
							behavior : 'smooth'
						});
					}
				}, 500);
			},
			{ threshold: [ 1 ], root: _content, rootMargin: '0px 0px -650px 0px' }
		);
		observer.observe(_header);
	});
}

module.exports = {
	addTOCSearch,
	tocButtonHandler,
	highlightTOCOnScroll,
	toggleTOCElem,
	toc_linkClickScrollLink
};
