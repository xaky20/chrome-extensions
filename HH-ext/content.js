console.log('HH-ext activated');
console.log(window.location.href);

var xkmap = {};

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

function myRandom(name, min, max) {
	var timer = Math.floor(Math.random() * (max - min + 1)) + min;
	console.log(name + ' timer: ' + timer);
    return timer;
}

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

var xkHomeTimeout = setTimeout(function() {
	window.location = '/intro.php?phoenix_member=logout';
}, myRandom('logout', 450000, 900000));

function resetXKHomeTimeout() {
	clearTimeout(xkHomeTimeout);
	var xkHomeTimeout = setTimeout(function() {
		window.location = '/intro.php?phoenix_member=logout';
	}, myRandom('logout', 450000, 900000));
}

function setXKVariable(xkname, xkvalue, callback) {
	xkmap[xkname] = xkvalue;
	chrome.storage.sync.set(xkmap, function() {
		console.log('Set variable ' + xkname + ' to ' + xkvalue);
		if (callback) {
			callback();
		}
	});
}

function getXKVariable(xkname, callback) {
	chrome.storage.sync.get(xkname, function(item) {
		xkmap[xkname] = item[xkname];
		console.log('Got variable ' + xkname + ' with value ' + xkmap[xkname]);
		if (callback) {
			callback();
		}
	});
}

function setXKFight(xkworld, xkfight, xkmin) {
	setXKVariable('XKWORLD', xkworld);
	setXKVariable('XKFIGHTENERGY', xkfight);
	setXKVariable('XKMINENERGY', xkmin);
}

function getXKFightVariables() {
	getXKVariable('XKWORLD', function() {
		if (!xkmap['XKWORLD']) {
			setXKVariable('XKWORLD', 10);
		}
	});
	getXKVariable('XKFIGHTENERGY', function() {
		if (!xkmap['XKFIGHTENERGY']) {
			setXKVariable('XKFIGHTENERGY', 18);
		}
	});
	getXKVariable('XKMINENERGY', function() {
		if (!xkmap['XKMINENERGY']) {
			setXKVariable('XKMINENERGY', 15);
		}
	});
}

function getXKSwitch(callback) {
	getXKVariable('XKSWITCH', function() {
		if (typeof xkmap['XKSWITCH'] === 'undefined') {
			setXKVariable('XKSWITCH', false);
		}
		if (callback) {
			callback();
		}
	});
}

