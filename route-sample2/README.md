# Router

```sh
$ npm install
```

## Start Development 

```sh
$ npm start
```

## Serve Application for testing

```sh
$ npm run serve
```

## Generate Files for beta and release

Files will be generated into a folder called `/dist`
```sh
$ npm run build:beta
```

```sh
$ npm run build:release
```

## Code Quality Check with Linting

Linting rules are located in the `package.json` file under `eslintConfig` and `stylelint`

both `JavaScript` and `CSS`
```sh
$ npm run lint
```
`JavaScript` only
```sh
$ npm run lint:js
```
https://eslint.org/docs/rules/

`CSS` only
```sh
$ npm run lint:css
```

> You can optionally add `--fix` to auto fix lint errors

https://stylelint.io/user-guide/rules/


## Browser Support

| IE / Edge | Firefox | Chrome | Safari | Opera | iOS | Android |
|:---------:|:---------:|:---------:|:---------:|:---------:|:---------:|:---------:|
| &Cross; | &Cross; | &check; | &check; | &Cross; | &check; | &check;


## Fix server redirects

### Apache 
`.htaccess` file
```sh
RewriteEngine On
RewriteBase /
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-l
RewriteRule ^.*$ / [L,QSA]
```

or 

```sh
RewriteEngine On
# set the base URL prefix
RewriteBase /
# for requests for index.html, just respond with the file
RewriteRule ^index\.html$ - [L]
# if requested path is not a valid filename, continue rewrite
RewriteCond %{REQUEST_FILENAME} !-f
# if requested path is not a valid directory, continue rewrite
RewriteCond %{REQUEST_FILENAME} !-d
# if you have continue to here, respond with index.html
RewriteRule . /index.html [L]
```
### 404.html

```html
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">        
    </head>
    <body>
        <script> window.location.replace(window.location.origin) </script>
    </body>
</html>
```
### Express Node.js

```js
const express = require('express')
const app = express()
const port = process.env.port || 7600
const root = __dirname

const fallback = (...args) => (req, res, next) => {
  if ((req.method === 'GET' || req.method === 'HEAD') && req.accepts('html')) {
    res.sendFile.call(res, ...args, error => error && next())
  } else next()
}

app.use(express.static(root))
app.use(fallback('index.html', { root }))

let httpInstance = app.listen(port)

process.on('SIGINT', () => {
  console.log('gracefully shutting down')
  httpInstance.close()
  process.exit(0)
})
```
