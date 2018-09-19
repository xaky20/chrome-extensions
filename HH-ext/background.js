chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	var last_connected;
	alert('request');
	console.log('Request type: ' + request.type);
    if (request.type == 'get') {
		
		chrome.cookies.get({ url: 'https://www.hentaiheroes.com/', name: 'last_connected' },
			function (cookie) {
				if (cookie) {
					last_connected = cookie.value;
					console.log(cookie.value);
				} else {
					last_connected = true;
					console.log('No last_connected cookie found! Set to true.');
				}
		
				sendResponse({ last_connected: last_connected });
		});
		
	} else if (request.type == 'set') {
		
		chrome.cookies.set({ url: 'https://www.hentaiheroes.com/', name: 'last_connected', request.value: value, path: '/', sameSite: 'strict' },
			function () {
				console.log('last_connected cookie saved with value ' + request.value);
		
				sendResponse({ last_connected: value });
		});
		
	} else {
		console.log('Unexpected request');

		sendResponse({ last_connected: true });
	}
	
	return true;
});
