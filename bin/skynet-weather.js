#!/usr/bin/env node
'use strict';

const Weather = require('../commands/weather');

let weather = new Weather;
weather.init();
