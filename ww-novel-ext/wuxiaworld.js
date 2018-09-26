/* jQuery
var rowDivs = $('.row').children('div');
rowDivs[0].classList.remove('col-lg-9');
rowDivs[0].classList.remove('col-md-8');
rowDivs[0].classList.add('col-12');
console.log('content full-width');
rowDivs[1].remove();
console.log('sidebar removed');
$('.panel').css('font-size','18px');*/

/* javascript (no jQuery) */
var rowDivs = document.querySelector('.row').children;
rowDivs[0].classList.remove('col-lg-9');
rowDivs[0].classList.remove('col-md-8');
rowDivs[0].classList.add('col-12');
console.log('content full-width');
rowDivs[1].remove();
console.log('sidebar removed');
var panels = document.querySelectorAll('.panel');
/*if (panels.length > 4) {
	panels[0].remove();
	console.log('top panel removed');
}
while (panels.length > 4) {
	panels[0].remove();
}*/
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
var chapterName = document.querySelectorAll('.fr-view p')[0];

function addToggleButton(elem) {
	elem.style.display = 'none';
	
	var element = document.createElement("input");
	element.type = 'button';
	element.value = 'show';
	element.onclick = function() { // Note this is a function
		if (elem.style.display === 'none') {
			elem.style.display = '';
			element.value = 'hide';
		} else {
			elem.style.display = 'none';
			element.value = 'show';
		}
	};

	//elem.parentNode.appendChild(element);
	elem.parentNode.insertBefore(element, elem);
}

if (chapterName.innerText.indexOf('hapter') !== -1) {
	addToggleButton(chapterName);
}
addToggleButton(chapterTitle);
