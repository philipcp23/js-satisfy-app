# js-satisfy-app
Search 1 million recipes




You will also need to change the entry in webpack.config.js (a file we create during the video) from this:

entry: ['babel-polyfill', './src/js/index.js'],
to this:

entry: ['./src/js/index.js'],
and the code in .babelrc (also created during the video) from this:

{
    "presets": [
        ["env", {
            "targets": {
                "browsers": [
                    "last 5 versions",
                    "ie >= 8"
                ]
            }
        }]
    ]
}
to this:

{
    "presets": [
        ["@babel/env", {
            "useBuiltIns": "usage",
            "corejs": "3",
            "targets": {
                "browsers": [
                    "last 5 versions",
                    "ie >= 8"
                ]
            }
        }]
    ]
}