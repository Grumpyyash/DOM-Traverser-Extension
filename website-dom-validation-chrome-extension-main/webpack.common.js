const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: {
    Popup: path.resolve('src/Popup/popup.tsx'),
    Background: path.resolve('src/Background/background.ts'),
    ContentScript: path.resolve('src/ContentScript/contentScript.ts'),
    TraverseDom: path.resolve('src/TraverseDom/traverseDom.tsx'),
    CheckStyles: path.resolve('src/CheckStyles/checkStyles.tsx'),
    CheckDensity: path.resolve('src/CheckDensity/checkDensity.tsx'),
    Form: path.resolve('src/Common/Form/form.tsx'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve('src/Static'),
          to: path.resolve('dist'),
        },
      ],
    }),
    ...getHtmlPlugins([
      'Popup',
      'TraverseDom',
      'CheckStyles',
      'CheckDensity',
      'Form',
    ]),
  ],
  output: {
    filename: '[name].js',
    path: path.resolve('dist'),
  },
  optimization: {
    splitChunks: {
      chunks(chunk) {
        return chunk.name !== 'ContentScript' && chunk.name !== 'Background'
      },
    },
  },
}

function getHtmlPlugins(chunks) {
  return chunks.map(
    (chunk) =>
      new HtmlPlugin({
        title: 'DOM Traversal Extension',
        filename: `${chunk}.html`,
        chunks: [chunk],
      })
  )
}
