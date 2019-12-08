// const { select } = require('./cliSelect.js')
const fs = require('fs')
const input = require('input')
const currentPath = process.cwd()
const configFileName = '.svgrc'
const path = require('path')
const configPath = path.resolve(currentPath, "svg-inliner.json")

const DEFAULT_CONFIG = {
  createHtml: true,
  exportType: undefined
}

module.exports = {
  getUserSettings: async () => {

    let config = DEFAULT_CONFIG

    if(fs.existsSync(configPath)) {

      let file = fs.readFileSync(configPath)
      let data = JSON.parse(file);

      for (var key in data) {
        config[key] = data[key]
      }
    }

    let prevConfig = Object.assign({}, config)

    if(!config.exportType) {
      const options = [
        'React component',
        'String'
      ]
      const selectedOption = await input.select('Export as ', options)
      config.exportType = selectedOption
    }

    if(prevConfig != config) {
      fs.writeFileSync(configPath, JSON.stringify(config))
    }
    return config
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
