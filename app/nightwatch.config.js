// http://nightwatchjs.org/gettingstarted#settings-file

const deepmerge = require('deepmerge')
const userOptions = JSON.parse(process.env.VUE_NIGHTWATCH_USER_OPTIONS || '{}')

module.exports = deepmerge({
  test_settings: {
    chrome: {
      desiredCapabilities: {
        chromeOptions : {
          args : ["--headless"]
        }
      }
    }
  }
}, userOptions)
