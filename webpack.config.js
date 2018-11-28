let path = require('path'),
    webpack = require('webpack'),
    HtmlWebPackPlugin = require('html-webpack-plugin')

const PATHS = {
    src: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist'),
    main: path.join(__dirname, 'src/main.js')
}

let wpConfig = {
    entry: PATHS.main,
    output: {
        path: PATHS.dist,
        filename: 'build.js',
    },
	 devServer: {
		 inline: true, // autorefresh
		 port: "2210", // development port server
		 headers: {
			'Access-Control-Allow-Origin': '*'
		}                    
	  },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                  "presets": [
                     "@babel/preset-env",
					 "@babel/preset-react"
                   ]
                }
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({ 
            title: 'My React App',
            template: './index.html'
        })
    ]
}

module.exports = wpConfig