var forever = require('forever');

forever.start('./cluster.js', {
	'uid': 'forever-example',
	'max': 100,
	'sourceDir': './'
});

console.log('forever is running...');