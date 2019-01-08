const chalk = require('chalk');

class Coffee {
  static get commandName() {
    return 'coffee';
  }

  static get commandDescription() {
    return 'tells you whether it\'s coffee time or not';
  }

  static get commandAlias() {
    return 'c';
  }

  constructor() {
    this.time = new Date()
  }

  init() {
    let coffeetime = '';
    let currentHour = this.time.getHours();
    if (currentHour < 15) {
      coffeetime = 'No, not yet...\n'
    } else if (currentHour >= 15 && currentHour < 16) {
      coffeetime = 'ALMOSTTTTT\n'
    } else if (currentHour >= 16 && currentHour < 17) {
      let color = this.getRandomColor();
      let string =
        `

        ██╗████████╗███████╗     ██████╗ ██████╗ ███████╗███████╗███████╗███████╗    ████████╗██╗███╗   ███╗███████╗██╗██╗██╗██╗██╗██╗██╗
        ██║╚══██╔══╝██╔════╝    ██╔════╝██╔═══██╗██╔════╝██╔════╝██╔════╝██╔════╝    ╚══██╔══╝██║████╗ ████║██╔════╝██║██║██║██║██║██║██║
        ██║   ██║   ███████╗    ██║     ██║   ██║█████╗  █████╗  █████╗  █████╗         ██║   ██║██╔████╔██║█████╗  ██║██║██║██║██║██║██║
        ██║   ██║   ╚════██║    ██║     ██║   ██║██╔══╝  ██╔══╝  ██╔══╝  ██╔══╝         ██║   ██║██║╚██╔╝██║██╔══╝  ╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝
        ██║   ██║   ███████║    ╚██████╗╚██████╔╝██║     ██║     ███████╗███████╗       ██║   ██║██║ ╚═╝ ██║███████╗██╗██╗██╗██╗██╗██╗██╗
        ╚═╝   ╚═╝   ╚══════╝     ╚═════╝ ╚═════╝ ╚═╝     ╚═╝     ╚══════╝╚══════╝       ╚═╝   ╚═╝╚═╝     ╚═╝╚══════╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝

        `
      coffeetime = chalk[color](string);
    } else {
      console.log('coffee time is over :(\n')
    }
    console.log(chalk.yellow('\nIs it coffee time?\n'))
    console.log(coffeetime)
  }

  getRandomColor() {
    let array = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white', 'gray', 'redBright', 'greenBright', 'yellowBright', 'blueBright', 'magentaBright', 'cyanBright', 'whiteBright'];
    let randomNum = Math.floor(Math.random() * array.length);
    return array[randomNum];
  }
}

module.exports = Coffee;