const { calculatePageProgress, removeClass } = require('./utility');

function tocButtonHandler() {
	[ 'searchIgnoreCap', 'tocCodeSearch', 'tocToggleCustom' ].forEach(button => {
		const _button = document.getElementById(`${button}Icon`);
		_button.addEventListener('click', e => {
			const status = _button.classList.toggle('activated');
			window.localStorage.setItem(button, status);
			toggleTOCElem();
		});
	});
}

function addTOCSearch() {
	_tocInputField.addEventListener('input', e => {
		window.localStorage.setItem('tocSearchValue', e.target.value);
		toggleTOCElem();
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
			document.getElementById('clickSound').play();
			window.localStorage.setItem('lastLink', '#' + link);
			window.localStorage.setItem('lastFile', window.location.pathname);
		});
	});
}

function toggleTOCElem() {
	const searchIgnoreCapIcon = document.getElementById('searchIgnoreCapIcon').classList.contains('activated');
	const tocCodeSearch = document.getElementById('tocCodeSearchIcon').classList.contains('activated');
	const tocToggleCustom = document.getElementById('tocToggleCustomIcon').classList.contains('activated');
	const searchValue = document.getElementById('tocInputField').value;

	let _shown_items = _toc_items.filter(_toc_item => {
		if (searchIgnoreCapIcon) {
			if (_toc_item.textContent.toLowerCase().includes(searchValue.toLowerCase())) {
				_toc_item.style.display = 'flex';
				return _toc_item;
			}
			else _toc_item.style.display = 'none';
		}
		else {
			if (_toc_item.textContent.includes(searchValue)) {
				_toc_item.style.display = 'flex';
				return _toc_item;
			}
			else _toc_item.style.display = 'none';
		}
	});

	if (tocCodeSearch) {
		_shown_items = _shown_items.filter(_shown_item => {
			if (_shown_item.textContent.includes('❰ ❱')) {
				_shown_item.style.display = 'flex';
				return _shown_item;
			}
			else _shown_item.style.display = 'none';
		});
	}

	if (tocToggleCustom) {
		_shown_items.forEach(_shown_item => {
			if (_shown_item.textContent.includes('➥')) {
				_shown_item.style.display = 'inherit';
				return _shown_item;
			}
			else _shown_item.style.display = 'none';
		});
	}
	decideTocItems();
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
				window.localStorage.setItem('lastLink', entries[0].target.id);

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
						// if (_parent.offsetTop > _toc.scrollHeight)
						// 	_parent.scrollIntoView({
						// 		behavior : 'smooth'
						// 	});
					}
				}, 500);
			},
			{ threshold: [ 1 ], root: _content, rootMargin: '0px 0px -650px 0px' }
		);
		observer.observe(_header);
	});
}

// ✅
// 💡 Add smoother animation during items transition
function toc_item_toggleIClickTogglesChildDisplay() {
	Array.from(document.querySelectorAll('.icon--toggle')).forEach(_icon => {
		_icon.addEventListener('click', e => {
			_icon.classList.toggle('link--hidden');
			_icon.parentElement.nextElementSibling.classList.toggle('hidden');
		});
	});
}

function toc_item_checkboxClickSelectItem() {
	Array.from(document.querySelectorAll('.checkmark')).forEach(_checkmark => {
		_checkmark.addEventListener('click', e => {
			const checked = e.target.classList.toggle('checked');
			if (checked) _checkmark.textContent = '✔';
			else _checkmark.textContent = '';
		});
	});
}

module.exports = {
	addTOCSearch,
	tocButtonHandler,
	highlightTOCOnScroll,
	toggleTOCElem,
	toc_linkClickScrollLink,
	toc_item_toggleIClickTogglesChildDisplay,
	toc_item_checkboxClickSelectItem
};
