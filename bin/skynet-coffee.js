#!/usr/bin/env node
'use strict';

const path = require('path');
const Coffee = require('../commands/coffee');

let coffee = new Coffee;
coffee.init();
