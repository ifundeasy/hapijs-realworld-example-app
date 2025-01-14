#!env node

let size = 256
let encoding = 'hex'
let filePath = './.env'

if (process.argv.indexOf('--size') !== -1) {
  size = process.argv[process.argv.indexOf('--size') + 1]
}

if (process.argv.indexOf('--encoding') !== -1) {
  const encodingOpt = process.argv[process.argv.indexOf('--encoding') + 1]
  if (Buffer.isEncoding(encodingOpt)) {
    encoding = encodingOpt
  } else {
    console.log('Invalid encoding, fallback to ', encoding)
  }
}

if (process.argv.indexOf('--filePath') !== -1) {
  filePath = process.argv[process.argv.indexOf('--filePath') + 1]
}

require('crypto').randomBytes(size, (err, buffer) => {
  if (err) {
    console.error(err)
    return
  }

  const token = buffer.toString(encoding)
  const fs = require('fs')

  fs.open(filePath, 'wx', (err, fd) => {
    if (err) {
      if (err.code === 'EEXIST') {
        console.log(filePath, 'already exists !')
        return
      }

      throw err
    }
    const data = 'ENCODING=' + encoding + '\nSECRET_KEY=' + token
    fs.writeFile(fd, data, { mode: 644 }, (err) => {
      if (err) {
        console.error(err)
        return
      }
      console.log('Generated', encoding, '(', size, ')', 'stored in ./.env')
    })
  })
})
