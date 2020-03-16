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
const { ZetaPackage } = require('@zeta-cli/z-cli-tools');

/**
 * LiqGas Zeta Package Definition
 */
module.exports = new ZetaPackage(
  {
    name: 'liqgas',
    description: 'Set of tasks to documentation code',
    tasks: [
      require('./read-doc/read-doc.schema.json'),
      require('./generate-doc/generate-doc.schema.json')
    ],
    doc: fs.readFileSync(path.join(__dirname, './../README.md')).toString()
  },
  {
    readDoc: require('./read-doc/read-doc.task').readDoc,
    generateDoc: require('./generate-doc/generate-doc.task').generateDoc
  }
);
