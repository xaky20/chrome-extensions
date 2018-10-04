console.log('HH-ext activated');
console.log(window.location.href);


function myRandom(name, min, max) {
	var timer = Math.floor(Math.random() * (max - min + 1)) + min;
	console.log(name + ' timer: ' + timer);
    return timer;
}

function upgrade(number, times) {
	var i = 0;
	var interval = setInterval(function() {
		i++;
		console.log(i);
		//document.querySelector('div[hero="carac'+number+'"] span').click();
		xkevent(document.querySelector('div[hero="carac'+number+'"] span'), 'click');
		if (i>=times){
			clearInterval(interval);
		}
	}, 250);
}

function xkevent(node, eventType) {
	var event = node.ownerDocument.createEvent('HTMLEvents');
	event.initEvent(eventType, true, false);
	event.synthetic = true;
	node.dispatchEvent(event);
}

setTimeout(function() {
	//window.location = '/home.html';
	window.location = '/intro.php?phoenix_member=logout';
}, myRandom('logout', 450000, 900000));

//var WORLD = 3;
var login = document.querySelectorAll('a[rel="phoenix_member_login"]');

/*** LOGIN ***/
if (login.length !== 0) {
	console.log('LOGIN');
	
	//login[0].click();
	xkevent(login[0], 'click');
	var inputs = document.querySelectorAll('input');
	var last_connected;
	
	chrome.storage.sync.get('last_connected', function(item) {
		if (item) {
			last_connected = item.last_connected;
			//console.log('last_connected get value ' + last_connected);
		} else {
			last_connected = false;
			//console.log('last_connected set value ' + last_connected);
		}
		
		console.log('Connecting with email ' + last_connected ? '12024800@usherbrooke.ca' : 'six37v@hotmail.fr');
		inputs[0].value = last_connected ? '12024800@usherbrooke.ca' : 'six37v@hotmail.fr'; // 3F8C0AF5-E5B8-483D-A172-4309F19E3BD1   :   72C7F05B-3E52-4565-820F-F9CABC2F7449
		inputs[1].value = '02six37v';
		
		chrome.storage.sync.set({ 'last_connected': !last_connected}, function() {
			//console.log('last_connected saved with value ' + !last_connected);
			
			setTimeout(function() {
				//xkevent(document.querySelectorAll('.steel2.b_m')[0], 'click');
				document.querySelectorAll('.steel2.b_m')[0].click();
			}, myRandom('login', 500, 3000));
		});
	});
}

