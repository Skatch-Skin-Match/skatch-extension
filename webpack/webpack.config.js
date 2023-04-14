const path = require("path");

module.exports = {
  entry: {
    content: "./src/scripts/content.ts",
    background: "./src/scripts/background.ts",
  },

  output: {
    path: path.resolve(__dirname, "../extensions"),
    filename: "[name].js",
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", "tsx"],
  },
};
