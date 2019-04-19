const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: './src/index.ts',
  target: 'node',
  module: {
    exprContextCritical: false,
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.build.json',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bara.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'bara',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: `(typeof self !== 'undefined' ? self : this)`,
  },
  devtool: false,
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: 'bara.js.map',
    }),
  ],
}
