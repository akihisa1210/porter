const path = require('path');
const fs = require('fs');

// Copy static files manually after build
class CopyStaticFilesPlugin {
  apply(compiler) {
    compiler.hooks.afterEmit.tap('CopyStaticFilesPlugin', () => {
      const distPath = path.resolve(__dirname, 'dist');
      
      // Copy files
      const filesToCopy = [
        'manifest.json',
        'popup.html', 
        'popup.js'
      ];
      
      filesToCopy.forEach(file => {
        const src = path.resolve(__dirname, file);
        const dest = path.resolve(distPath, file);
        if (fs.existsSync(src)) {
          fs.copyFileSync(src, dest);
        }
      });
    });
  }
}

module.exports = {
  mode: "production",
  entry: {
    'content.simple': "./content.simple.js",
    background: "./background.js"
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: "tsconfig.webpack.json",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [
    new CopyStaticFilesPlugin()
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
  },
};