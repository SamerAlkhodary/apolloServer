const WeatherAPI = require('./weatherSource');
const TranslateSource = require('./translateSource');
const UserSource = require('./userSource');

module.exports = dataSource = () => (
    {
        weatherSource: new WeatherAPI(),
        translateSource: new TranslateSource(),
        userSource: new UserSource(),
    });