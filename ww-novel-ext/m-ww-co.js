/** Some padding **/
var xaky_content = document.getElementById('chaptercontent');
xaky_content.style.padding = '50px';
console.log('Add padding');
xaky_content.style.fontSize = '1.6em';
console.log('font-size to 1.6em');


var xaky_next = document.getElementById("pt_next"),
	xaky_prev = document.getElementById("pt_prev");

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