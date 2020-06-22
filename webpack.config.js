'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = {

  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/build/',
    filename: 'project.bundle.js'
  },

  module: {
    rules: [
       {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg|)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: [/\.vert$/, /\.frag$/],
        use: 'raw-loader'
          }
        ]
  },

  plugins: [
        new webpack.DefinePlugin({
      'CANVAS_RENDERER': JSON.stringify(true),
      'WEBGL_RENDERER': JSON.stringify(true)
    })
    ]

};