function createXKVariableForm() {
	
	function createXKTrollMenu() {
		var xkstyle = document.createElement('style');
		xkstyle.appendChild(document.createTextNode('\n#xkFightTroll {'
		+ 'position: absolute;'
		+ 'z-index: 99;'
		+ 'width: 60%;'
		+ 'left: 50px;'
		+ 'margin: 5px 0 0 13px;'
		+ 'border-radius: 8px 10px 10px 8px;'
		+ 'background: rgba(0,0,0,0.8);'
		+ 'box-shadow: 0 0 0 1px rgba(255,255,255,0.73);'
		+ 'font-size: 13px;'
		+ 'text-align: center; }'
		
		+ '\n#xkFightTroll > .xkarrow {'
		+ 'float:right;'
		+ 'background-image: url("https://i.harem-battle.club/images/2017/09/19/Fmo.png");'
		+ 'background-size: 18px 18px;'
		+ 'background-repeat: no-repeat;'
		+ 'width: 18px;'
		+ 'height: 18px; }'
		
		+ '\n#xkFightTroll > .xkTrollMenu {'
		+ 'position: absolute;'
		+ 'width: 88%;'
		+ 'margin-left:6px;'
		+ 'border-radius: 0px 0 8px 8px;'
		+ 'background: rgba(0,0,0,0.8);'
		+ 'line-height: 15px;'
		+ 'opacity: 0;'
		+ 'visibility: hidden;'
		+ 'transition: opacity 400ms, visibility 400ms; }'
		
		+ '\n#xkFightTroll:hover > .xkTrollMenu {'
		+ 'opacity: 1;'
		+ 'visibility: visible; }'
		
		+ '\n#xkFightTroll a {'
		+ 'color: rgb(255, 255, 255);'
		+ 'text-decoration: none; }'
		
		+ '\n#xkFightTroll a:hover {'
		+ 'background: rgba(0,0,0,0.7);'
		+ 'color: rgb(255, 247, 204);'
		+ 'text-decoration: underline; }'));
		document.head.appendChild(xkstyle);

		var xktrolldiv = document.createElement('div');
		xktrolldiv.id = 'xkFightTroll';
		xktrolldiv.innerHTML = 'Fight a troll';
		
		var xkspan = document.createElement('span');
		xkspan.classList.add('xkarrow');
		xktrolldiv.appendChild(xkspan);
		
		var xkinnerdiv = document.createElement('div');
		xkinnerdiv.classList.add('xkTrollMenu');
		
		var Trolls = ['Dark Lord', 'Ninja Spy', 'Gruntt', 'Edwarda', 'Donatien', 'Silvanus', 'Bremen', 'Finalmecia', 'Roko Senseï'];

		for (var i = 0; i < Trolls.length; i++) {
			var xka = document.createElement('a');
			xka.href = '/battle.html?id_troll=' + (i+1);
			xka.innerHTML = Trolls[i];
			xkinnerdiv.appendChild(xka);
			xkinnerdiv.append(document.createElement('br'));
		}
		
		xktrolldiv.appendChild(xkinnerdiv);
		
		document.querySelector('#contains_all > header [type=energy_fight]').appendChild(xktrolldiv);
	}
	
	function createXKForm() {
		var xkdiv = document.createElement('div');
		xkdiv.id = 'xkdiv';
		xkdiv.style.position = 'absolute';
		xkdiv.style.bottom = '40px';
		xkdiv.style.right = '40px';
		xkdiv.style.padding = '15px';
		xkdiv.classList.add('base_block');
		xkdiv.style.zIndex = 400;

		var xkspan = document.createElement('span');
		xkspan.innerHTML = 'World: ';
		xkspan.style.color = '#000';
		xkdiv.appendChild(xkspan);

		var xkinput = document.createElement('input');
		xkinput.id = 'xkworld';
		xkinput.type = 'number';
		xkinput.style.marginRight = '5px';
		xkinput.min = 0;
		xkinput.max = 10;
		xkdiv.appendChild(xkinput);

		var xkspan = document.createElement('span');
		xkspan.innerHTML = 'Fight Energy: ';
		xkspan.style.color = '#000';
		xkdiv.appendChild(xkspan);

		var xkinput = document.createElement('input');
		xkinput.id = 'xkfightenergy';
		xkinput.type = 'number';
		xkinput.style.marginRight = '5px';
		xkinput.min = 0;
		xkinput.max = 10;
		xkdiv.appendChild(xkinput);

		var xkspan = document.createElement('span');
		xkspan.innerHTML = 'Min Energy: ';
		xkspan.style.color = '#000';
		xkdiv.appendChild(xkspan);

		var xkinput = document.createElement('input');
		xkinput.id = 'xkminenergy';
		xkinput.type = 'number';
		xkinput.style.marginRight = '5px';
		xkinput.min = 0;
		xkinput.max = 10;
		xkdiv.appendChild(xkinput);

		var xkinput = document.createElement('input');
		xkinput.id = 'xkapply';
		xkinput.type = 'button';
		xkinput.classList.add('green_text_button');
		xkinput.style.marginRight = '5px';
		xkinput.value = 'Apply';
		xkinput.addEventListener("click", function() {
			var xkWInput = document.getElementById('xkworld');
			var xkFEInput = document.getElementById('xkfightenergy');
			var xkMEInput = document.getElementById('xkminenergy');
			var xkW = xkWInput.value - 0;
			var xkFE = xkFEInput.value - 0;
			var xkME = xkMEInput.value - 0;
			if (xkW) {
				setXKVariable('XKWORLD', xkW);
				xkWInput.value = '';
			}
			if (xkFE) {
				setXKVariable('XKFIGHTENERGY', xkFE);
				xkFEInput.value = '';
			}
			if (xkME) {
				setXKVariable('XKMINENERGY', xkME);
				xkMEInput.value = '';
			}
		});
		xkdiv.appendChild(xkinput);

		var xkinput = document.createElement('input');
		xkinput.id = 'xkswitch';
		xkinput.type = 'button';
		xkinput.classList.add('blue_text_button');
		xkinput.style.marginRight = '5px';
		xkinput.value = 'Switch';
		xkinput.addEventListener("click", function() {
			setXKVariable('XKSWITCH', !xkmap['XKSWITCH'], function() {
				if (window.location.href.indexOf('/home.html') === -1) {
					window.location.reload();
				}
			});
		});
		xkdiv.appendChild(xkinput);

		var xkinput = document.createElement('input');
		xkinput.id = 'xkreset';
		xkinput.type = 'button';
		xkinput.classList.add('blue_text_button');
		xkinput.value = 'Reset Timeout';
		xkinput.addEventListener("click", function() {
			resetXKHomeTimeout();
		});
		xkdiv.appendChild(xkinput);

		document.body.appendChild(xkdiv);
	}
	
	createXKTrollMenu();
	createXKForm();
}

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


