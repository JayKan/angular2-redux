'use strict';

const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const path = require('path');
const webpack = require('webpack');
const WebpackMd5Hash = require('webpack-md5-hash');

//=========================================================
//  ENVIRONMENT VARS
//---------------------------------------------------------
const NODE_ENV        = process.env.NODE_ENV;
const ENV_DEVELOPMENT = NODE_ENV === 'development';
const ENV_PRODUCTION  = NODE_ENV === 'production';
const ENV_TEST        = NODE_ENV === 'test';
const HOST            = process.env.HOST || 'localhost';
const PORT            = process.env.PORT || 3000;


//=========================================================
//  CONFIG
//---------------------------------------------------------
const config = {};
module.exports = config;

/**
 * Resolve
 * Reference: http://webpack.github.io/docs/configuration.html#resolve
 */
config.resolve = {
  // only discover files that have those extensions
  extensions: ['', '.ts', '.js', '.json', '.css', '.scss', '.html'],
  root: path.resolve('.'),
  modulesDirectories: ['node_modules']
};

config.module = {
  loaders: [
    {
      test: /\.ts$/,
      loaders: [
        'ts-loader'
      ],
      exclude: [
        /\.(spec|e2e)\.ts$/,
        /node_modules\/(?!(ng2-.+))/
      ]
    },
    { test: /\.json$/, loader: 'json-loader'                                              },
    { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss') },
    {
      test: /\.scss$/,
      loaders: [
        'raw-loader',
        'postcss-loader',
        'sass-loader'
      ],
      exclude: path.resolve('src/app/assets/styles'),
      include: [
        path.resolve('src/app'),
        path.resolve('src/app/components'),
      ]
    },
    {
      test: /\.(html|css)$/,
      loader: 'raw-loader'
    },
    {
      test: /\.(jpg|png|gif)$/,
      loader: 'file-loader'
    }
  ]
};

config.plugins = [
  new ForkCheckerPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
  }),
  new CopyWebpackPlugin([
    { from: 'src/app/assets/images', to: 'assets'   },
  ])
];

config.postcss = [
  autoprefixer({ browser: ['last 3 versions'] })
];

config.sassLoader = {
  outputStyle: 'compressed',
  prevision: 10,
  sourceComments: false
};


//=========================================================
//  COMMON DEVELOPMENT/PRODUCTION
//---------------------------------------------------------
if (ENV_DEVELOPMENT || ENV_PRODUCTION) {
  config.entry = {
    main: ['./src/main.ts'],
    polyfills: './src/polyfills.ts',
    vendor: './src/vendor.ts'
  };

  config.output = {
    filename: '[name].js',
    path: path.resolve('./public'),
    publicPath: '/'
  };

  config.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'polyfills'],
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      chunkSortMeta: 'dependency',
      filename: 'index.html',
      hash: false,
      inject: 'body',
      template: './src/index.html'
    })
  );
}

//=========================================================
//  DEVELOPMENT ONLY
//---------------------------------------------------------
if (ENV_DEVELOPMENT) {
  config.devtool = 'cheap-module-source-map';

  config.entry.main.unshift(`webpack-dev-server/client?http://${HOST}:${PORT}`);

  config.module.loaders.push(
    {
      test: /\.scss$/,
      loader: 'style!css!postcss!sass',
      include: path.resolve('src/app/assets/styles')
    }
  );

  // Use webpack-dev-server for development
  config.devServer = {
    contentBase: './src',
    historyApiFallback: true,
    host: HOST,
    outputPath: config.output.path,
    port: PORT,
    publicPath: config.output.publicPath,
    stats: {
      cached: true,
      cachedAssets: true,
      chunks: true,
      chunkModules: false,
      colors: true,
      hash: false,
      reasons: true,
      timings: true,
      version: false
    }
  };
}


//=========================================================
//  PRODUCTION ONLY
//---------------------------------------------------------
if (ENV_PRODUCTION) {
  config.devtool = 'source-map';

  config.output.filename = '[name].[chunkhash].js';

  config.module.loaders.push(
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('css?-autoprefixer!postcss!sass'),
      include: path.resolve('src/app/assets/styles')
    }
  );

  config.plugins.push(
    new WebpackMd5Hash(),
    new ExtractTextPlugin('styles.[contenthash].css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      compress: {
        dead_code: true,
        screw_ie8: true,
        unused: true,
        warnings: false
      }
    })
  );
}

//=========================================================
//  TEST ONLY
//---------------------------------------------------------
if (ENV_TEST) {
  config.devtool = 'inline-source-map';

  config.module.loaders.push(
    {
      test: /\.scss$/,
      loader: 'style!css!postcss!sass',
      include: [path.resolve('src/app/assets/styles'), path.resolve('src/app/components')]
    }
  );
}
