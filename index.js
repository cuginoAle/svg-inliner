#!/usr/bin/env node

const fs = require('fs')
const chalk = require('chalk')
const ver = require('./package.json').version
const htmlTemplate = require('./htmlTemplate')
var path = require('path')
const {toPascalCase} = require('./helpers')

const currentPath = path.resolve(process.cwd())

const exportDir = `${currentPath}`
const indexFile = `${exportDir}/all-icons.js`
const iconsDir = `${currentPath}`
const htmlIconsMap = `${exportDir}/all-icons.html`

const logo = require('./logo')
console.log(logo(ver))

fs.readdir(iconsDir, function (err, items) {
  if (err) {
    console.error(err)
    process.exitCode(1)
    return
  }

  const files = items.filter(file => file.indexOf('.svg') > 0)
  console.log(`Working...`)

  const svgs = files.map((file, i) => {
    const fName = file.split('.')[0]
    const fileName = toPascalCase(fName)

    const svgTag = fs.readFileSync(`${iconsDir}/${file}`, 'utf8')
      
    const asString=`${
      svgTag.replace('<svg ', `\n<svg class='svg-icon ${fName}-svg'} `)
    }`
    const asRC = `props => (${
      svgTag
        .replace('<svg ', `\n<svg className={(props.className||'') + ' svg-icon ${fName}-svg'} `)
        .replace(/fill-rule/g, `fillRule`)
        .replace(/clip-rule/g, `clipRule`)
    })`

    return {
      fileName,
      asRC,
      asString
    }    
  })

  const svgsExport = svgs.map(({fileName,asRC}) => {
    return `export const ${fileName} =  ${asRC}`    
  })

  const iconsHtml = svgs.map(obj => `
      <div class='icon-def'>
        <span class='icon-img'>${obj.asString}</span>      
        <span class='icon-name'>${obj.fileName}</span>
      </div>
    `)

  fs.writeFileSync(htmlIconsMap, htmlTemplate(`
    <div class='icons-list'>
      ${iconsHtml.join('')}
    </div>
    `, ver))

  fs.writeFileSync(indexFile, `import React from 'react'\n${svgsExport.join('\n')}\n`)

  console.log(`${chalk.green('✔')} Exported ${svgsExport.length} svgs to all-icons.js`)
  console.log(`${chalk.green('✔')} Icons map: ${chalk.blueBright(htmlIconsMap)}`)
  console.log('---------------------------------------------')
  console.log()
})

