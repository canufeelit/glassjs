# glassjs
jQuery library to run js within certain breakpoints.
[Download](https://github.com/derekborland/glassjs/blob/master/src/glass.js)

#### init
```
glass();
```

#### init with custom debounce time
*default = 400*
```
glass(1000);
```

#### default breakpoints
```
var DEFAULTS = {
	'sm': [0, 767],
	'med': [768, 1023],
	'lrg': [1024]
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

#### init with custom breaks & debounce time
```
glass({
	...
}, 1000);
```

#### listen for events
*event fires once on entry of breakpoint*
```
$(window).on('glass.sm', function(){
	// window width in range: [769, 992]
	...
});
```