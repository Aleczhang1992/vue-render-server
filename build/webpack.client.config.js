const webpack = require('webpack');
const base = require('./webpack.base.config');
const vueConfig = require('./vue-loader.config');



//生成 前端文件的webpack 配置
const config = Object.assign({}, base, {
  plugins: (base.plugins || []).concat([
    // strip comments in Vue code
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),

      //将类库文件进行分开打包,便于缓存
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'client-vendor-bundle.js'
    })
  ])
})

if (process.env.NODE_ENV === 'production') {
  
  const ExtractTextPlugin = require('extract-text-webpack-plugin')

 //这里是添加loader解析不同类型文件的地方
  vueConfig.loaders = {
//  stylus: ExtractTextPlugin.extract({
//    loader: "css-loader!stylus-loader",
//    fallbackLoader: "vue-style-loader" // <- this is a dep of vue-loader
//  }),
	css: ExtractTextPlugin.extract({
              loader: 'css-loader!stylus-loader',
              fallbackLoader: 'vue-style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
    })
  }

  config.plugins.push(
  	new webpack.DefinePlugin({
	  'process.BROWSER': true
	}),
  	//抽离出css
    new ExtractTextPlugin('styles.[hash].css'),
    // this is needed in webpack 2 for minifying CSS
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    // minify JS
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  )
}

module.exports = config
