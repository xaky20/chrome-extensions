//document.querySelectorAll('script').forEach(div => div.remove());
document.querySelectorAll('iframe').forEach(div => div.remove());

var xkWidth = '800px',
	setWidth = function(newWidth) { xkWidth = newWidth; },
	toggleWidth = function() {
			console.log('CSS TOGGLED');
			var sdiv = document.getElementById('xkStyle');
			if (xkStyle.innerHTML) {
				sdiv.innerHTML = '';
			} else {
				sdiv.innerHTML = 'figure > canvas {	width: ' + xkWidth + '!important;}';
			}
		};

setTimeout(function() {
	// Remove bottom-banner-ads
	var BBA = document.getElementById('bottom-banner-ads');
	if (BBA) {
		BBA.remove();
		console.log('Remove anti-addblock popup');
	}
	
	// Set xaku_select in case it wasn't here yet
	xaky_select = document.querySelector('._2d0an.lefgy select');
	
	// Set toggle button
	var div = document.createElement('style');
	div.id = 'xkStyle';
	document.head.appendChild(div);

	var topBar = document.querySelector('._1UwHa');
	if (topBar) {
		var xkToggle = document.createElement('button');
		topBar.appendChild(xkToggle);
		xkToggle.outerHTML = '<button id="xkToggle" class="mdl-button mdl-js-button mdl-js-ripple-effect _3UlfA" data-upgraded=",MaterialButton,MaterialRipple"><div class="_34znY"><span>Toggle</span></div><span class="mdl-button__ripple-container"><span class="mdl-ripple"></span></span></button>';

		document.getElementById('xkToggle').addEventListener("click", toggleWidth);
	}

}, 1000);

// Remove ads popup as we scroll down
var popup = document.querySelectorAll('.NDm_P');
var popupRemover = function() {
	popup = document.querySelectorAll('.NDm_P');
	if (popup.length) {
		popup.forEach(div => div.parentElement.parentElement.remove());
	}
}
document.addEventListener("scroll", popupRemover);

// Remove anti-addblock popup (which appear after a few seconds)
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
