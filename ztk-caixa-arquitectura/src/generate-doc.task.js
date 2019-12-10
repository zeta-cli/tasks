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
const { docxtemplater } = require('@zeta-cli/z-docxtemplater');
const { readTest } = require('./read-test.task');

const generateDocTask = {

  /**
   * Read test from sources.
   *
   * @param {Object} context Execution context
   * @param {{testPath: string, templatePath: string, outputPath: string}} params Parameters
   * @returns {Promise} Promise data { file: outputFilePath }
   */
  async generateDoc(context, params) {

    const testInfo = await readTest({}, { source: params.testPath });

    const test = testInfo.reduce((p, c) => {
      if (c.childs) {
        c.childs.map(c => c.id === 'test' && p.push(c))
      }
      return p;
    }, []);

    console.log(test);

    return docxtemplater({
      test: test.map((t, i) => { t.index = i + 1; return t; })
    }, params.templatePath, params.outputPath);
  }
};

module.exports = {
  generateDoc: generateDocTask.generateDoc
};