// const { select } = require('./cliSelect.js')
const fs = require('fs')
const input = require('input')
const SVGO = require('svgo')
const currentPath = process.cwd()
const configFileName = '.svgrc'
const path = require('path')
const configPath = path.resolve(currentPath, configFileName)

const svgo = new SVGO({
  plugins: [{
    cleanupAttrs: true
  }, {
    removeDoctype: true
  }, {
    removeXMLProcInst: true
  }, {
    removeComments: true
  }, {
    removeMetadata: true
  }, {
    removeTitle: true
  }, {
    removeDesc: true
  }, {
    removeUselessDefs: true
  }, {
    removeEditorsNSData: true
  }, {
    removeEmptyAttrs: true
  }, {
    removeHiddenElems: true
  }, {
    removeEmptyText: true
  }, {
    removeEmptyContainers: true
  }, {
    removeViewBox: false
  }, {
    cleanupEnableBackground: true
  }, {
    convertStyleToAttrs: true
  }, {
    convertColors: true
  }, {
    convertPathData: true
  }, {
    convertTransform: true
  }, {
    removeUnknownsAndDefaults: true
  }, {
    removeNonInheritableGroupAttrs: true
  }, {
    removeUselessStrokeAndFill: true
  }, {
    removeUnusedNS: true
  }, {
    cleanupIDs: true
  }, {
    cleanupNumericValues: true
  }, {
    moveElemsAttrsToGroup: true
  }, {
    moveGroupAttrsToElems: true
  }, {
    collapseGroups: true
  }, {
    removeRasterImages: false
  }, {
    mergePaths: true
  }, {
    convertShapeToPath: true
  }, {
    sortAttrs: true
  }, {
    removeDimensions: true
  }, {
    removeAttrs: { attrs: '(stroke|fill)' }
  }]
})

module.exports = {
  svgo,
  getUserSettings: () => {
    if (fs.existsSync(configPath)) {
      const exportType = JSON.parse(fs.readFileSync(configPath))

      return exportType
    } else {
      const options = [
        'React component',
        'String'
      ]
      const selectedOption = input.select('Export as ', options)
      fs.writeFileSync(configPath, JSON.stringify(selectedOption, null, 2))
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
