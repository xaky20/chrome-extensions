
/* javascript (no jQuery) */
var rowDivs = document.querySelector('.row').children;
rowDivs[0].classList.remove('col-lg-9');
rowDivs[0].classList.remove('col-md-8');
rowDivs[0].classList.add('col-12');
console.log('content full-width');
rowDivs[1].remove();
console.log('sidebar removed');
var panels = document.querySelectorAll('.panel');

for (var i = 0; i < panels.length; i++) {
	panels[i].style.fontSize = '20px';
}
document.querySelectorAll('p span').forEach(el => el.style.fontSize = '20px');
console.log('font size 20');
var views = document.querySelectorAll('.fr-view');
for (var i = 0; i < views.length; i++) {
	views[i].style.padding = '12px';
}

var chapterTitle = document.querySelector('.caption.clearfix h4');
var chapterName = document.querySelectorAll('.fr-view p');

function addToggleButton(elem) {
	if (elem) {
		elem.style.display = 'none';
		
		var element = document.createElement("input");
		element.classList.add('xktitle');
		element.style.backgroundColor = '#5b5b5b';
		element.type = 'button';
		element.value = 'Show';
		element.onclick = function() { // Note this is a function
			if (elem.style.display === 'none') {
				elem.style.display = 'inline-block';
				element.value = 'Hide';
			} else {
				elem.style.display = 'none';
				element.value = 'Show';
			}
		};

		//elem.parentNode.appendChild(element);
		elem.parentNode.insertBefore(element, elem.nextSibling);
	}
}

addToggleButton(chapterTitle);
if (chapterName[0].innerText.indexOf('hapter') !== -1) {
	addToggleButton(chapterName[0]);
} else if (chapterName[1].innerText.indexOf('hapter') !== -1) {
	addToggleButton(chapterName[1]);
}


var xakyup = {};
onkeydown = onkeyup = function(e) {
	xakyup[e.keyCode] = e.type == 'keydown';
	
	if (xakyup[17] && xakyup[38]) {
		document.querySelectorAll('.xktitle').forEach(function(el) { el.previousElementSibling.style.display = 'none'; el.value = 'Show'; } );
    } else if (xakyup[17] && xakyup[40]) {
		document.querySelectorAll('.xktitle').forEach(function(el) { el.previousElementSibling.style.display = 'inline-block'; el.value = 'Hide'; } );
    }
	if (e.keyCode !== 17 && e.keyCode !== 38 && e.keyCode !== 40) {
		xakyup = {};
	}
}





