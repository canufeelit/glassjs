/**
 * glassjs - jQuery library for window resize events.
 * @version v0.0.1
 * @link https://github.com/derekborland/glassjs#readme
 * @license MIT
 */
;(function($, window) {
	
	var $win;
	var options;
	var windowWidth;
	var lastEvent;
	var debounceTime = 400;
	
	var DEFAULTS = {
		'sm': [0, 768],
		'med': [769, 1024],
		'lrg': [1025] 
	};
	
	function Glass(options) {
		$win = $(window);
		
		if(!options) options = DEFAULTS;
		if(options) options = $.extend({}, DEFAULTS, options);
		
		// debounce
		function debounce(func, wait, immediate) {
			var timeout;
			return function() {
				var context = this, args = arguments;
				var later = function() {
					timeout = null;
					if(!immediate) func.apply(context, args);
				}
				var callNow = immediate && !timeout;
				clearTimeout(timeout);
				timeout = setTimeout(later, wait);
				if(callNow) func.apply(context, args);
			};
		}
		
		// window resize event
		$win.resize(debounce(function() {
			windowWidth = $win.width();
			for(var key in options) { 
				
				if(options[key].length === 2 && windowWidth >= options[key][0] && windowWidth <= options[key][1]) {
					if(lastEvent === key) return;
					lastEvent = key;
					$win.trigger('glass.' + key, [windowWidth]);
				}
				
				if(options[key].length === 1 && windowWidth >= options[key][0]) {
					if(lastEvent === key) return;
					lastEvent = key;
					$win.trigger('glass.' + key, [windowWidth]);
				}
				
			}
		}, debounceTime));
		
	};
	
	window.glass = Glass;
	
})(jQuery, window);
