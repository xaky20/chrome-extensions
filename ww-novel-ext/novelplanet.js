var el = document.getElementById('divReadContent');
if (el) {
	el.style.fontSize = '1.4em';
	console.log('font-size to 1.4em');
	document.querySelectorAll('#divReadContent > div').forEach(d=>d.remove());
}

var aButtonSmall = document.querySelectorAll("a.button.small");
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