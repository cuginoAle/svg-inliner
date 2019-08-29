const logo = require('./logo.js')

module.exports = (html, ver) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>SVG - Inliner</title>    
        <style >
          a {
            text-decoration: none;
          }
          pre {
            font-size: 1.2rem;
            color: #369;
          }
          body {
            font-family: monospace;
          }
          .icons-list {
            display:flex;
            flex-wrap: wrap;
            ustify-content: space-between;
          }
          .icon-def {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 20px;
          }

          .icon-name {
            padding: 5px 5px;
            color: #999;
            width: 90px;
            text-align: center;
          }

          .svg-icon {
            width: 3rem;
            height: 3rem;
            color: #246;
          }

        </style>   
      </head>
      <body>
        <main>
          <a href='https://github.com/cuginoAle/svg-inliner'>
            <pre>
              ${logo(ver)}
            </pre>
          </a>
          ${html}
        </main>
      </body>
    </html>  
  `
}