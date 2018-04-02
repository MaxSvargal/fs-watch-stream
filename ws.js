const WebSocket = require('ws')
const fsWatchStream = require('./index')

const wss = new WebSocket.Server({ port: 8081 })

fsWatchStream([
  { pm2: '/Users/maxsvargal/.pm2/pm2.log' },
  { signaller: '/Users/maxsvargal/.pm2/logs/Signaller-out-3.log' }
], (err, res) => {
  if (err) throw err
  wss.clients.forEach(client => client.send(res))
})
