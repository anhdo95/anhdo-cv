const path = require('path')

module.exports = {
  resolve(relativePath) {
    return path.resolve(__dirname, '..', relativePath)
  }
}