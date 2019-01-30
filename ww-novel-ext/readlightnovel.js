document.querySelectorAll('script').forEach(function(s) { s.remove(); });
document.querySelectorAll('iframe').forEach(function(s) { s.remove(); });

document.querySelector('.content2').classList.remove('col-lg-8');
document.querySelector('.content2').classList.add('col-lg-12');
document.querySelector('.sidebar').remove();

document.querySelector('body').style.background = 'none';

document.querySelectorAll('.container').forEach(function(c) { c.style.border = '1px solid black'; });

var xaky_next = document.querySelector('a.next'),
	xaky_prev = document.querySelector('a.prev');

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
