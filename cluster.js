var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
	console.log('cluster master is running ', process.pid);
	for (var i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on('exit', function (worker) {
		console.log('worker: ' + worker.process.pid + ' just died');
		// cluster.fork(); - let's see if forever does its work
	});
} else {
	console.log('cluster worker is running ' + process.pid);
	require('./server').listen(3000);
}
// 6 processes = forever + master + 4 workers
// 5 processes = forever + master + 3 workers
// 4 processes = forever + master + 2 workers
// 3 processes = forever + master + 1 worker, still should be serving requests, let's see.. it does
// forever restarted after last worker died, all should be working, let's see.. it does
// let's kill all workers altoghether

// it just seems that when the last worker dies, the master dies as well, let's see..

// kill queue: 1623 1622 1621 1620 -> after 1620 is killed 1619 should also get killed, let's see

// that's it, when the last worker dies master in cluster dies as well -> and only that triggers forever to restart the script
// we wanted to prove that forever doesn't know and doesn't care about cluster workers, and we did so.
// cool