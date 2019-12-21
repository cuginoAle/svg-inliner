// const { select } = require('./cliSelect.js')
const fs = require('fs')
const input = require('input')
const currentPath = process.cwd()
const configFileName = '.svgrc'
const path = require('path')
const configPath = path.resolve(currentPath, "svg-inliner.json")
const chalk = require('chalk')

const DEFAULT_CONFIG = {
  createHtml: undefined,
  exportType: undefined,
}

module.exports = {
  getUserSettings: async () => {

    let config = DEFAULT_CONFIG

    // load config if exists
    if(fs.existsSync(configPath)) {

      let file = fs.readFileSync(configPath)
      try {
        let data = JSON.parse(file);

        // asign loaded values
        for (var key in data) {
          config[key] = data[key]
        }
      } catch (e) {
        console.log(chalk.red('✘ Error while loading configuration file.'))
        console.log('  Changes may overwrite your existing configuration. \n')
      }
    }

    let prevConfig = Object.assign({}, config) // create object copy for detecting changes

    // get option for export type
    if(config.exportType === undefined) {
      const options = [
        { name: 'React Component', value: 'react_component' },
        { name: 'String', value: 'string' },
      ]
      const selectedOption = await input.select('Export as ', options)
      config.exportType = selectedOption

      console.log('');
    }

    // get option for documentation generation
    if(config.createHtml === undefined) {
      const options = [
        { name: 'Generate HTML', value: true },
        { name: 'Skip Generation', value: false },
      ]
      const selectedOption = await input.select('Generate Documentation:', options)
      config.createHtml = selectedOption

      console.log('');
    }

    // save config if changed
    if(JSON.stringify(prevConfig) != JSON.stringify(config)) {
      try {
        fs.writeFileSync(configPath, JSON.stringify(config))
        console.log(chalk.green('✔ Configuration file sucessfully saved. \n'))
      } catch (e) {
        console.log(chalk.red('✘ Error while saving configuration file. \n'))
      }
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
