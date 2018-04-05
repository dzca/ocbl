```
	var service = {
			users : [],
			roles : [],
			key: 'user-list',
	};

	/**
	 * save JTW token as a string to browser local storage
	 */
	service.saveToken = function(value){
		localStorage.setItem(cfgService.token_key, JSON.stringify(value));
	}

	/**
	 * load JTW token as an object from browser local storage
	 */
	service.getToken = function() {
		return localStorage.getItem(cfgService.token_key);
	}

	/**
	 * if user is authenticated, return username, other wise, return null
	 *
	 * payload example:
	 * {
	 * "username": "luke",
	 * "iat": 1489609013,
	 * "exp": 1489610813
	 * }
	 */
	service.getUser = function() {
		if (service.isAuthenticated()) {
			var token = service.getToken();
			// parse the payload
			var payload = JSON.parse($window.atob(token.split('.')[1]));
			return payload.username;
		} else {
			return null;
		}
	};

	/**
	 * check if token is expired or invalid
	 */
	service.isAuthenticated = function() {
		var token = service.getToken();
		console.log('in service.isAuthenticated token=' + token);

		if (token && token != 'undefined') {
			var payload = JSON.parse($window.atob(token.split('.')[1]));
			console.log('in service.isAuthenticated payload={0}', payload);
			return payload.exp > Date.now() / 1000;
		} else {
			return false;
		}
	};
```
