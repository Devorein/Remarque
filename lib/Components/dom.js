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
	addLineHighlight,
	respositionLineHighlights
};
