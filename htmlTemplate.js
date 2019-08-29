module.exports = (html, ver) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>SVG - Inliner</title>    
        <style >
          h1 {
            font-size: 2rem;
          }
          body {
            font-family: monospace;
          }
          .icons-list {
            display:flex;
          }
          .icon-def {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 10px;
          }

          .icon-name {
            padding: 3px 5px;
            background-color: #eee;
          }

          .icon-img svg {
            width: 2rem;
            height: 2rem;
          }

        </style>   
      </head>
      <body>
        <main>
          <h1>SVG - Inliner</h1>
          <p>ver. ${ver}</p>
          ${html}
        </main>
      </body>
    </html>  
  `
}