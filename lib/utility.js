function htmlElementCreation(htmlInfo) {
	const {
		textContent,
		innerHTML,
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

	if (id) createElem.id = id;

	if (Object.prototype.toString.call(classes) === '[object Array]') {
		while (classes.length !== 0) createElem.classList.add(classes.pop());
	}
	else if (classes) createElem.classList.add(classes);

	if (parentElem) parentElem.appendChild(createElem);
	else if (insertBefore) insertBefore.parentElement.insertBefore(createElem, insertBefore);

	if (children) {
		if (Object.prototype.toString.call(children) === '[object Array]')
			children.forEach((child) => {
				createElem.appendChild(child);
			});
		else createElem.appendChild(children);
	}

	if (clonedChildren) for (let clonedChild of clonedChildren) createElem.appendChild(clonedChild.cloneNode(true));

	if (attributes)
		Object.entries(attributes).forEach((attribute) => {
			createElem.setAttribute(attribute[0], attribute[1]);
		});
	return createElem;
}

function createElementFromHTML(htmlString) {
	var div = document.createElement('div');
	div.innerHTML = htmlString.trim();

	// Change this to div.childNodes to support multiple top-level nodes
	return Array.from(div.children);
}

// ? Checks if the element is custom made
function checkForCustom(element) {
	const custom_tags = [ [ '➥', 'custom' ], [ '❰ ❱', 'code' ], [ 'Explanation (', 'explanation' ] ];
	for (let i = 0; i < custom_tags.length; i++)
		if (element.textContent.includes(custom_tags[i][0])) return custom_tags[i][1];
	return false;
}

function detectLinePurpose(line) {
	const line_dots = line.match(/\./g) ? line.match(/\./g).length : 0;
	switch (line_dots) {
		case 0:
		case 1:
			return 'output';
		case 2:
			return 'input';
		case 3:
			return 'error';
	}
}

function makeConstantProp(prop, value) {
	Object.defineProperty(global, prop, {
		value,
		writable     : false,
		enumerable   : true,
		configurable : true
	});
}

module.exports = {
	htmlElementCreation,
	createElementFromHTML,
	checkForCustom,
	detectLinePurpose,
	makeConstantProp
};
