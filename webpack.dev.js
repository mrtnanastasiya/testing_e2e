const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  // Set the mode to development or production
  mode: "development",
  // Control how source maps are generated
  devtool: "inline-source-map",

  // Spin up a server for quick development
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"), // Папка для статических файлов
    },
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true, // Включает Hot Module Replacement
    port: 9000, // Указывает порт, на котором будет работать сервер
  },

  plugins: [
    // Only update what has changed on hot reload
    new webpack.HotModuleReplacementPlugin(),
  ],
});
