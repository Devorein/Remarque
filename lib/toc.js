let { createElementFromHTML, htmlElementCreation } = require('./utility');

const additionalHTML = `
  <div id="theme-icon-container">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 184 184" id="theme-icon" class="icon"><defs><style>.cls-1{fill:#32578e;}.cls-2{fill:#0f315b;}</style></defs><title>Asset 1</title><g  data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><circle class="cls-1" cx="92" cy="92" r="92"/><circle class="cls-2" cx="104.4" cy="33.8" r="12.4"/><circle class="cls-2" cx="42.2" cy="38.1" r="7.5"/><circle class="cls-2" cx="110.1" cy="161.5" r="5.7"/><circle class="cls-2" cx="49.7" cy="81.7" r="5.7"/><circle class="cls-2" cx="49.7" cy="125.6" r="5.7"/><circle class="cls-2" cx="70.6" cy="64" r="7.5"/><circle class="cls-2" cx="22.5" cy="81.7" r="9.9"/><circle class="cls-2" cx="156.6" cy="106.5" r="9.9"/><circle class="cls-2" cx="46.3" cy="145.8" r="9.9"/></g></g></svg>
  </div>
  <svg id="expandTOC" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16" viewBox="0 0 16 16">
    <path d="M11 2h-9v9l1-1v-7h7z"></path>
    <path d="M5 14h9v-9l-1 1v7h-7z"></path>
    <path d="M16 0h-5l1.8 1.8-4.5 4.5 1.4 1.4 4.5-4.5 1.8 1.8z"></path>
    <path d="M7.7 9.7l-1.4-1.4-4.5 4.5-1.8-1.8v5h5l-1.8-1.8z"></path>
  </svg>

  <svg version="1.1" id="collapseTOC" class="icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="489.682px" height="489.682px" viewBox="0 0 489.682 489.682" style="enable-background:new 0 0 489.682 489.682;"
	 xml:space="preserve">
    <g>
      <g>
        <polygon points="31.38,339.21 110.117,339.21 0,449.325 36.898,486.222 147.013,376.108 147.013,454.843 199.193,454.843 
          199.193,287.03 31.38,287.03 		"/>
        <polygon points="458.302,339.21 458.302,287.03 290.488,287.03 290.488,454.843 342.669,454.843 342.669,376.108 452.782,486.222 
          489.682,449.325 379.564,339.21 		"/>
        <polygon points="458.302,150.472 379.564,150.472 489.682,40.357 452.782,3.46 342.669,113.574 342.669,34.839 290.488,34.839 
          290.488,202.652 458.302,202.652 		"/>
        <polygon points="147.013,113.574 36.898,3.46 0,40.357 110.117,150.472 31.38,150.472 31.38,202.652 199.193,202.652 
          199.193,34.839 147.013,34.839 		"/>
      </g>
    </g>
  </svg>
  <svg id="codeDisplayIcon" class="icon" height="384pt" viewBox="0 -32 384 384" width="384pt" xmlns="http://www.w3.org/2000/svg"><path d="m64 288h-32v-256h32v-32h-64v320h64zm0 0"/><path d="m320 32h32v256h-32v32h64v-320h-64zm0 0"/><path d="m80 64h32v32h-32zm0 0"/><path d="m176 64h32v32h-32zm0 0"/><path d="m272 64h32v32h-32zm0 0"/><path d="m80 144h32v32h-32zm0 0"/><path d="m176 144h32v32h-32zm0 0"/><path d="m272 144h32v32h-32zm0 0"/><path d="m80 224h32v32h-32zm0 0"/><path d="m176 224h32v32h-32zm0 0"/><path d="m272 224h32v32h-32zm0 0"/></svg>
  <svg id="pageExtremeTopIcon" class="icon" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 512.005 512.005" style="enable-background:new 0 0 512.005 512.005;" xml:space="preserve">
    <g>
      <g>
        <path d="M392.173,236.293c-7.957-3.328-17.152-1.493-23.253,4.629L256.002,353.84L143.085,240.922
          c-6.101-6.101-15.253-7.957-23.253-4.629c-7.979,3.285-13.163,11.093-13.163,19.712v108.139c0,5.717,2.304,11.179,6.336,15.168
          l128,126.528c4.16,4.096,9.579,6.165,14.997,6.165c5.419,0,10.837-2.069,14.997-6.165l128-126.528
          c4.053-3.989,6.336-9.451,6.336-15.168v-108.14C405.335,247.386,400.151,239.577,392.173,236.293z"/>
      </g>
    </g>
    <g>
      <g>
        <path d="M392.173,1.626c-7.957-3.307-17.152-1.472-23.253,4.629L256.002,119.173L143.085,6.256
          c-6.101-6.101-15.253-7.936-23.253-4.629c-7.979,3.285-13.163,11.093-13.163,19.712v108.139c0,5.717,2.304,11.179,6.336,15.168
          l128,126.528c4.16,4.096,9.579,6.165,14.997,6.165c5.419,0,10.837-2.069,14.997-6.165l128-126.528
          c4.053-3.989,6.336-9.451,6.336-15.168V21.338C405.335,12.72,400.151,4.912,392.173,1.626z"/>
      </g>
    </g>
  </svg>
  <svg id="pageExtremeBottomIcon" class="icon" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 512.005 512.005" style="enable-background:new 0 0 512.005 512.005;" xml:space="preserve">
    <g>
      <g>
        <path d="M392.173,236.293c-7.957-3.328-17.152-1.493-23.253,4.629L256.002,353.84L143.085,240.922
          c-6.101-6.101-15.253-7.957-23.253-4.629c-7.979,3.285-13.163,11.093-13.163,19.712v108.139c0,5.717,2.304,11.179,6.336,15.168
          l128,126.528c4.16,4.096,9.579,6.165,14.997,6.165c5.419,0,10.837-2.069,14.997-6.165l128-126.528
          c4.053-3.989,6.336-9.451,6.336-15.168v-108.14C405.335,247.386,400.151,239.577,392.173,236.293z"/>
      </g>
    </g>
    <g>
      <g>
        <path d="M392.173,1.626c-7.957-3.307-17.152-1.472-23.253,4.629L256.002,119.173L143.085,6.256
          c-6.101-6.101-15.253-7.936-23.253-4.629c-7.979,3.285-13.163,11.093-13.163,19.712v108.139c0,5.717,2.304,11.179,6.336,15.168
          l128,126.528c4.16,4.096,9.579,6.165,14.997,6.165c5.419,0,10.837-2.069,14.997-6.165l128-126.528
          c4.053-3.989,6.336-9.451,6.336-15.168V21.338C405.335,12.72,400.151,4.912,392.173,1.626z"/>
      </g>
    </g>
    </svg>
    <svg version="1.1" class="icon" id="downloadCodesIcon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
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
    </svg>;
  `;

