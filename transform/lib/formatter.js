const prettier = require('prettier')

/**
 * React component templates.
 * @readonly
 * @type {Map<function, function>}
 */
const TEMPLATES = {
  string: (svg, name) => `
    export const ${name} = '${svg}';
  `,
  functional: (svg, name) => `
    import React from "react";

    export const ${name} = '${svg}'
  `
}

/**
 * Creates React component.
 * @param {string} svg Transformed SVG string.
 * @param {string="functional","name"} config.type Desired component type.
 * @return {string}
 */
function reactify (svg, { type = 'functional', name = '' }) {
  const compile = TEMPLATES[type](svg, name)
  // const component = compile({
  //   svg
  // })
  // return component

  return svg
}

/**
 * Creates React component and formats with Prettier.
 * @param {string} svg Transformed SVG string.
 * @param {Object=} config Component type and Prettier config.
 * @return {string}
 */
function format (svg, config) {
  const component = reactify(svg, config)
  const formatted = prettier.format(component, {
    ...config,
    parser: 'babel'
  })

  return formatted
}

module.exports = format
