#!/usr/bin/env node
'use strict';

const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../.env') });
const program = require('commander');

program
  .command('weather', 'get the weather')
  .alias('w');

program.parse(process.argv);
