const { htmlElementCreation, createElementFromHTML, makeConstantProp } = require('../../utility');
const { getSVGData } = require('../../file');

function addGroupsPage() {
	makeConstantProp(
		'GROUPS',
		htmlElementCreation({
			id         : 'groups',
			classes    : 'page',
			parentElem : BODY
		})
	);

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
