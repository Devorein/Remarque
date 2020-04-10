class AppContentCodeExpBlockLine {
	static checkPriority(priority) {
		if (priority === 'L') return 'low';
		else if (priority === 'M') return 'medium';
		else if (priority === 'H') return 'high';
	}

	static addExplanationHighlight(_list) {
		[ ..._list.children ].forEach(_line => {
			const { textContent } = _line;
			let innerHTML = ``;
			const match = textContent.match(/([\d+\,\-?]+[LHM])\s/);
			const _parent = _list.parentElement.previousElementSibling.previousElementSibling.lastElementChild;
			if (match) {
				const text = textContent.substring(match[1].length);
				let lines = match[1].substring(0, match[1].length - 1);
				const priority = this.checkPriority(match[1].charAt(match[1].length - 1));
				if (lines.includes(',')) {
					lines.split(',').forEach(line => {
						addCodeHighlight(line, _parent, priority, 'explanation-line');
						innerHTML += `<span class="highlight-number highlight-number--${priority} explanation-number" target-line="${line}">${line}</span>`;
					});
				}
				else {
					innerHTML += `<span class="highlight-number highlight-number--${priority} explanation-number" target-line="${lines}">${lines}</span>`;
					addCodeHighlight(lines, _parent, priority, 'explanation-line');
				}
				innerHTML += text;
			}
			else innerHTML = textContent;
			_line.innerHTML = innerHTML;
		});
	}

	static create(_list, _code) {
		this.addExplanationHighlight(_list);
	}
}

module.exports = AppContentCodeExpBlockLine;
