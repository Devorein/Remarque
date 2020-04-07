const { calculatePageProgress, removeClass, createElementFromHTML, simulateClick } = require('./utility');

function tocButtonHandler() {
  [ 'searchIgnoreCap', 'tocCodeSearch', 'tocToggleCustom', 'searchUseRegex' ].forEach(button => {
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

// 🔨
function toggleTOCElem() {
  const searchIgnoreCapIcon = document.getElementById('searchIgnoreCapIcon').classList.contains('activated');
  const tocCodeSearch = document.getElementById('tocCodeSearchIcon').classList.contains('activated');
  const tocToggleCustom = document.getElementById('tocToggleCustomIcon').classList.contains('activated');
  const searchUseRegex = document.getElementById('searchUseRegexIcon').classList.contains('activated');
  const searchValue = document.getElementById('tocInputField').value;

  let _shown_items = _toc_contents.map(_toc_content => {
    if (searchUseRegex && searchIgnoreCapIcon) {
      if (new RegExp(searchValue, 'i').test(_toc_content.textContent)) {
        _toc_content.parentElement.style.display = 'flex';
        return _toc_content;
      }
      else _toc_content.parentElement.style.display = 'none';
    }
    else if (searchUseRegex && !searchIgnoreCapIcon) {
      if (new RegExp(searchValue).test(_toc_content.textContent)) {
        _toc_content.parentElement.style.display = 'flex';
        return _toc_content;
      }
      else _toc_content.parentElement.style.display = 'none';
    }
    else if (!searchUseRegex && searchIgnoreCapIcon) {
      if (_toc_content.textContent.toLowerCase().includes(searchValue.toLowerCase())) {
        _toc_content.parentElement.style.display = 'flex';
        return _toc_content;
      }
      else _toc_content.parentElement.style.display = 'none';
    }
    else if (!searchUseRegex && !searchIgnoreCapIcon) {
      if (_toc_content.textContent.includes(searchValue)) {
        _toc_content.parentElement.style.display = 'flex';
        return _toc_content;
      }
      else _toc_content.parentElement.style.display = 'none';
    }
  });

  if (tocCodeSearch) {
    _shown_items = _shown_items.map(_shown_item => {
      if (_shown_item.textContent.includes('❰ ❱')) {
        _shown_item.parentElement.style.display = 'flex';
        return _shown_item;
      }
      else _shown_item.parentElement.style.display = 'none';
    });
  }

  if (tocToggleCustom) {
    _shown_items = _shown_items.map(_shown_item => {
      if (_shown_item.textContent.includes('➥')) {
        _shown_item.parentElement.style.display = 'inherit';
        return _shown_item;
      }
      else _shown_item.parentElement.style.display = 'none';
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
  const _checkmarks = document.querySelectorAll('.checkmark');
  Array.from(_checkmarks).forEach((_checkmark, index) => {
    _checkmark.addEventListener('click', e => {
      const _checkmarkIcon = createElementFromHTML(
        `<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m512 58.667969c0-32.363281-26.304688-58.667969-58.667969-58.667969h-394.664062c-32.363281 0-58.667969 26.304688-58.667969 58.667969v394.664062c0 32.363281 26.304688 58.667969 58.667969 58.667969h394.664062c32.363281 0 58.667969-26.304688 58.667969-58.667969zm0 0" fill="#4caf50"/><path d="m385.75 171.585938c8.339844 8.339843 8.339844 21.820312 0 30.164062l-138.667969 138.664062c-4.160156 4.160157-9.621093 6.253907-15.082031 6.253907s-10.921875-2.09375-15.082031-6.253907l-69.332031-69.332031c-8.34375-8.339843-8.34375-21.824219 0-30.164062 8.339843-8.34375 21.820312-8.34375 30.164062 0l54.25 54.25 123.585938-123.582031c8.339843-8.34375 21.820312-8.34375 30.164062 0zm0 0" fill="#fafafa"/></svg>`
      );

      if (!e.shiftKey) {
        const checked = _checkmark.classList.toggle('checked');
        if (checked) _checkmark.appendChild(_checkmarkIcon);
        else _checkmark.removeChild(_checkmark.firstElementChild);
        addToSelectedToc(_checkmark);
        checkForTOCChildrenSelection(_checkmark);
        checkForTOCParentSelection(_checkmark);
      }
      else if (e.shiftKey) {
        const checked = !_checkmark.classList.contains('checked');
        const containsChild = _checkmark.parentElement.nextElementSibling;
        if(containsChild){
          _checkmark.classList.add("checked");
          checkForTOCChildrenSelection(_checkmark);
        }
        for (let i = index; i>=0 ; i--) {
          const _checkmark = _checkmarks[i];
          if (checked){
            const _parent = _checkmark.parentElement.nextElementSibling;
            if(!_parent){
              _checkmark.classList.add("checked");
              if(!_checkmark.firstElementChild) _checkmark.appendChild(_checkmarkIcon.cloneNode(true));
            }else if(_parent && _parent.querySelectorAll(".toc-item").length === _parent.querySelectorAll(".checked").length){
              _checkmark.classList.add("checked");
              if(!_checkmark.firstElementChild) _checkmark.appendChild(_checkmarkIcon.cloneNode(true));
            }
          }
          else if (!checked){
            const _parent = _checkmark.parentElement.nextElementSibling;
            if(!_parent){
              _checkmark.classList.remove("checked");
              if(_checkmark.firstElementChild) _checkmark.removeChild(_checkmark.firstElementChild);
            }else if(_parent && _parent.querySelectorAll(".toc-item").length !== _parent.querySelectorAll(".checked").length){
              _checkmark.classList.remove("checked");
              if(_checkmark.firstElementChild) _checkmark.removeChild(_checkmark.firstElementChild);
            }
          }
          addToSelectedToc(_checkmark);
        }
      }
    });
  });
}

function checkForTOCChildrenSelection(_checkmark) {
  const _checkmarkIcon = createElementFromHTML(
    `<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m512 58.667969c0-32.363281-26.304688-58.667969-58.667969-58.667969h-394.664062c-32.363281 0-58.667969 26.304688-58.667969 58.667969v394.664062c0 32.363281 26.304688 58.667969 58.667969 58.667969h394.664062c32.363281 0 58.667969-26.304688 58.667969-58.667969zm0 0" fill="#4caf50"/><path d="m385.75 171.585938c8.339844 8.339843 8.339844 21.820312 0 30.164062l-138.667969 138.664062c-4.160156 4.160157-9.621093 6.253907-15.082031 6.253907s-10.921875-2.09375-15.082031-6.253907l-69.332031-69.332031c-8.34375-8.339843-8.34375-21.824219 0-30.164062 8.339843-8.34375 21.820312-8.34375 30.164062 0l54.25 54.25 123.585938-123.582031c8.339843-8.34375 21.820312-8.34375 30.164062 0zm0 0" fill="#fafafa"/></svg>`
  );
  const checked = _checkmark.classList.contains('checked');
  const _tocItems = _checkmark.parentElement.parentElement.querySelectorAll('.toc-item');
  _tocItems.forEach(_tocItem => {
    const _childChechmark = _tocItem.firstElementChild;
    if (checked && !_childChechmark.classList.contains('checked')) {
      _childChechmark.classList.add('checked');
      _childChechmark.appendChild(_checkmarkIcon.cloneNode(true));
      addToSelectedToc(_childChechmark);
    }
    else if (!checked && _childChechmark.classList.contains('checked')) {
      _childChechmark.classList.remove('checked');
      _childChechmark.removeChild(_childChechmark.firstElementChild);
      addToSelectedToc(_childChechmark);
    }
  });
}

function checkForTOCParentSelection(_checkmark) {
  const _checkmarkIcon = createElementFromHTML(
    `<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m512 58.667969c0-32.363281-26.304688-58.667969-58.667969-58.667969h-394.664062c-32.363281 0-58.667969 26.304688-58.667969 58.667969v394.664062c0 32.363281 26.304688 58.667969 58.667969 58.667969h394.664062c32.363281 0 58.667969-26.304688 58.667969-58.667969zm0 0" fill="#4caf50"/><path d="m385.75 171.585938c8.339844 8.339843 8.339844 21.820312 0 30.164062l-138.667969 138.664062c-4.160156 4.160157-9.621093 6.253907-15.082031 6.253907s-10.921875-2.09375-15.082031-6.253907l-69.332031-69.332031c-8.34375-8.339843-8.34375-21.824219 0-30.164062 8.339843-8.34375 21.820312-8.34375 30.164062 0l54.25 54.25 123.585938-123.582031c8.339843-8.34375 21.820312-8.34375 30.164062 0zm0 0" fill="#fafafa"/></svg>`
  );

  let _parent = _checkmark.parentElement.parentElement.parentElement.parentElement;
  while (_parent && !_parent.classList.contains('toc--L1-item-container')) {
    if (_parent) {
      const _parentCheckmark = _parent.firstElementChild.firstElementChild;
      if (
        _parent.querySelectorAll('.toc-item').length - 1 === _parent.querySelectorAll('.checked').length &&
        !_parentCheckmark.classList.contains('checked')
      ) {
        _parentCheckmark.appendChild(_checkmarkIcon.cloneNode(true));
        _parentCheckmark.classList.add('checked');
        addToSelectedToc(_parentCheckmark);
      }
      else if (
        _parent.querySelectorAll('.checked').length !== _parent.querySelectorAll('.toc-item').length &&
        _parentCheckmark.classList.contains('checked')
      ) {
        _parentCheckmark.removeChild(_parentCheckmark.firstElementChild);
        _parentCheckmark.classList.remove('checked');
        addToSelectedToc(_parentCheckmark);
      }
    }
    _parent = _parent.parentElement.parentElement;
  }
}

function addToSelectedToc(_item) {
  const checked = _item.classList.contains('checked');
  const index = parseInt(_item.parentElement.getAttribute('item-num'));
  if (checked) {
    let clicked_items = window.localStorage.getItem('clickedItems');
    clicked_items = clicked_items === '' ? [] : JSON.parse(clicked_items);
    clicked_items.push(index);
    window.localStorage.setItem('clickedItems', JSON.stringify(clicked_items));
  }
  else {
    let clicked_items = window.localStorage.getItem('clickedItems');
    clicked_items = clicked_items === '' ? [] : JSON.parse(clicked_items);
    clicked_items = clicked_items.filter(item => item != index);
    window.localStorage.setItem('clickedItems', JSON.stringify(clicked_items));
  }
}

function addTOCCheckOnPageLoad() {
  const _checkmarkIcon = createElementFromHTML(
    `<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m512 58.667969c0-32.363281-26.304688-58.667969-58.667969-58.667969h-394.664062c-32.363281 0-58.667969 26.304688-58.667969 58.667969v394.664062c0 32.363281 26.304688 58.667969 58.667969 58.667969h394.664062c32.363281 0 58.667969-26.304688 58.667969-58.667969zm0 0" fill="#4caf50"/><path d="m385.75 171.585938c8.339844 8.339843 8.339844 21.820312 0 30.164062l-138.667969 138.664062c-4.160156 4.160157-9.621093 6.253907-15.082031 6.253907s-10.921875-2.09375-15.082031-6.253907l-69.332031-69.332031c-8.34375-8.339843-8.34375-21.824219 0-30.164062 8.339843-8.34375 21.820312-8.34375 30.164062 0l54.25 54.25 123.585938-123.582031c8.339843-8.34375 21.820312-8.34375 30.164062 0zm0 0" fill="#fafafa"/></svg>`
  );
  const _checkmarks = document.querySelectorAll('.checkmark ');
  let clickedItems = JSON.parse(window.localStorage.getItem('clickedItems'));
  clickedItems = clickedItems.sort();
  clickedItems.forEach(clickedItem => {
    const _checkmark = _checkmarks[clickedItem - 1];
    _checkmark.classList.add('checked');
    _checkmark.appendChild(_checkmarkIcon.cloneNode(true));
  });
}

module.exports = {
  addTOCSearch,
  tocButtonHandler,
  highlightTOCOnScroll,
  toggleTOCElem,
  toc_linkClickScrollLink,
  toc_item_toggleIClickTogglesChildDisplay,
  toc_item_checkboxClickSelectItem,
  addTOCCheckOnPageLoad
};
