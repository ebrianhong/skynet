#!/usr/bin/env node
'use strict';

const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../commands/arena/.env') });

const Arena = require('../commands/arena');

let arena = new Arena;
arena.init();
