(function () {
	'use strict';

	
	function getSourcePath() {
		// If accessed via addyosmani.github.com/todomvc/, strip the project
		// path.
		if (location.hostname.indexOf('github.com') > 0) {
			return location.pathname.replace(/todomvc\//, '');
		}
		return location.pathname;
	}

    
	function appendSourceLink() {
		var sourceLink = document.createElement('a');
		var paragraph = document.createElement('p');
		var footer = document.getElementById('info');
		var urlBase = 'https://github.com/addyosmani/todomvc/tree/gh-pages';

		if (footer) {
			sourceLink.href = urlBase + getSourcePath();
			sourceLink.appendChild(document.createTextNode('Check out the source'));
			paragraph.appendChild(sourceLink);
			footer.appendChild(paragraph);
		}
	}

	function redirect() {
		if (location.hostname === 'addyosmani.github.com') {
			location.hostname = 'todomvc.com';
		}
	}

	// appendSourceLink();
	redirect();
})();
