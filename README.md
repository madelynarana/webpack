# Webpack 5

Here are some  things this project supports:

- Latest stable ES version transpiling through `@babel/preset-env` and `babel-loader`.

- importing `.css` files into javascript files through `css-loader`.
- Sass: `.scss` and `.sass` formats through `sass-loader` and dart sass (`sass`) package.
- importing images (including `.svg`) through `import` syntax in javascript and `url()` syntax in css.
- automatically inlining images less than 8kb (webpack default, which is configurable) into the javascript bundle output. Anything over 8kb will be created as a resource file in the final output folder.
- `html-webpack-plugin@next` for outputting an `index.html` from a template for proper production builds support. 
- `clean-webpack-plugin` for automatic cleanup of the output directory (`dist/`) on each build.

## Start using for a new project
1. Clone the repo
2. Select the branch you want
3. Run `npm i` to install dependencies
4. Run one of the following commands, depending on intent:

### Production Build

```bash
npm run build
```

### Development Build

```bash
npm run build:dev
```

### Development Build, watching for file changes

```bash
npm run watch
```

### Development Server on port :9090

```bash
npm start
```