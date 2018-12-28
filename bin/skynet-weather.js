#!/usr/bin/env node
'use strict';

const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../commands/weather/.env') });

const Weather = require('../commands/weather');

let weather = new Weather;
weather.init();
