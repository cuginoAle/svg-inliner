
```
--------------------------------------------
╔═╗┬  ┬┌─┐  ╦┌┐┌┬  ┬┌┐┌┌─┐┬─┐
╚═╗└┐┌┘│ ┬  ║││││  ││││├┤ ├┬┘  
╚═╝ └┘ └─┘  ╩┘└┘┴─┘┴┘└┘└─┘┴└─    
--------------------------------------------
```

[Article on Medium](https://medium.com/@alessio.carnevale/going-in-line-with-svgs-an-mpn-solution-ccdad08734a3)

---

**svg-inliner** is a node.js cli tool that collects all the .svg files in the folder you run it in and creates two files for you:

- all-icons.js
- all-icons.html

**all-icons.js** exports your icons so it allows you to:
```js
// import the icons you need
import {Cog, Magnifier, Trash} from './your-icons-folder/all-icons.js'


// and use them in your React code
const MyComponentUsingIcons = (props) => {
  
  return (
    <div>
      <button><Cog className='settings' /> Settings</button>
      <button><Magnifier width='100px' /> Search</button>
      <button><Trash /> Delete</button>      
    </div>
  )
}
```
Please note that whatever prop you set it will be applied to the <svg> tag.
That means you can set a custom className or any other attribute `<svg>` supports.

**all-icons.html** gives you a reference page where to look at when you need to remind yourself what icons you have at your disposal and what names you have to use to import them:

It looks something like this:
![](https://imgur.com/Kl5wrk6.png)

When generating the exports, svg-inliner apply a transformation to the svg file name to strip any space, dash and underscore and apply a PascalCase style to the resulting string.

So, in case you have something like small-clock_1.svg then the identifier of that icon would be SmallClock1.
Having an html map to see what the icons look like and what name to use to import them is something I find quite useful!

## Ok, how do I use it?
To use svg-inliner you:

```bash
> cd <your-svgs-folder>
> npx @cuginoale/svg-inliner
```


That's it, you `cd` to the folder holding your precious SVGs and run `npx @cuginoale/svg-inliner`

The tool will create those two files (all-icons.js and all-icons.html) for you in the same folder.

If you plan to use it frequently (maybe you want to run it whenever you drop a new svg into the folder) you can install it globally once:
```bash
> npm i -g @cuginoale/svg-inliner
```

and then run it using:
```bash
> svg-inliner
```

---

The first time you run svg-inliner you will get the chance to decide whether you want to export the svgs as React components (default) or just strings.

![Imgur](https://imgur.com/0IsuQFk.png)

If the latter, you will get the content of the svg file as a string.
Once you run svg-inliner it creates the .svgrc file to remember your choice. It won't ask you again what format to export to next time you run it from the same folder, unless you delete that file.


## SVGO

SVG files, especially those exported from various editors, usually contain a lot of redundant and useless information.
That's why svg-inliner will run your SVGs through [SVGO](https://github.com/svg/svgo) before exporting them (it doesn't change the original files though).

It uses the default SVGO settings, you can find them here:
https://github.com/cuginoAle/svg-inliner/blob/master/helpers.js


---

If you give svg-inliner a go and feel like giving some feedback… your opinion is more than welcome!
