#!/usr/bin/env node

const fs = require('fs')
const chalk = require('chalk')

const exportDir = `${__dirname}/icons`
const indexFile = `${exportDir}/all-icons.js`
const iconsDir = `./`
const mdIconsMap = `${exportDir}/all-icons.md`
const ver = require('./package.json').version

const logo = `
---------------------------------------------
╔═╗┬  ┬┌─┐  ╦┌┐┌┬  ┬┌┐┌┌─┐┬─┐
╚═╗└┐┌┘│ ┬  ║││││  ││││├┤ ├┬┘
╚═╝ └┘ └─┘  ╩┘└┘┴─┘┴┘└┘└─┘┴└─    ver. ${ver}
---------------------------------------------

`

console.log(logo)

const svgs = []
fs.readdir(iconsDir, function (err, items) {
  if (err) {
    console.error(err)
  } else {
    const files = items.filter(file => file.indexOf('.svg') > 0)
    console.log(`Working...`)

    files.forEach((file, i) => {
      const svg = fs.readFileSync(`${iconsDir}/${file}`, 'utf8')
      const fileName = file.split('.')[0]

      const svgTag = svg.replace('<svg ', `<svg class="icon-img ${fileName}-svg" `)
      svgs.push(`['${fileName}'] : \`${svgTag}\``)
    })

    const md = files.map(f => `|${f.split('.')[0]}|<img src="${iconsDir}/${f}" width="100%" height="44" />|`).join('\n')
    fs.writeFileSync(mdIconsMap, `| Name | icon |\n|---|---|\n${md}`)
  }

  // write our generic index.js

  fs.writeFileSync(indexFile, `
module.exports = {
  ${svgs.join(',')}\n
  }\n`)

  console.log(`${chalk.green('✔')} Exported ${svgs.length} svgs to all-index.js`)
  console.log('---------------------------------------------')
  console.log()
})
