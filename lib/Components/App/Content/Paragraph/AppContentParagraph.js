const GroupsContentItem = require('../../../Groups/Content/Item/GroupsContentItem');

class AppContentParagraph {
	static addBlockClass(p) {
		const block = {
			'🔵' : 'info-block',
			'💡' : 'tip-block',
			'📖' : 'example-block',
			'📝' : 'note-block',
			'⚠️' : 'warning-block',
			'❗'  : 'important-block',
			'📙' : 'definition-block',
			'⏩'  : 'syntax-block',
			'Q:' : 'question-block',
			'A:' : 'answer-block'
		};
		const entries = Object.entries(block);
		for (let i = 0; i < entries.length; i++) {
			if (p.textContent.startsWith(entries[i][0])) {
				p.classList.add('text-block');
				p.classList.add(entries[i][1]);
				const type = entries[i][1].split('-')[0];
				GroupsContentItem.append(type, p);
				break;
			}
			else if (p.firstElementChild && p.firstElementChild.tagName === 'IMG') {
				p.classList.add('image-block');
				parseImage(p.firstElementChild);
				break;
			}
			else p.classList.add('text-block');
		}
		return p;
	}

	static parse(paragraph) {
		function parseInside(txt, left, right) {
			return left + txt + right;
		}
		paragraph = AppContentParagraph.addBlockClass(paragraph);
		let { innerHTML: text } = paragraph;
		text = text.replace(/\|\|\|(\S[\s\S]*?)\|\|\|/g, function(wm, m) {
			return /\S$/.test(m) ? parseInside(m, '<span class="high--text">', '</span>') : wm;
		});
		text = text.replace(/\|\|(\S[\s\S]*?)\|\|/g, function(wm, m) {
			return /\S$/.test(m) ? parseInside(m, '<span class="medium--text">', '</span>') : wm;
		});
		text = text.replace(/\|([^\s*][\s\S]*?)\|/g, function(wm, m) {
			return /\S$/.test(m) ? parseInside(m, '<span class="low--text">', '</span>') : wm;
		});
		paragraph.innerHTML = text;
		return paragraph;
	}
}

module.exports = AppContentParagraph;
