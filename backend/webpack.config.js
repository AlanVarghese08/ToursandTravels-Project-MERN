const path = require("path");

module.exports = {
  resolve: {
    fallback: {
      buffer: require.resolve("buffer/"),
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      util: require.resolve("util/"),
    },
  },
  entry: "index.js", // Adjust the entry file based on your project
  output: {
    path: path.resolve(__dirname, "dist"), // Specify the output directory
    filename: "bundle.js",
  },
  // Other webpack configuration options...
};
