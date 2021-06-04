const WeatherAPI = require('./weatherSource');
const TranslateSource = require('./translateSource');

module.exports = dataSource = () => (
    {
        weatherSource: new WeatherAPI(),
        translateSource: new TranslateSource()
    });