const { prompt } = require('inquirer');
const axios = require('axios');
const chalk = require('chalk');

class Weather {
  constructor() {
    this.location = 'Glendale';
    this.questions = [
      {
        type : 'input',
        name : 'location',
        message : 'Enter City (default: Glendale) ...'
      }
    ];
  }

  init() {
    let location = this.location;
    let questions = this.questions;
    this.getWeather(location, questions);
  }

  getWeather(location, questions) {
    prompt(questions)
    .then(answers => {
      location = answers.location ? answers.location : 'Glendale';
      axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${process.env.OWM_API_KEY}&units=imperial`)
      .then( res => {
        let string =
        `
          \n${chalk.grey('=================================================================================')}
          \nThe temperature in ${chalk.green(location)} is ${chalk.yellow(res.data.main.temp)}°F and ${chalk.cyan(res.data.weather[0].description)} today.
          \n${chalk.grey('=================================================================================')}
          \n
        `;
        console.log(string);
      });
    });
  }
}

module.exports = Weather;
