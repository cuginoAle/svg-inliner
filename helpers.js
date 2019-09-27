// const { select } = require('./cliSelect.js')
const fs = require('fs')
const input = require('input')
const currentPath = process.cwd()
const configFileName = '.svgrc'
const path = require('path')
const configPath = path.resolve(currentPath, configFileName)

module.exports = {
  getUserSettings: async () => {
    if (fs.existsSync(configPath)) {
      const exportType = fs.readFileSync(configPath)

      return exportType
    } else {
      const options = [
        'React component',
        'String'
      ]
      const selectedOption = await input.select('Export as ', options)
      fs.writeFileSync(configPath, selectedOption)
      return selectedOption
    }
  },
  toPascalCase: (string) => {
    return `${string}`
      .replace(new RegExp(/[-_]+/, 'g'), ' ')
      .replace(new RegExp(/[^\w\s]/, 'g'), '')
      .replace(
        new RegExp(/\s+(.)(\w+)/, 'g'),
        ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
      )
      .replace(new RegExp(/\s/, 'g'), '')
      .replace(new RegExp(/\w/), s => s.toUpperCase())
  }
}
