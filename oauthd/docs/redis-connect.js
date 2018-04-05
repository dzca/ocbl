
  redis: {
    password: '123456'
  },

  // ==============================================================
  // initial redis connections
  // Note: set an idle timeout for all clients on the redis server.
  // we don't handle close redis connections here due to the complexity
  // of async node event loop
  // tips:
  // only need one connection to redis for server, need to close it if
  // server ever stops. Server just runs as a single process. connection
  // closed when server process exit or crash
  // ==============================================================
  const redis = require('./lib/cache')
  redis.onAsync('connect').then(function() {
    console.log('redis connected...')
    log.info('redis connected...')
  }).catch((err) => {
    console.log('redis connection error ' + err)
    log.info('redis connection error ' + err)
  });
