const path = require('path'),
      uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin'),
      htmlWebpackPlugin = require('html-webpack-plugin'),
      autoprefixer = require('autoprefixer'),
      miniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
  mode: 'development',  // development   production
  entry: {
  	index: path.resolve(__dirname, './src/js/index.js'),
  	jquery: path.resolve(__dirname, './src/js/jquery.min.js'),
  },
  output: {
  	path: path.resolve(__dirname + '/dist'),
  	filename: 'js/[name].js'
  },
  module: {
  	rules: [
      {
      	test: /\.js$/,
      	loader: 'babel-loader',
      	exclude: path.resolve(__dirname, 'node_modules'),
      	query: {
      		'presets': ['latest']
      	}
      },

      {
      	test: /\.tpl$/,
      	loader: 'ejs-loader'
      },

      {
      	test: /\.scss$/,
      	use: [
          {
	          loader: miniCssExtractPlugin.loader,
	          options: {
	          	hmr: process.env.NODE_ENV === 'development'
	          }
	      	},
	      	'css-loader',
	      	{
	          loader: 'postcss-loader',
	          options: {
	          	plugins: function () {
	          		return [autoprefixer('last 5 versions')];
	          	}
	          }
	      	},
	      	'sass-loader'
      	]
      },

      {
        test: /\.css$/,
        use: [
          {
            loader: miniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development'
            }
          },
          'css-loader'
        ]
      },

      {
      	test: /\.(png|jpg|jpeg|gif|ico)$/i,
      	loader: [
          'url-loader?limit=1024&name=img/[name]-[hash:16].[ext]',
          'image-webpack-loader'
      	]
      },

      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: 'url-loader'
      }
  	]
  },

  plugins: [
    new uglifyjsWebpackPlugin(),
    new htmlWebpackPlugin({
      minify: {
      	removeComment: true,
      	collapseWhitespace: true
      },
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html'),
      title: 'jsModule',
      chunksSortMode: 'manual',
      chunks: ['jquery', 'index'],
      excludeChunks: ['node_modules'],
      hash: true
    }),
    new miniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ],

  devServer: {
  	watchOptions: {
  		ignored: /node_modules/
  	},
  	open: true,
  	host: 'localhost',
  	port: '3000'
  }
}

module.exports = config;