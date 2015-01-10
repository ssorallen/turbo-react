var webpack = require("webpack");

module.exports = {
  entry: __dirname + "/src/reactize.js",
  module: {
    loaders: [
      {test: /\.coffee$/, loader: "coffee-loader"}
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      // Force HTMLtoJSX to use the in-browser `document` object rather than
      // require the Node-only "jsdom" package.
      IN_BROWSER: true,

      // Expose the version to embed in the final file.
      REACTIZE_VERSION: JSON.stringify(require("./package.json").version)
    })
  ],
  output: {
    path: __dirname + "/public/dist",
    filename: "reactize.min.js"
  }
};
