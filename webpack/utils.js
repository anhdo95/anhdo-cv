const path = require('path')
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const methods = {
  resolve(relativePath) {
    return path.resolve(__dirname, '..', relativePath)
  },
  measure(config) {
    const smp = new SpeedMeasurePlugin({
      // outputTarget: methods.resolve('measure.txt')
    })
    
    return smp.wrap(config)
  },
}

module.exports = methods