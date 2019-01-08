const { prompt } = require('inquirer');
const axios = require('axios');
const querystring = require('querystring');
const fs = require('fs');
const chalk = require('chalk');

class Arena {
  static get commandName() {
    return 'arena';
  }

  static get commandDescription() {
    return 'get arena ratings';
  }

  static get commandAlias() {
    return 'a';
  }


  constructor() {
    this.client_id = process.env.WOW_CLIENT_ID;
    this.client_secret = process.env.WOW_CLIENT_SECRET;
    this.tokenObj = {};
    this.expirationTime;
    this.questions = [
      {
        type: 'input',
        name: 'character',
        message: 'Enter your character\'s name ...'
      },
      {
        type: 'input',
        name: 'realm',
        message: 'Enter your character\'s realm ...'
      },
    ];
    this.character = '';
    this.realm = '';
  }

  async init() {
    // prompt for character and realm
    await prompt(this.questions)
    .then(answers => {
      this.character = answers.character;
      this.realm = answers.realm;
    });

    // set default values for character and realm
    await this._setDefaultInput();

    // check token to see if still valid
    let tokenValid = await this._checkToken();
    if (!tokenValid) {
      // grab token object
      this.tokenObj = await this.getToken(this.client_id, this.client_secret);

      // set token
      await this._writeToken();
    }

    // made api call for arena record
    let data = await this.getArenaData(this.tokenObj.access_token, this.character, this.realm);

    // format the data for readability
    let result = await this._formatArenaData(data);

    console.log(result);
  }

  _checkToken() {
    if (fs.existsSync(__dirname + '/token.json')) {
      this.tokenObj = JSON.parse(fs.readFileSync(__dirname + '/token.json'))
      let date = new Date();
      if (date.getTime() < this.tokenObj.expDate) {
        return true;
      }
      return false
    }
    return false;
  }

  _writeToken() {
    let date = new Date();
    let expDate = date.getTime() + (this.tokenObj.expires_in * 1000)
    this.tokenObj.expDate = expDate;
    fs.writeFile(__dirname + '/token.json', JSON.stringify(this.tokenObj), err => {
      if (err) console.log(err)
    })
  }

  getToken(id, secret) {
    let token = axios.post('https://us.battle.net/oauth/token', querystring.stringify({
      grant_type: 'client_credentials',
      client_id: id,
      client_secret: secret
    }))
    .then(res => {
      return res.data;
    })
    .catch(e => {
      console.log(e);
    })
    return token;
  }

  getArenaData(token, character, realm) {
    let data = axios.get(`https://us.api.blizzard.com/wow/character/${realm}/${character}`, {
      params: {
        fields: 'pvp',
        access_token: token
      }
    })
    .then(res => {
      return res.data.pvp.brackets;
    })
    .catch(e => {
      console.log(e);
    })
    return data;
  }

  _setDefaultInput() {
    this.character = this.character ? this.character : 'qoda';
    this.realm = this.realm ? this.realm : 'kil\'jaeden';
  }

  _formatArenaData(data) {
    let twos = data.ARENA_BRACKET_2v2;
    let threes = data.ARENA_BRACKET_3v3;

    let twosWeeklyPercent = this._calculatePercent(twos.weeklyWon, twos.weeklyPlayed);
    let twosSeasonPercent = this._calculatePercent(twos.seasonWon, twos.seasonPlayed);

    let threesWeeklyPercent = this._calculatePercent(threes.weeklyWon, threes.weeklyPlayed);
    let threesSeasonPercent = this._calculatePercent(threes.seasonWon, threes.seasonPlayed);

    let result =
  `
  ${chalk.yellow(this.character)} - ${chalk.cyan(this.realm)}\n
  ===== 2v2 =====\n
  Rating: ${twos.rating}
  Weekly Record: ${twos.weeklyWon}-${twos.weeklyLost} (${this._colorizePercent(twosWeeklyPercent)}%)
  Season Record: ${twos.seasonWon}-${twos.seasonLost} (${this._colorizePercent(twosSeasonPercent)}%)

  ===== 3v3 =====\n
  Rating: ${threes.rating}
  Weekly Record: ${threes.weeklyWon}-${threes.weeklyLost} (${this._colorizePercent(threesWeeklyPercent)}%)
  Season Record: ${threes.seasonWon}-${threes.seasonLost} (${this._colorizePercent(threesSeasonPercent)}%)
  `;
    return result;
  }

  _calculatePercent(won, played) {
    let percent = (won / played * 100 + '').slice(0, 4);
    percent = isNaN(percent) ? '0.0' : percent;
    return percent;
  }

  _colorizePercent(percent) {
    if (percent === '0.0') {
      return chalk.grey(percent);
    } else if (percent < 50) {
      return chalk.red(percent);
    } else if (percent === 50) {
      return chalk.yellow(percent);
    } else {
      return chalk.green(percent);
    }
  }
}

module.exports = Arena;
