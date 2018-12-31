const { prompt } = require('inquirer');
const axios = require('axios');
const chalk = require('chalk');

class Weather {
  static get commandName() {
    return 'arena';
  }

  static get commandDescription() {
    return 'get weather';
  }

  static get commandAlias() {
    return 'w';
  }

  constructor() {
    this.modifier = 'zip';
    this.location = '91203';
    this.questions = [
      {
        type : 'input',
        name : 'location',
        message : 'Enter City or Zip Code (default: Glendale) ...'
      }
    ];
  }

  init() {
    let modifier = this.modifier;
    let location = this.location;
    let questions = this.questions;
    this.getWeather(modifier, location, questions);
  }

  getWeather(modifier, location, questions) {
    prompt(questions)
    .then(answers => {
      let loc = answers.location;
      console.log(loc)
      location = loc ? loc : location;
      modifier = isNaN(location) ? 'q' : modifier;

      axios.get(`http://api.openweathermap.org/data/2.5/weather?${modifier}=${location}&APPID=${process.env.OWM_API_KEY}&units=imperial`)
      .then( res => {
        let string =
        `
          \n${chalk.grey('=================================================================================')}
          \nThe temperature in ${chalk.green(res.data.name)} is ${chalk.yellow(res.data.main.temp)}°F and ${chalk.cyan(res.data.weather[0].description)} today.
          \n${chalk.grey('=================================================================================')}
          \n
        `;
        console.log(string);
      })
      .catch(e => {
        console.log(e);
      });
    });
  }
}

module.exports = Weather;