/*** HOME ***/
if (login.length === 0 && window.location.href.indexOf('/home.html') !== -1) {
	console.log('HOME');
	
	
	var checkCollect = function() {
		var collect = document.getElementById('collect_all');
		if (collect.style.display !== 'none') {
			//collect.click();
			xkevent(collect, 'click');
		}
		// console.log('collect checked');
	}
	
	var checkArena = function() {
		var notif1 = document.querySelectorAll('.collect_notif')[0].style.display;
		if (notif1 !== 'none') {
			window.location = '/arena.html';
		}
		// console.log('arena checked');
	}
	
	var checkActivity = function() {
		var notif2 = document.querySelectorAll('.collect_notif')[1].style.display;
		var bar1 = document.querySelectorAll('#home_missions_bar1')[0].style.display;
		var bar2 = document.querySelectorAll('#home_missions_bar2')[0].style.display;
		if (notif2 !== 'none' || (bar2 === 'none' && bar1 === 'none')) {
			window.location = '/activities.html';
		}
		// console.log('activity checked');
	}
	
	var checkEnergy = function() {
		if (typeof WORLD !== 'undefined') {
			if (document.querySelectorAll('span[hero="energy_fight"]')[0].innerText > 0) {
				window.location = '/world/'+WORLD;
			}
		}
		// console.log('energy checked');
	}
	
	var checkFreeGame = function() {
		if (document.querySelector('.free_game')) {
			window.location = '/pachinko.html';
		}
	}
	
	/*var check_interval = setInterval(function() {
			checkCollect();
			checkArena();
			checkActivity();
			checkEnergy();
			checkFreeGame();
			console.log('Check done');
		}, myRandom(15000, 75000));*/
		
	var check_interval = function() {
		setTimeout(function() {
			checkCollect();
			checkArena();
			checkActivity();
			checkEnergy();
			checkFreeGame();
			console.log('Check done');
			check_interval();
		}, myRandom('next check', 45000, 90000));
	}

	setTimeout(function() {
		checkCollect();
		checkArena();
		checkActivity();
		checkEnergy();
		checkFreeGame();
		check_interval();
	}, myRandom('first check', 500, 3000));
	
/*** ARENA ***/
} else if (window.location.href.indexOf('/arena.html') !== -1) {
	console.log('ARENA');
	
	var blueButtons = document.querySelectorAll('button.blue_text_button');
	if (blueButtons[1].id === 'cancel_team') {
		setTimeout(function() {
			//window.location = '/intro.php?phoenix_member=logout'; infinite logout
			window.location = '/tower-of-fame.html';
		}, myRandom('towerOfFame', 1000, 3000));
	} else {
		setTimeout(function() {
			//blueButtons[1].click();
			xkevent(blueButtons[1], 'click');
		}, myRandom('arena battle', 1000, 3000));
	}
	
	setTimeout(function() {
		window.location = '/arena.html';
	}, myRandom('arena', 6000, 12000));
	
/*** ARENA BATTLE ***/
} else if (window.location.href.indexOf('/battle.html?id_arena') !== -1) {
	console.log('ARENA BATTLE');
	
	setTimeout(function() {
		//document.querySelectorAll('button[rel="launch"]')[0].click();
		xkevent(document.querySelector('button[rel="launch"]'), 'click');
	}, myRandom('fight', 1000, 4500));
	
	setTimeout(function() {
		window.location = '/arena.html';
	}, myRandom('arena', 4500, 9000));
	
/*** ACTIVITY ***/
} else if (window.location.href.indexOf('/activities.html') !== -1) {
	console.log('ACTIVITY');
	
	var blueButtons = document.querySelectorAll('button.blue_text_button');
	var purpleButtons = document.querySelectorAll('button.purple_text_button');
	
	var claim = function() {
		var purpleButtons = document.querySelectorAll('button.purple_text_button');
		for(var i = 0; i < purpleButtons.length; i++){
			if (purpleButtons[i].style.display !== 'none') {
				//purpleButtons[i].click();
				xkevent(purpleButtons[i], 'click');
				setTimeout(function() {
					window.location = '/activities.html';
				}, myRandom('activities', 1500, 4500));
			}
		}
		
		setTimeout(function() {
			window.location = '/home.html';
		}, myRandom('home', 4500, 10500));
	}
	
	if (blueButtons[0].innerText.indexOf('Continue') !== -1) {
		if (document.querySelector('.after_gift').style.display !== 'block') {
			setTimeout(function() {
				//document.querySelector('.end_gift button').click();
				xkevent(document.querySelector('.end_gift button'), 'click');
			}, myRandom('end gift', 1000, 3000));
			setTimeout(function() {
				window.location = '/activities.html';
			}, myRandom('activities', 3000, 5000));
		} else {
			claim();
		}
	} else {
		if (blueButtons[0].style.display === 'none') {
			claim();
		} else {
			setTimeout(function() {
				//blueButtons[0].click();
				xkevent(blueButtons[0], 'click');
			}, myRandom('mission start', 1000, 3000));
			setTimeout(function() {
				window.location = '/intro.php?phoenix_member=logout';
				//window.location = '/home.html';
			}, myRandom('logout', 3000, 6000));
		}
	}
	
/*** TROLL BATTLE ***/
} else if (window.location.href.indexOf('/battle.html?id_troll') !== -1) {
	console.log('TROLL BATTLE');
	
	if (typeof WORLD !== 'undefined') {
		setTimeout(function() {
			//document.querySelectorAll('button[rel="launch"]')[0].click();
			xkevent(document.querySelector('button[rel="launch"]'), 'click');
		}, myRandom('fight', 1000, 3000));
		
		setTimeout(function() {
			window.location = '/world/'+WORLD;
		}, myRandom('world', 3000, 6000));
	} else {
		setTimeout(function() {
			window.location = '/home.html';
		}, myRandom('home', 6000, 12000));
	}
	
/*** WORLD ***/
} else if (typeof WORLD !== 'undefined' && window.location.href.indexOf('/world/'+WORLD) !== -1) {
	console.log('WORLD ' + WORLD);
	
	if (document.querySelectorAll('span[hero="energy_fight"]')[0].innerText > 0) {
		setTimeout(function() {
			window.location = '/battle.html?id_troll='+(WORLD-1);
		}, myRandom('troll', 1000, 3000));
	} else {
		setTimeout(function() {
			window.location = '/home.html';
		}, myRandom('home', 3000, 7500));
	}
	
/*** FREE PACHINKO ***/
} else if (window.location.href.indexOf('/pachinko.html') !== -1) {
	console.log('FREE PACHINKO');
	
	if (document.querySelector('button.blue_text_button[free="1"]')) {
		setTimeout(function() {
			//document.querySelector('button.blue_text_button[free="1"]').click();
			xkevent(document.querySelector('button.blue_text_button[free="1"]'), 'click');
		}, myRandom('free', 5000, 8000));
	}
	setTimeout(function() {
		window.location = '/home.html';
	}, myRandom('home', 8000, 12000));
	
/*** INTRO ***/
} else if (window.location.href.indexOf('/intro') !== -1) {
	console.log('intro bugg ?');
	
	setTimeout(function() {
		window.location = '/home.html';
	}, myRandom('home', 6000, 9000));
	
/*** TOWER OF FAME ***/
} else if (window.location.href.indexOf('/tower-of-fame.html') !== -1) {
	console.log('TOWER OF FAME');
	
	//check battle point
	var battlePoint = (document.querySelectorAll('span[energy]')[2].innerText-0) || 0;
	console.log('Challenge point: ' + battlePoint);
	var xaky_table = document.querySelectorAll('table')[5];
	var canBattle = false;
	var challenger, challengerFight;
	var i = -1;
	if (battlePoint > 0) {
		//choose challenger
		while (!canBattle) {
			i++;
			console.log(i);
			if (i = 100) {
				break;
			}
			challenger = xaky_table.rows[i];
			challengerFight = challenger.cells[3].innerText[0] - 0;
			if (!challengerFight.isNaN && challengerFight < 3) {
				canBattle = true;
				//xaky_table.rows[i].click();
				xkevent(xaky_table.rows[i], 'click');
				setTimeout(function() {
					//document.querySelector('.blue_button_L').click();
					xkevent(document.querySelector('.blue_button_L'), 'click');
				}, myRandom('challengeTower', 500, 1000));
				break;
			}
		}
		
	}
	
	setTimeout(function() {
		window.location = '/home.html';
	}, myRandom('home', 6000, 12000));
	
/*** LEAGUE BATTLE ***/
} else if (window.location.href.indexOf('/battle.html?league_battle') !== -1) {
	console.log('LEAGUE BATTLE');
	
	setTimeout(function() {
		var xknode = document.querySelector('button[rel="launch"]');
		xkevent(xknode, 'click');
	}, myRandom('home', 1000, 3000));
	
	setTimeout(function() {
		window.location = '/tower-of-fame.html';
	}, myRandom('towerOfFame', 3000, 6000));
	
/*** NO EXTENSION ***/
} else if (window.location.href === 'https://www.hentaiheroes.com/') {
	console.log('GO TO HOME');
	
	setTimeout(function() {
		window.location = '/home.html';
	}, myRandom('home', 1000, 3000));
	
/*** IF NOTHING ***/
} else {
	setTimeout(function() {
		window.location = '/home.html';
	}, myRandom('home', 60000, 75000));
}



