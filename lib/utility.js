function htmlElementCreation(htmlInfo) {
	const { textContent, parentElem, classes, type, id, insertBefore, children, clonedChildren, attributes } = htmlInfo;
	let createElem = null;
	if (!type) createElem = document.createElement('div');
	else createElem = document.createElement(type);

	createElem.textContent = textContent;

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

module.exports = {
	htmlElementCreation,
	createElementFromHTML
};
