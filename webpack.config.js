var path = require('path');
var webpack = require('webpack');
var WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
  entry: [
    "webpack-hot-middleware/client",
    "./src/index.tsx"
  ],
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/'
  },

  plugins: [
    new WebpackNotifierPlugin({ alwaysNotify: true }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],

  // Enable sourcemaps for debugging webpack's output
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".styl"]
  },

  module: {
    loaders: [
      // All files with a '.ts' or '.tsx' extension will be handled by its 'ts-loader'
      { 
        test: /\.tsx?$/, 
        loaders: [
          "ts-loader"
        ]
      },
      {
        test: /\.styl$/,
        loaders: [
          'style-loader',
          'css-loader',
          'stylus-loader'
        ]
      }
    ],

    preLoaders: [
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'
      { 
        test: /\.js$/, 
        loader: "source-map-loader" 
      }
    ]
  },

  // When importing a module whose path matches one of the following, just assume a corresponding global variable exists and use that instead. This is important because it allows us to avoid bundling all of our dependencies, which allows browsers to cache those libraries between builds
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  }
};