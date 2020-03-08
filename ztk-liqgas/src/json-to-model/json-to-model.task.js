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
const path = require('path');
const util = require('util');
const fs = require('fs').promises;
const ejs = require('ejs');
const _ = require('lodash');

const TEMPLATE_DIR = path.join(__dirname, '../../templates');

/**
 * Create model from JSON file.
 * 
 * @param {Object} context Execution context
 * @param {{jsonFile: string, output: string, name: string }} params Parameters
 * @returns {Promise} Promise data { file: outputFilePath }
 */
async function jsonToModel(context, params) {
  try {
    const json = await (await fs.readFile(params.jsonFile)).toString();
    const renderFile = util.promisify(ejs.renderFile);
    const result = await renderFile(path.join(TEMPLATE_DIR, 'model_py.ejs'), { data: JSON.parse(json), name:params.name, _: _ }, {});

    return result;

  } catch (err) {
    console.log(err);
  }
};

module.exports = jsonToModel;