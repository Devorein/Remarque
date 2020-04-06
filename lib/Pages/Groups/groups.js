const { htmlElementCreation, createElementFromHTML, makeConstantProp } = require('../../utility');
const { getSVGData } = require('../../file');

function addGroupsPage() {
	const _groupsContainer = htmlElementCreation({
		id : 'groupsContainer'
	});
	makeConstantProp('groupsContainer', _groupsContainer);

	makeConstantProp(
		'GROUPS',
		htmlElementCreation({
			id         : 'groups',
			classes    : 'page',
			parentElem : BODY,
			children   : _groupsContainer
		})
	);
	const groups = [ 'info', 'tip', 'note', 'warning', 'definition', 'warning', 'important', 'example', 'syntax' ];

	groups.forEach(group => {
		_groupsContainer.appendChild(
			htmlElementCreation({
				id       : `${group}GroupContainer`,
				classes  : `groupContainer`,
				children : htmlElementCreation({
					type        : 'h2',
					id          : `${group}GroupContainerHeader`,
					classes     : `groupContainerHeader`,
					textContent : group.toUpperCase()
				})
			})
		);
	});

	const _cancelIcon = createElementFromHTML(`${getSVGData('cross')}`)[0];
	_cancelIcon.id = 'groupsPageCancel';
	GROUPS.appendChild(_cancelIcon);

	const additionalHTML = `
    <div id="overlay">
      ${getSVGData('cross')}
      <div id="overlayCounter"></div>
      <div id="overlayNextIcon">▶</div>
      <div id="overlayPrevIcon">◀</div>
      <div id="overlayPrevUniqueIcon">◀</div>
      <div id="overlayNextUniqueIcon">◀</div>
    </div>
  `;
	GROUPS.appendChild(createElementFromHTML(additionalHTML)[0]);
}

module.exports = {
	addGroupsPage
};
