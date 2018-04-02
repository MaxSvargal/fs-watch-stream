const { watchFile, createReadStream } = require('fs')

const objKey = (obj) => Object.keys(obj)[0]
const objValue = (obj) => Object.values(obj)[0]

const readFile = ({ file, start, end }) =>
  new Promise((resolve, reject) => {
    const stream = createReadStream(file, { start, end })
    stream.on('data', resolve)
    stream.on('end', () => stream.destroy())
    stream.on('error', err => reject(err) || stream.destroy())
  })

const fsWatchStream = (files, cb) =>
  files.forEach(file =>
    watchFile(objValue(file), ({ size: currSize }, { size: prevSize }) =>
      readFile({
        file: objValue(file),
        start: currSize - (currSize - prevSize),
        end: currSize
      })
      .then((data) =>
        cb(null, JSON.stringify({
          file: objKey(file),
          data: data.toString()
        })))
      .catch(err =>
        cb(err, null))
    )
  )

module.exports = fsWatchStream
