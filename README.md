# glassjs
jQuery library for window resize events.
[Download](https://github.com/derekborland/glassjs/blob/master/src/glass.js)

#### init
```
glass();
```

#### defaults
```
var DEFAULTS = {
	'sm': [0, 768],
	'med': [769, 1024],
	'lrg': [1025] 
};
```

#### init with custom breakpoints
```
glass({
	'xsm': [0, 768],
	'sm': [769, 992],
	'med': [993, 1200],
	'lrg': [1200]
});
```

#### listen for events
```
$(window).on('glass.sm', function(){
	// window width in range: [769, 992]
	...
});
```