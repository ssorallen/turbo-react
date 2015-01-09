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
      IN_BROWSER: true
    })
  ],
  output: {
    path: __dirname + "/public/dist",
    filename: "reactize.min.js"
  }
};