/*** HOME ***/
} else if (window.location.href.indexOf('/home.html') !== -1) {
	console.log('HOME');
	
	getXKSwitch();
	getXKFightVariables();
	
	createXKVariableForm();
	
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
		if (xkmap['XKWORLD']) {
			if (document.querySelector('.energy_counter[type="energy_fight"] span[energy]').innerText > xkmap['XKFIGHTENERGY']) {
				window.location = '/battle.html?id_troll='+(xkmap['XKWORLD']-1);
			}
		}
		// console.log('energy checked');
	}
	
	var checkFreeGame = function() {
		if (document.querySelector('.free_game')) {
			window.location = '/pachinko.html';
		}
	}
	
	var check_interval = function() {
		setTimeout(function() {
			checkCollect();
			if (!xkmap['XKSWITCH']) {
				checkArena();
				checkActivity();
				checkEnergy();
				checkFreeGame();
				console.log('Check done');
			} else {
				console.log('Money check done');
			}
			check_interval();
		}, myRandom('next check', 45000, 90000));
	}

	setTimeout(function() {
		checkCollect();
		if (!xkmap['XKSWITCH']) {
			checkArena();
			checkActivity();
			checkEnergy();
			checkFreeGame();
		}
		check_interval();
	}, myRandom('first check', 1500, 3000));
	
} else {
	createXKVariableForm();	
	getXKSwitch(function() {
		
		if (xkmap['XKSWITCH']) {
			console.log('HH-ext disabled');
			setTimeout(function() {
				window.location = '/home.html';
			}, myRandom('home', 300000, 600000));
		} else {
			doXKThings();
		}
	});
}

function doXKThings() {
		
/*** ARENA ***/
	if (window.location.href.indexOf('/arena.html') !== -1) {
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
		var troll = window.location.href.substring(window.location.href.lastIndexOf('=') + 1) - 0;
		console.log('TROLL BATTLE ' + troll);
		
		getXKFightVariables();
		
		setTimeout(function() {
			if (xkmap['XKWORLD'] === (troll + 1) && document.querySelector('.energy_counter[type="energy_fight"] span[energy]').innerText > xkmap['XKMINENERGY']) {
				setTimeout(function() {
					//document.querySelectorAll('button[rel="launch"]')[0].click();
					xkevent(document.querySelector('button[rel="launch"]'), 'click');
				}, myRandom('fight', 1000, 3000));
				
				setTimeout(function() {
					window.location = '/battle.html?id_troll='+(xkmap['XKWORLD']-1);
				}, myRandom('reload', 3000, 6000));
			} else {
				setTimeout(function() {
					window.location = '/home.html';
				}, myRandom('home', 6000, 9000));
			}
		}, 1500);
		
/*** WORLD ***/
	} else if (window.location.href.indexOf('/world/') !== -1) {
		console.log('WORLD ' + window.location.href.substring(window.location.href.lastIndexOf('/') + 1));
		
		getXKFightVariables();
		
		setTimeout(function() {
			if (document.querySelector('.energy_counter[type="energy_fight"] span[energy]').innerText > xkmap['XKFIGHTENERGY']) {
				setTimeout(function() {
					window.location = '/battle.html?id_troll='+(xkmap['XKWORLD']-1);
				}, myRandom('troll', 1000, 3000));
			} else {
				setTimeout(function() {
					window.location = '/home.html';
				}, myRandom('home', 3000, 7500));
			}
		}, 1500);
		
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
		
/*** TOWER OF FAME ***/
	} else if (window.location.href.indexOf('/tower-of-fame.html') !== -1) {
		console.log('TOWER OF FAME');
		
		var xaky_table = document.querySelectorAll('table')[5];
		if (xaky_table) {
			//check battle point
			var battlePoint = (document.querySelectorAll('span[energy]')[2].innerText-0) || 0;
			console.log('Challenge point: ' + battlePoint);
			var canBattle = false;
			var challenger, challengerFight;
			var i = xaky_table.rows.length;
			if (battlePoint > 0) {
				//choose challenger
				while (!canBattle) {
					i--;
					console.log(i);
					if (i < 0) {
						canBattle = true;
					} else {
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
						}
					}
				}
			}
		} else {
			var purpleButton = document.querySelector('.purple_button_L');
			if (purpleButton.display !== 'none') {
				xkevent(purpleButton, 'click');
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
			
/*** INTRO ***/
	} else if (window.location.href.indexOf('/intro') !== -1) {
		console.log('intro bugg ?');
		
		setTimeout(function() {
			window.location = '/home.html';
		}, myRandom('home', 6000, 9000));
	
/*** IF NOTHING ***/
	} else {
		if (!xkmap['XKSWITCH']) {
			setTimeout(function() {
				window.location = '/home.html';
			}, myRandom('home', 60000, 75000));
		}
	}
}



