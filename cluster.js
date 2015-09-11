var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
	console.log('cluster master is running ', process.pid);
	for (var i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on('exit', function (worker) {
		console.log('worker: ' + worker.process.pid + ' just died');
		console.log('restarting worker');
		cluster.fork();
	});
} else {
	console.log('cluster worker is running ' + process.pid);
	require('./server').listen(3000);
}