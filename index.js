#!/usr/bin/env node

const fs = require('fs')
const chalk = require('chalk')
const ver = require('./package.json').version
const htmlTemplate = require('./htmlTemplate')
const path = require('path')

const { toPascalCase, getUserSettings, svgo } = require('./helpers')

const currentPath = path.resolve(process.cwd())

const exportDir = `${currentPath}`
const indexFile = `${exportDir}/all-icons.js`
const iconsDir = `${currentPath}`
const htmlIconsMap = `${exportDir}/all-icons.html`

const logo = require('./logo')
console.log(logo(ver))

fs.readdir(iconsDir, async function (err, items) {
  if (err) {
    console.error(err)
    process.exitCode(1)
    return
  }

  const settings = await getUserSettings()

  const files = items.filter(file => file.indexOf('.svg') > 0)

  const svgs = await Promise.all(files.map(async (file, i) => {
    const fName = file.split('.')[0]
    const fileName = toPascalCase(fName)
    console.log(fileName)

    const svgTag = fs.readFileSync(`${iconsDir}/${file}`, 'utf8')

    const optimisedSvg = await svgo.optimize(svgTag)

    const asString = `${
      optimisedSvg.data.replace('<svg ', `\n<svg class='svg-icon ${fName}-svg' `)
    }`
    const asRC = `props => {
    const {className,...rest}=props
    const cName = (className||'') + ' svg-icon ${fName}-svg'
    return (${optimisedSvg.data
    .replace('<svg ', `\n<svg className={cName} {...rest} `)
    .replace(/fill-rule/g, `fillRule`)
    .replace(/clip-rule/g, `clipRule`)
})}`

    return new Promise((resolve, reject) => {
      resolve({
        fileName,
        asRC,
        asString
      })
    })
  }))

  const svgsExport = svgs.map(({ fileName, asRC, asString }) => {
    return `export const ${fileName} =  ${settings === 'String' ? (`\`${asString}\``) : asRC}`
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
