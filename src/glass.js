/**
 * glassjs - jQuery library to run js within certain breakpoints.
 * @version v0.1.0
 * @link https://github.com/derekborland/glassjs#readme
 * @license MIT
 */
;(function($, window) {
	
	var $win;
	var windowWidth;
	var lastEvent;
	
	var DEFAULTS = {
		'sm': [0, 767],
		'med': [768, 1023],
		'lrg': [1024]
	};
	
	var DEFAULT_DEBOUNCE_TIME = 400;
	
	function Glass(options, debounceTime) {
		$win = $(window);
		
		// allow setting of debounceTime only
		if(typeof options === 'number') {
			debounceTime = options;
			options = DEFAULTS;
		} else {
			options = options || DEFAULTS;
			debounceTime = debounceTime || DEFAULT_DEBOUNCE_TIME;
		}
		
		// debounce
		function debounce(func, wait) {
			var timeout;
			return function() {
				var ctx = this,
						args = arguments;
				var later = function() {
					timeout = null;
					func.apply(ctx, args);
				}
				clearTimeout(timeout);
				timeout = setTimeout(later, wait);
			};
		}
		
		// [768, 1023]
		function inRange(options, key, windowWidth) {
			return options[key].length === 2 && windowWidth >= options[key][0] && windowWidth <= options[key][1];
		}
		
		// [1024]
		function aboveRange(options, key, windowWidth) {
			return options[key].length === 1 && windowWidth >= options[key][0];
		}
		
		function triggerBreak(windowWidth) {
			for(var key in options) { 				
				if( inRange(options, key, windowWidth) || aboveRange(options, key, windowWidth) ) {
					if(lastEvent === key) return;
					lastEvent = key;
					$win.trigger('glass.' + key, [windowWidth]);
				}
			}
		}
		
		// window resize event
		$win.resize(debounce(function() { triggerBreak($win.width()); }, debounceTime));
		
		// doc ready
		$(function(){ triggerBreak($win.width()); });
	};
	
	// @todo remove jQuery dep
	window.glass = Glass;
	
})(jQuery, window);
