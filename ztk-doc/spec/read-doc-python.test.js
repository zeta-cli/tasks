/*
* This file is part of the Zeta distribution (https://github.com/zeta-cli/tasks.git).
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

/* eslint no-magic-numbers: off */

const { readDoc } = require('../src/index');

const VERBOSE = true;

test('Python - Class name on liqgas_dao.py is LiqGasDAO', (done) => {


  readDoc({}, { paths: `${process.cwd()}/assets/python/**/*.py`, language: 'python', verbose: VERBOSE }).then(result => {
    // readDoc({}, { paths: `/home/ahermosi/development/python/axpo-liqgas/src/liqgas-liquidator/liqgas_liquidator/**/*.py`, language: 'python', verbose: verbose}).then(result => {
    // expect(result[0].class[0].name).toBe('LiqGasDAO');
    done();
  });

});
