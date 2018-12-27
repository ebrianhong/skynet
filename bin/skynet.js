#!/usr/bin/env node
'use strict';

require('dotenv').config();
const program = require('commander');

program
  .command('weather', 'get the weather')
  .alias('w');

program.parse(process.argv);