function createTOCElem(document) {
	preprocessTOC(document);
	Array.from(document.querySelectorAll('h2,h3,h4,h5,h6')).forEach((topic) => {
		createTOC(createDST(topic), document);
	});
}

function preprocessTOC(document) {
	const tocToggleCustom = htmlElementCreation(document, {
		textContent : '➥',
		id          : 'tocToggleCustom'
	});

	const tocL2Container = htmlElementCreation(document, {
		classes : 'toc--L1'
	});

	const tocSearchBar = htmlElementCreation(document, {
		type       : 'input',
		classes    : [ 'toc--input', 'icon' ],
		id         : 'tocInputField',
		attributes : { type: 'text' }
	});

	const tocCodeSearch = htmlElementCreation(document, {
		classes     : [ 'toc--code-search', 'icon' ],
		id          : 'tocCodeSearch',
		textContent : '❰ ❱'
	});

	const searchIgnoreCap = htmlElementCreation(document, {
		classes     : [ 'icon' ],
		id          : 'searchIgnoreCap',
		textContent : 'Aa'
	});

	const tocSearchContainer = htmlElementCreation(document, {
		id       : 'tocSearchContainer',
		children : [ tocSearchBar, tocCodeSearch, tocToggleCustom, searchIgnoreCap ]
	});

	const sliderElem = htmlElementCreation(document, {
		classes    : 'slider',
		id         : 'slider',
		attributes : { draggable: true }
	});

	const settingsContainer = htmlElementCreation(document, {
		id       : 'settingsContainer',
		children : [
			...createElementFromHTML(document, additionalHTML).map((elem) => {
				return elem;
			})
		]
	});

	htmlElementCreation(document, {
		classes      : 'TOC',
		id           : 'TOC',
		insertBefore : document.getElementById('content'),
		children     : [ tocSearchContainer, tocL2Container, sliderElem, settingsContainer ]
	});
}

function createDST(topic) {
	const level = parseInt(topic.tagName.substring(1));
	const { id, textContent, tagName } = topic;
	const topicInfo = {
		id,
		tagName,
		textContent,
		children    : [],
		childNum    : 1
	};

	let traverser = topic.nextElementSibling;

	while (traverser && traverser.tagName !== tagName) {
		if (traverser.tagName === `H${level + 1}`) topicInfo.children.push(traverser.id);
		traverser = traverser.nextElementSibling;
	}

	let _traverser = topic.previousElementSibling;
	while (_traverser && _traverser.tagName !== `H${level - 1}`) {
		if (_traverser.tagName === tagName) ++topicInfo.childNum;
		_traverser = _traverser.previousElementSibling;
	}
	topicInfo.parentId = _traverser.id;
	return topicInfo;
}

function createTOC(topicInfo, document) {
	const TOC = document.querySelector('#TOC .toc--L1');
	const { id, parentId, textContent, children, childNum, tagName } = topicInfo;

	// ? Add counter as the first child
	let tocItemChilds = [
		htmlElementCreation(document, {
			type        : 'span',
			classes     : 'toc--counter',
			textContent : childNum + '.'
		})
	];

	// ? Add the 🡇 toggle element in it contains
	if (children.length > 0) {
		tocItemChilds.push(
			htmlElementCreation(document, {
				type        : 'span',
				classes     : [ 'toc-toggle', 'icon--toggle' ],
				textContent : '🡇'
			})
		);
	}

	tocItemChilds.push(
		htmlElementCreation(document, {
			type        : 'span',
			attributes  : { href: id },
			textContent,
			classes     : 'toc--content'
		})
	);

	const tocContainerChilds = [
		htmlElementCreation(document, {
			classes  : [ `toc--L${tagName.substring(1)}-item`, 'toc-item' ],
			children : tocItemChilds,
			id       : id + '_container'
		})
	];

	if (children.length > 0)
		tocContainerChilds.push(
			htmlElementCreation(document, {
				classes : [ 'child-container' ]
			})
		);

	htmlElementCreation(document, {
		children   : tocContainerChilds,
		classes    : `toc--L${tagName.substring(1)}`,
		parentElem :
			parentId === 'chapter-name' ? TOC : document.querySelector(`#${parentId}_container + .child-container`)
	});
}

module.exports = {
	createTOCElem
};
