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

const { readDoc } = require('../read-doc/read-doc.task');
const { docxtemplater } = require('@zeta-cli/z-docxtemplater');
// const path = require('path');
// const htmlImageCapture = require('@zeta-cli/z-html-image-capture');
// const eclipseUnitTestGenerator = require('../eclipse-unit-test.generator');

const generateDocTask = {

  /**
   * Read test from sources.
   * 
   * zeta-cli task run liqgas:generateDoc --params-json '{ "scopes": [ { "name": "MCA", "paths": [ "path1"] } ], "template": "mytemplate.docx", "output": "mydoc.docx"  }
   * zeta-cli task run liqgas:generateDoc --paths "/python/project/**\/*.py" --template "mytemplate.doc" --output "dt.doc" --verbose true
   * 
   * @param {Object} context Execution context
   * @param {{paths: string, language: string, template: string, output: string, verbose: boolean}} params Parameters
   * @returns {Promise} Promise data { file: outputFilePath }
   */
  async generateDoc(context, params) {
    console.log(params);
    // Read doc from documentation
    const docs = await readDoc(context, { paths: params.paths, language: params.language, verbose: params.verbose });

    console.log(JSON.stringify(docs, null, 2));


    // Generate images from tests
    // await generateDocTask._generateCodeImagesFromTest(data.test, params.outputImage);
    // await generateDocTask._generateJUnitImagesFromTest(data.scopes, params.outputImage);

    return docxtemplater({ files: docs }, params.template, params.output);
  }

};

module.exports = {
  generateDoc: generateDocTask.generateDoc
};