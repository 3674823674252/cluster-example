module.exports = require('http').createServer(function (req, res) {
	if (req.url === '/') {
		console.log(process.pid + ' got this this request!');
		res.write('Hi');
		res.end();
	} else if (req.url === '/kill') {
		throw new Error('killing error for worker ' + process.pid);
	} else {
		res.status = 404;
		res.end();
	}
});