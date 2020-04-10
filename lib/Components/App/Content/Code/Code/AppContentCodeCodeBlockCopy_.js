class AppContentCodeCodeBlockCopy {
	static click() {
		Array.from(document.querySelectorAll('.icon--copy')).forEach(_copy_icon => {
			_copy_icon.addEventListener('click', () => {
				copyToClipboard(_copy_icon.parentElement.querySelector('code').textContent);
				_copy_icon.textContent = 'copied';
				_copy_icon.style.left = 'calc(100% - 65px)';
				setTimeout(() => {
					_copy_icon.textContent = '📄';
					_copy_icon.style.left = 'calc(100% - 30px)';
				}, 1000);
			});
		});
	}
	static register() {
		this.click();
	}
}

module.exports = AppContentCodeCodeBlockCopy;
