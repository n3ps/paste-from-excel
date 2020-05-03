const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/entry.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'paste-from-excel.min.js',
    library: 'PasteFromExcel',
    libraryTarget: 'umd'
  }
}
