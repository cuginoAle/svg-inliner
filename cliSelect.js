const readline = require('readline')

// Get process.stdin as the standard input object.

readline.emitKeypressEvents(process.stdin)
process.stdin.setRawMode(true)

// Set input character encoding.
process.stdin.setEncoding('utf-8')

process.on('SIGINT', () => {
  console.log('exit!!!!');
  
  process.exit()
})

let choice = 0

function getOptions (options) {
  return options.map((op, i) => {
    return `[${i === choice ? '✔' : ' '}] ${op}`
  })
}
function printSelect (label, options) {
  console.log(label)
  console.log(getOptions(options).join('\n'))
}

function updateScreen (label, options) {
  const msg = [
    label,
    ...options
  ].join('\n').split('\n')

  readline.cursorTo(process.stdout, 0)
  readline.moveCursor(process.stdout, 0, -msg.length)
  readline.clearScreenDown(process.stdout)
}

module.exports = {
  select: (label, options) => {
    printSelect(label, options)

    return new Promise((resolve, reject) => {
      process.stdin.on('keypress', (key, data) => {
        switch (data.name) {
          case 'up':
            choice--
            break
          case 'down':
            choice++
            break

          case 'return':
            process.stdin.setRawMode(false)
            process.stdin.removeAllListeners()

            resolve(choice)
            return false

          default:
            if (data.ctrl && data.name === 'c') {
              process.exit()
            } else {
              console.log('key', key)
              console.log('data', data)
            }
            break
        }
        choice = Math.max(choice, 0)
        choice = Math.min(choice, options.length - 1)
        updateScreen(label, options)
        printSelect(label, options)
      })
    })
  }
}
