class AppContentCodeOutputBlockLine {
	static detectLinePurpose(line) {
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

	static parseFC(fc, _code) {
		let _innerHTML = ``;
		const fcs = fc.substring(0, fc.lastIndexOf('=>')).split('=>');
		fcs.forEach((fc, index) => {
			if (fc.includes(',')) {
				fc.split(',').forEach(_fc => {
					addCodeHighlight(_fc, _code.parentElement, `function--${index + 1}`);
					_innerHTML += `<span class="highlight-number highlight-number--function--${index +
						1}" target-line="${_fc}">${_fc}</span>`;
				});
			}
			else {
				addCodeHighlight(fc, _code.parentElement, `function--${index + 1}`);
				_innerHTML += `<span class="highlight-number highlight-number--function--${index +
					1}" target-line="${fc}">${fc}</span>`;
			}
		});
		return _innerHTML;
	}

	static parseReg(reg, _code) {
		let _innerHTML = ``;
		const purpose = this.detectLinePurpose(reg);
		const regs = reg.substring(reg.lastIndexOf('=>')).replace(/[\.\s?:(\=\>)]/g, '').split(',');
		regs.forEach(reg => {
			if (reg.includes(',')) {
				reg.split(',').forEach(_reg => {
					addCodeHighlight(_reg, _code.parentElement, `${purpose}`);
					_innerHTML += `<span class="highlight-number highlight-number--${purpose}" target-line="${_reg}">${_reg}</span>`;
				});
			}
			else {
				addCodeHighlight(reg, _code.parentElement, `${purpose}`);
				_innerHTML += `<span class="highlight-number highlight-number--${purpose}" target-line="${reg}">${reg}</span>`;
			}
		});
		return _innerHTML;
	}

	static addOutputHighlight(_parent, _code) {
		const _output = _parent.querySelector('code');
		const output_lines = _output.textContent.trim().split('\n');
		let innerHTML = ``;
		for (let line of output_lines) {
			let line_number = line.match(/^(\d+(?:\=\>)?\,?)*(\d+[\,\-]?)+\.{1,3}\s/);
			if (line_number) {
				const text = line.substring(line_number[0].length);
				if (line.includes('=>'))
					innerHTML += `<div class="app_content_code_output_group_block_line output-block-line">${this.parseFC(
						line_number[0],
						_code
					)}${this.parseReg(line_number[0], _code)}${text}</div>`;
				else
					innerHTML += `<div class="app_content_code_output_group_block_line output-block-line">${this.parseReg(
						line_number[0],
						_code
					)}${text}</div>`;
			}
			else innerHTML += `<div class="app_content_code_output_group_block_line output-block-line">${line}</div>`;
		}
		_parent.removeChild(_output);
		_parent.append(...createElementFromHTML(innerHTML));
	}

	static create(_output, _code) {
		this.addOutputHighlight(_output, _code);
	}
}

module.exports = AppContentCodeOutputBlockLine;
