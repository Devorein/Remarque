const { createElementFromHTML } = require('./utility');

// ✅
function overlay_cancelIClickCloseOverlay() {
	document.getElementById('overlayCancelIcon').addEventListener('click', e => {
		_overlay.style.display = 'none';
		_overlay.removeChild(_overlay.querySelector('.cloned-block'));
	});
}

// ✅
function overlay_moveIClickSwitchesBlock() {
	const _block_container_childs = Array.from(document.querySelectorAll('.block-container .text-block'));
	let totalBlockContainerChild = _block_container_childs.length;
	const _overlayNextIcon = document.getElementById('overlayNextIcon');
	const _overlayPrevIcon = document.getElementById('overlayPrevIcon');
	[ _overlayNextIcon, _overlayPrevIcon ].forEach(_icon => {
		_icon.addEventListener('click', e => {
			let blockContainerChild = window.lastBlockSelected ? window.lastBlockSelected : 0;
			let targetItem = 0;
			if (_icon.id === _overlayPrevIcon.id) {
				targetItem =
					blockContainerChild == 0
						? (blockContainerChild = totalBlockContainerChild - 1)
						: --blockContainerChild;
			}
			else if (_icon.id === _overlayNextIcon.id) {
				targetItem =
					blockContainerChild == totalBlockContainerChild - 1
						? (blockContainerChild = 0)
						: ++blockContainerChild;
			}
			changeOverlayItemCounter(targetItem + 1);
			const _text_block = _block_container_childs[targetItem];
			_overlay.removeChild(_overlay.querySelector('.cloned-block'));
			_overlay.appendChild(createElementFromHTML(`<div class="cloned-block">${_text_block.innerHTML}</div>`));
		});
	});
}

// ✅
function changeOverlayItemCounter(counter, total) {
	window.lastBlockSelected = counter - 1;
	const _overlayCounter = document.getElementById('overlayCounter');
	const [ counter_, total_ ] = _overlayCounter.textContent.split('/');
	_overlayCounter.textContent = `${counter ? counter : counter_}/${total ? total : total_}`;
}

// ✅
function customblockClickAppendsOverlay() {
	Array.from(document.querySelectorAll('.block-container .text-block')).forEach((_customBlock, index, arr) => {
		_customBlock.addEventListener('click', e => {
			changeOverlayItemCounter(index + 1, arr.length);
			_overlay.style.display = 'block';
			_overlay.appendChild(createElementFromHTML(`<div class="cloned-block">${_customBlock.innerHTML}</div>`));
		});
	});
}

function overlay_unique_moveIClickSwitchesBlock() {
	const _overlayPrevUniqueIcon = document.getElementById('overlayPrevUniqueIcon');
	const _overlayNextUniqueIcon = document.getElementById('overlayNextUniqueIcon');
	const _custom_blocks = Array.from(document.querySelectorAll('.block-container .text-block'));
	[ _overlayPrevUniqueIcon, _overlayNextUniqueIcon ].forEach(_icon => {
		_icon.addEventListener('click', e => {
			const current_start_str = _custom_blocks[lastBlockSelected].textContent.codePointAt(0);
			let target_index = 0;

			if (_icon.id === _overlayNextUniqueIcon.id) {
				let i = lastBlockSelected + 1;
				for (; i < _custom_blocks.length; ) {
					const new_start_str = _custom_blocks[i].textContent.codePointAt(0);
					if (current_start_str !== new_start_str) {
						target_index = i;
						break;
					}
					i = i === _custom_blocks.length - 1 ? 0 : i + 1;
				}
			}
			else if (_icon.id === _overlayPrevUniqueIcon.id) {
				let i = lastBlockSelected - 1;
				for (; i >= 0; ) {
					const new_start_str = _custom_blocks[i].textContent.codePointAt(0);
					if (current_start_str !== new_start_str) {
						target_index = i;
						break;
					}
					i = i === 0 ? _custom_blocks.length - 1 : i - 1;
				}
			}

			window.lastBlockSelected = target_index;
			changeOverlayItemCounter(target_index + 1);
			_overlay.removeChild(_overlay.querySelector('.cloned-block'));
			_overlay.appendChild(
				createElementFromHTML(`<div class="cloned-block">${_custom_blocks[target_index].innerHTML}</div>`)
			);
		});
	});
}

module.exports = {
	overlay_cancelIClickCloseOverlay,
	overlay_moveIClickSwitchesBlock,
	customblockClickAppendsOverlay,
	overlay_unique_moveIClickSwitchesBlock
};
