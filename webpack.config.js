const BookmarkletWrapperPlugin = require("bookmarklet-wrapper-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/main.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [new BookmarkletWrapperPlugin()],
};
