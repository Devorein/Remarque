const { download, copyToClipboard } = require('./utility');

function addCodeIcons() {
	Array.from(document.querySelectorAll('pre[class*="language"]')).forEach((codeBlock) => {
		createCopyIcons(codeBlock);
		if (!codeBlock.classList.contains('language-shell')) createDownloadIcons(codeBlock);
	});
}

function createCopyIcons(parent) {
	const copy_icon = document.createElement('span');
	copy_icon.classList.add('icon--copy');
	copy_icon.innerText = '📄';
	copy_icon.addEventListener('click', () => {
		copyToClipboard(parent.querySelector('code').textContent);
		copy_icon.textContent = 'copied';
		copy_icon.style.left = 'calc(100% - 65px)';
		setTimeout(() => {
			copy_icon.textContent = '📄';
			copy_icon.style.left = 'calc(100% - 30px)';
		}, 1000);
	});
	parent.appendChild(copy_icon);
}

function createDownloadIcons(parent) {
	const download_icon = document.createElement('span');
	download_icon.classList.add('icon--download');
	download_icon.innerHTML = `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
  <g>
    <g>
      <path d="M382.56,233.376C379.968,227.648,374.272,224,368,224h-64V16c0-8.832-7.168-16-16-16h-64c-8.832,0-16,7.168-16,16v208h-64
        c-6.272,0-11.968,3.68-14.56,9.376c-2.624,5.728-1.6,12.416,2.528,17.152l112,128c3.04,3.488,7.424,5.472,12.032,5.472
        c4.608,0,8.992-2.016,12.032-5.472l112-128C384.192,245.824,385.152,239.104,382.56,233.376z"/>
    </g>
  </g>
  <g>
    <g>
      <path d="M432,352v96H80v-96H16v128c0,17.696,14.336,32,32,32h416c17.696,0,32-14.304,32-32V352H432z"/>
    </g>
  </g>
  </svg>`;
	download_icon.addEventListener('click', () => {
		const code = parent.querySelector('code');
		download(`${code.getAttribute('file-name')}.${code.classList[0]}`, code.textContent);
	});
	parent.appendChild(download_icon);
}

function addLineHighlight() {
	Array.from(
		document.querySelectorAll('.call-line-number,.input-line-number,.error-line-number')
	).forEach((line_highlight) => {
		const line_number = line_highlight.textContent;
		const code = line_highlight.parentElement.parentElement.previousElementSibling.querySelectorAll(
			`div[data-range='${line_number}']`
		);
		if (code.length > 1) {
			code[0].style.left = '100%';
			code[0].style.width = '25%';
			code[0].style.transform = 'translateX(-100%)';
		}
		code[0].classList.add(`code-${line_highlight.classList[0]}`);
	});
	Array.from(
		document.querySelectorAll('.highlight--low,.highlight--medium,.highlight--high')
	).forEach((line_highlight) => {
		const line_number = line_highlight.textContent;
		const highlight_lines = line_highlight.parentElement.parentElement.parentElement.previousElementSibling.firstElementChild.querySelectorAll(
			`div[data-range='${line_number}']`
		);
		const _class = line_highlight.classList[0].split('--');
		const check_class = `${_class[0]}-line--${_class[1]}`;
		for (let i = 0; i < highlight_lines.length; i++)
			if (!highlight_lines[i].className.includes('-line-number')) {
				highlight_lines[i].classList.add(check_class);
				break;
			}
	});
}

function respositionLineHighlights() {
	Array.from(document.querySelectorAll('.line-highlight')).forEach((line_highlight) => {
		line_highlight.parentElement
			.querySelector('code')
			.appendChild(line_highlight.parentElement.removeChild(line_highlight));
	});
}

module.exports = {
	addCodeIcons,
	addLineHighlight,
	respositionLineHighlights
};
