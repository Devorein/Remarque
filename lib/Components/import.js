function getHeaderPosition(allHeadingPos) {
	Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).forEach((header) => {
		const top = header.offsetTop;
		const level = header.tagName.substring(1);
		allHeadingPos[header.id] = [ top, level ];
	});
}

module.exports = {
	getHeaderPosition
};
