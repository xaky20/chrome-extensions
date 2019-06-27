var sidebar = document.getElementById('secondary');
if (sidebar) {
	sidebar.remove();
	console.log('sidebar removed');
}
var content = document.getElementById('content');
if (content) {
	content.style.width = '100%';
	console.log('content width 100%');
	content.style.fontSize = '1.2em';
	console.log('font-size to 1.2em');
}

var xaky_next = document.querySelector('.alignright a'),
	xaky_prev = document.querySelector('.alignleft a');

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