# Pragmatic Digital Static Site Builder
This tool is used to build simple static sites using html, scss and JS.


## Installation

First, install [Yeoman](http://yeoman.io) and generator-pd-static-site using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-pd-static-site
```

Then generate your new project:

```bash
yo pd-static-site
```

## Including Templates
```
<%= require('../components/header.html').default %>
```

The following code can be added to any html template and used to pull in a component from the components directory.
**This will not work if you try and include a component within a component as of 20th June 2022. ***



## License

Apache-2.0 © [pragmatic-jeb]()


[npm-image]: https://badge.fury.io/js/generator-pd-static-site.svg
[npm-url]: https://npmjs.org/package/generator-pd-static-site
[travis-image]: https://travis-ci.com/pragmatic-jeb/generator-pd-static-site.svg?branch=master
[travis-url]: https://travis-ci.com/pragmatic-jeb/generator-pd-static-site
[daviddm-image]: https://david-dm.org/pragmatic-jeb/generator-pd-static-site.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/pragmatic-jeb/generator-pd-static-site
[coveralls-image]: https://coveralls.io/repos/pragmatic-jeb/generator-pd-static-site/badge.svg
[coveralls-url]: https://coveralls.io/r/pragmatic-jeb/generator-pd-static-site



# TODO
 - tailwind
 - - https://tailwindcss.com/docs/adding-custom-styles

 
 - slickjs
 - fontawesome
 - huskyjs to control git commits

