#!/usr/bin/env node
'use strict';

const program = require('commander');
const path = require('path');
const fs = require('fs');

let src = path.join(__dirname, '../commands');

let commandsArray = fs.readdirSync(src).map(cmd => {
  return path.join(src, cmd)
})

for (let i = 0; i < commandsArray.length; i++) {
  const cmd = require(commandsArray[i]);
  program
    .command(cmd.commandName, cmd.commandDescription)
    .alias(cmd.commandAlias);
}

program.parse(process.argv);
