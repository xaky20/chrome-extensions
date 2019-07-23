//document.querySelectorAll('script').forEach(div => div.remove());
document.querySelectorAll('iframe').forEach(div => div.remove());

setTimeout(function() {
	document.getElementById('bottom-banner-ads').remove();
	console.log('Remove anti-addblock popup');
	xaky_select = document.querySelector('._2d0an.lefgy select'); // In case it wasn't here yet
}, 1000);
//document.getElementById('bottom-banner-ads').remove();
//console.log('Anti-addblock popups');

var popup = document.querySelectorAll('.NDm_P');
var popupRemover = function() {
	popup = document.querySelectorAll('.NDm_P');
	if (popup.length) {
		popup.forEach(div => div.remove());
	}
}
document.addEventListener("scroll", popupRemover);

var antiAddblockPopup = document.querySelector('.dG1Ln-2i-1-');
var checkExist = setInterval(function() {
	antiAddblockPopup = document.querySelector('.dG1Ln-2i-1-');
	console.log('No anti-addblock');
	if (antiAddblockPopup) {
		antiAddblockPopup.remove();
		console.log('Remove bottom anti-addblock div');
		clearInterval(checkExist);
	}
}, 500);

function xkevent(node, eventType) {
	if (node) {
		var event = node.ownerDocument.createEvent('HTMLEvents');
		event.initEvent(eventType, true, false);
		event.synthetic = true;
		node.dispatchEvent(event);
	} else {
		console.log('node is null');
	}
}

//var xaky_bottom_next = document.querySelector('._10-dY');

var xaky_select = document.querySelector('._2d0an.lefgy select');

var xakyup = {};
onkeydown = onkeyup = function(e) {
	xakyup[e.keyCode] = e.type == 'keydown';
	//console.log(xakyup);
	
	if (xakyup[17] && xakyup[39]) {
		console.log('CTRL + ->');
		xaky_select.options[xaky_select.selectedIndex-0+1].selected = true;
		xkevent(xaky_select, 'change');
    } else if (xakyup[17] && xakyup[37]) {
		console.log('CTRL + <-');
		xaky_select.options[xaky_select.selectedIndex-1].selected = true;
		xkevent(xaky_select, 'change');
    }
	if (e.keyCode !== 17 && e.keyCode !== 39 && e.keyCode !== 37) {
		//console.log('reset');
		xakyup = {};
	}
}
