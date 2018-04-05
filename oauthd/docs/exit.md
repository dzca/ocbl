https://stackoverflow.com/questions/14031763/doing-a-cleanup-action-just-before-node-js-exits/14032965#14032965

https://nodejs.org/api/process.html

function exitHandler(options, err) {
    if (options.cleanup) console.log('clean');
    if (err) console.log(err.stack);
    if (options.exit) process.exit();
}

//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));


//=====================================================================
// Handle exit events
// Signal events will be emitted when the Node.js process receives
// a signal. https://nodejs.org/api/process.html
//=====================================================================

// Begin reading from stdin so the process does not exit.
process.stdin.resume();

// process.on('SIGINT', () => {
//   console.log('Received SIGINT.  Press Control-D to exit.');
// });

// Using a single function to handle multiple signals
function handle(signal) {
  console.log('clean');
  process.exit();
}


//do something when app is closing
process.on('exit', handle)
//catches ctrl+c event
process.on('SIGINT', handle)
//
// process.on('SIGTERM', handle)
// catches "kill pid" (for example: nodemon restart)
// SIGUSR1 - debugger
//process.on('SIGUSR1', handle)
//process.on('SIGUSR2', handle)

//catches uncaught exceptions
process.on('uncaughtException', handle)
