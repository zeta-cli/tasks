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
const { readTest } = require('./tasks/read-test.task');
const { generateDoc } = require('./tasks/generate-doc.task');

// Generate Doc JSON Schema

const _generateDoc = {
  name: 'generateDoc',
  description: 'Generate testing documentation from a list of Java files using a world template',
  params: {
    type: 'object',
    properties: {
      scopes: {
        type: 'array',
        description: 'Scope list',
        items: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            paths: { type: ['array', 'string'], items: { type: 'string' } },
          },
          required: ['name', 'paths']
        }
      },
      template: { type: 'string', description: 'Path to template' },
      output: { type: 'string', description: 'Path to output file' },
      outputImage: { type: 'string', description: 'Path to output image files' }
    },
    required: ['scopes', 'template', 'output', 'outputImage'],
    additionalProperties: false
  }
};

// Read Test JSON Schema
const _readTest = {
  name: 'readTest',
  description: 'Generate a json from parsed test classes',
  params: {
    type: 'object',
    properties: {
      source: { type: ['string', 'array'], description: 'Source code where the test files are located. You can use the gulp glob format.' },
      output: { type: 'string', description: 'File for parsed test ouput' }
    },
    required: ['pattern', 'text'],
    additionalProperties: false
  }
};

module.exports.info = {
  name: 'caixa-arquitectura',
  description: 'Set of tasks associated with the caixa arquitectura project.',
  tasks: {
    default: _generateDoc,
    generateDoc: _generateDoc,
    readTest: _readTest
  },
  doc: fs.readFileSync(path.join(__dirname, './../README.md')).toString()
};

module.exports.generateDoc = generateDoc;
module.exports.readTest = readTest;
module.exports.default = generateDoc;