/*
* This file is part of the Zeta distribution (https://github.com/hermosillaeveris/zeta-libs.git).
* Copyright (c) 2019 Zeta Team.
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, version 3.
*
* This program is distributed in the hope that it will be useful, but
* WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
* General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

const path = require('path');
const fs = require('fs');

module.exports.info = {
  name: 'hello-world',
  description: 'Hello world example task.',
  tasks: {
    default: {
      name: 'default',
      params: {
        type: 'object',
        properties: {
          name: { type: ['string', 'array'], description: 'Name to show in message.' }
        },
        required: [],
        additionalProperties: false
      }
    }
  },
  doc: fs.readFileSync(path.join(__dirname, './../README.md')).toString()
};

module.exports.default = (context, options) => { console.log(`Hello ${options.name ? options.name : 'world'} !!`); };
