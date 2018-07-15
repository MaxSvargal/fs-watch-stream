# fs-watch-stream
#### The NodeJs library that watch for changes of sets of files and stream out their differences. It usable, for example, for streaming server logs to browser in real time.

### Type definition:
```typescript
type fsWatchStream = (
  filesList: { [string]: string }[],
  callback: (err: Error, res: string) => void
) => void
```

## Example with web sockets
```javascript
const fsWatchStream = require('fs-watch-stream')
const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8080 })

fsWatchStream([
  { system: '/var/log/system.log' },
  { wifi: '/var/log/wifi.log' }
], (err, res) => {
  if (err) throw err
  wss.clients.forEach(client => client.send(res))
})
```
