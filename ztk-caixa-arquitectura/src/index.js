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

// @Date: 2018.10.31
// 
// index.js
const
  path = require('path'),
  fs = require('fs');

module.exports = {
  info: {
    name: 'caixa-arquitectura',
    description: 'Set of tasks associated with the caixa arquitectura project.',
    tasks: {
      'read-test': {
        name: 'read-test',
        params: {
          type: 'object',
          properties: {
            source: { type: ['string', 'array'], description: 'Source code where the test files are located. You can use the gulp glob format.' },
            output: { type: 'string', description: 'File for parsed test ouput' }
          },
          required: ['pattern', 'text'],
          additionalProperties: false
        }
      }
    },
    doc: fs.readFileSync(path.join(__dirname, './../README.md')).toString()
  },
  tasks: {
    'read-test': require('./tasks/test-reader.task').readTestFromSource,
    'default': module.exports.tasks['read-test'],
  }
};