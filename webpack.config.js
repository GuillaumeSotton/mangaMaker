var Encore = require("@symfony/webpack-encore");

Encore
// directory where compiled assets will be stored
    .setOutputPath("public/build/")

    // public path used by the web server to access the output path
    .setPublicPath("/build")

    // only needed for CDN's or sub-directory deploy
    //.setManifestKeyPrefix('build/')

    /*
     * ENTRY CONFIG
     *
     * Add 1 entry for each "page" of your app
     * (including one that's included on every page - e.g. "app")
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. app.css) if you JavaScript imports CSS.
     */
    .addEntry("app", "./assets/js/index.js")
    //.addEntry('page1', './assets/js/page1.js')
    //.addEntry('page2', './assets/js/page2.js')

    // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
    .splitEntryChunks()

    // will require an extra script tag for runtime.js
    // but, you probably want this, unless you're building a single-page app
    .enableSingleRuntimeChunk()

    /*
     * FEATURE CONFIG
     *
     * Enable & configure other features below. For a full
     * list of features, see:
     * https://symfony.com/doc/current/frontend.html#adding-more-features
     */
    .cleanupOutputBeforeBuild()
    // .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    // enables @babel/preset-env polyfills
    // .configureBabel(() => {}, {
    // .configureBabel(function (babelConfig) {
    //    babelConfig.presets = [
    //       "@babel/env",
    //       "@babel/react",
    //       "@babel/preset-env",
    //    ];
    //    babelConfig.plugins = [
    //       [ "@babel/plugin-proposal-decorators", { "legacy": true } ],
    //       "@babel/plugin-proposal-class-properties",
    //       "@babel/plugin-proposal-object-rest-spread",
    //       "@babel/plugin-transform-runtime",
    //       "@babel/plugin-proposal-optional-chaining",
    //       "emotion",
    //    ];
    //    // babelConfig.useBuiltIns = 'usage';
    //    // babelConfig.corejs = 3;
    // })

    // .addLoader({
    //     test: /\.(jpg|JPG|PNG|jpeg|png|gif|mp3|svg|ttf|woff2|woff|eot)$/gi,
    //     loader: "file-loader"
    // })
    // enables Sass/SCSS support
    // .enableSassLoader()

    // uncomment if you use TypeScript
    //.enableTypeScriptLoader()

    // uncomment to get integrity="..." attributes on your script & link tags
    // requires WebpackEncoreBundle 1.4 or higher
    //.enableIntegrityHashes()

    // uncomment if you're having problems with a jQuery plugin
    //.autoProvidejQuery()

    // uncomment if you use API Platform Admin (composer req api-admin)
    .enableReactPreset()
//.addEntry('admin', './assets/js/admin.js')
;

const webpack = Encore.getWebpackConfig();
if (webpack.devServer) {
//  webpack.devServer.overlay = true;
    webpack.devServer.disableHostCheck = true;
    webpack.devServer.quiet = false;
    webpack.devServer.watchOptions.poll = true;
}

module.exports = webpack;
