const fs = require('fs');
const path = require('path');

const downloadIcon = fs.readFileSync(path.join(svgDir, 'download.svg'));

function addCodeIcons(parent) {
	createCopyIcons(parent);
	createDownloadIcons(parent);
}

function createCopyIcons(parent) {
	const copy_icon = document.createElement('span');
	copy_icon.classList.add('icon--copy');
	copy_icon.textContent = '📄';
	parent.appendChild(copy_icon);
}

function createDownloadIcons(parent) {
	const download_icon = document.createElement('span');
	download_icon.classList.add('icon--download');
	download_icon.innerHTML = downloadIcon;
	parent.appendChild(download_icon);
}

module.exports = {
	addCodeIcons
};
