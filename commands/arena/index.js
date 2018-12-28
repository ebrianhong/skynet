const { prompt } = require('inquirer');
const axios = require('axios');
const querystring = require('querystring');
const chalk = require('chalk');

class Arena {
  constructor() {
    this.client_id = process.env.WOW_CLIENT_ID;
    this.client_secret = process.env.WOW_CLIENT_SECRET;
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
    ]
  }

  async init() {
    let character = '';
    let realm = '';
    await prompt(this.questions)
    .then(answers => {
      character = answers.character;
      realm = answers.realm;
    })
    let token = await this.grabToken(this.client_id, this.client_secret)
    let result = await this.getPVP(token, character, realm)
    console.log(result)
  }

  grabToken(id, secret) {
    let token = axios.post('https://us.battle.net/oauth/token', querystring.stringify({
      grant_type: 'client_credentials',
      client_id: id,
      client_secret: secret
    }))
    .then(res => {
      return res.data.access_token;
    })
    .catch(e => {
      console.log(e)
    })
    return token;
  }

  getPVP(token, character, realm) {
    let data = axios.get(`https://us.api.blizzard.com/wow/character/${realm}/${character}?fields=pvp&access_token=${token}`)
      .then(res => {
        return res.data.pvp.brackets;
      })
      .catch(e => {
        console.log(e);
      })
    return data;
  }
}

module.exports = Arena;
