const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js', // Adjust the entry point as needed
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: false, // Disable source maps
  module: {
    rules: [
      // Add babel-loader for handling JSX and ES6+
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      // Source map loader with exclusions
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        // Explicitly ignore the problematic files
        exclude: [
          /@dotlottie\/common\/dist\/chunk-DCAKKOYV\.js$/,
          /@rgba-image/
        ]
      }
    ]
  },
  // Ignore specific warnings
  ignoreWarnings: [
    // Ignore warnings from source-map-loader
    {
      module: /node_modules\/@dotlottie\/common\/dist\/chunk-DCAKKOYV\.js$/,
      message: /Failed to parse source map/
    }
  ],
  // Add resolve extensions for JS and JSX files
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
