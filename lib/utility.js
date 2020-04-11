function htmlElementCreation(htmlInfo) {
	const {
		textContent,
		innerHTML,
		outerHTML,
		parentElem,
		classes,
		type,
		id,
		insertBefore,
		children,
		clonedChildren,
		attributes
	} = htmlInfo;
	let createElem = null;
	if (!type) createElem = document.createElement('div');
	else createElem = document.createElement(type);

	if (textContent) createElem.textContent = textContent;
	else if (innerHTML) createElem.innerHTML = innerHTML;
	else if (outerHTML) createElem.outerHTML = outerHTML;

	if (id) createElem.id = id;

	if (Object.prototype.toString.call(classes) === '[object Array]') {
		while (classes.length !== 0) createElem.classList.add(classes.pop());
	}
	else if (classes) createElem.classList.add(classes);

	if (parentElem) parentElem.appendChild(createElem);
	else if (insertBefore) insertBefore.parentElement.insertBefore(createElem, insertBefore);

	if (children) {
		if (Object.prototype.toString.call(children) === '[object Array]')
			children.forEach(child => {
				createElem.appendChild(child);
			});
		else createElem.appendChild(children);
	}

	if (clonedChildren) for (let clonedChild of clonedChildren) createElem.appendChild(clonedChild.cloneNode(true));

	if (attributes)
		Object.entries(attributes).forEach(attribute => {
			createElem.setAttribute(attribute[0], attribute[1]);
		});
	return createElem;
}

function createElementFromHTML(htmlString) {
	const div = document.createElement('div');
	div.innerHTML = htmlString.trim();
	return Array.from(div.children);
}

function makeConstantProp(prop, value) {
	Object.defineProperty(global, prop, {
		value,
		writable     : false,
		enumerable   : true,
		configurable : true
	});
}

function addCodeHighlight(line, _code, purpose, group) {
	const line_height = 21;
	if (line.includes('-')) {
		let [ start, stop ] = line.split('-');
		const _line = htmlElementCreation({
			parentElem : _code,
			classes    : [ `highlight-line--${purpose}`, 'highlight-line', group ? group : 'output-line' ],
			attributes : { 'target-line': line }
		});
		start = parseInt(start);
		stop = parseInt(stop);
		_line.style.top = `${start * (line_height - 1) + 4}px`;
		_line.style.height = `${(stop + 1 - start) * line_height - 4}px`;
	}
	else {
		const _line = htmlElementCreation({
			parentElem : _code,
			classes    : [ `highlight-line--${purpose}`, 'highlight-line', group ? group : 'output-line' ],
			attributes : { 'target-line': line }
		});
		const top = line_height * parseInt(line) - parseInt(line) / 2 - 4;
		_line.style.top = `${top}px`;
	}
}

function parseChapters(chapters) {
	return [
		...new Set(
			typeof chapters === 'string'
				? chapters.split(' ')
				: chapters
						.map(num => {
							if (num.toString().includes('-')) {
								if (num.match(/[A-Za-z]+/)) throw new Error('Only numbers allowed!');
								let [ start, end ] = num.split('-');
								start = parseInt(start);
								end = parseInt(end);
								if (start <= end) {
									const temp = [];
									for (let i = start; i <= end; i++) temp.push(i);
									return temp;
								}
								else throw new Error('Start value less than end in range');
							}
							else return parseInt(num);
						})
						.flat()
		)
	];
}

module.exports = {
	htmlElementCreation,
	createElementFromHTML,
	makeConstantProp,
	addCodeHighlight,
	parseChapters
};
