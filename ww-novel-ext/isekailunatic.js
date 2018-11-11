
var sec = document.getElementById('secondary');
if (sec) {
	sec.remove();
	console.log('secondary removed');
}
var ter = document.getElementById('tertiary');
if (ter) {
	ter.remove();
	console.log('tertiary removed');
}
var main = document.getElementById('main');
if (main) {
	main.style.width = '100%';
	console.log('main width 100%');
}

var entry = document.querySelectorAll('.entry-content p');
if (entry.length !== 0) {
	entry.forEach(function(el) { el.style.fontSize = '1.4em'; } );
	console.log('font-size to 1.4em');
}

function addToggleButton(elem) {
	if (elem) {
		elem.style.display = 'none';
		
		var element = document.createElement("input");
		element.classList.add('xktitle');
		element.type = 'button';
		element.value = 'Show Comments';
		element.onclick = function() { // Note this is a function
			if (elem.style.display === 'none') {
				elem.style.display = 'block';
				element.value = 'Hide Comments';
			} else {
				elem.style.display = 'none';
				element.value = 'Show Comments';
			}
		};

		elem.parentNode.insertBefore(element, elem);
	}
}

var comments = document.querySelector('.comment-list');
addToggleButton(comments);


var aButtonSmall = document.querySelectorAll('.entry-content p a');
var xaky_next = aButtonSmall[1],
	xaky_prev = aButtonSmall[0];

var xakyup = {};
onkeydown = onkeyup = function(e) {
	xakyup[e.keyCode] = e.type == 'keydown';
	//console.log(xakyup);
	
	if (xakyup[17] && xakyup[39]) {
		console.log('CTRL + ->');
		window.location.href = xaky_next.href;
    }else if (xakyup[17] && xakyup[37]) {
		console.log('CTRL + <-');
		window.location.href = xaky_prev.href;
    }
	if (e.keyCode !== 17 && e.keyCode !== 39 && e.keyCode !== 37) {
		//console.log('reset');
		xakyup = {};
	}
}





