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
const path = require('path');
const htmlImageCapture = require('@zeta-cli/z-html-image-capture');
const eclipseUnitTestGenerator = require('../eclipse-unit-test.generator');

const generateDocTask = {

  /**
   * Read test from sources.
   * 
   * zeta-cli task run caixa-arquitectura:generateDoc --params-json '{ "scopes": [ { "name": "MCA", "paths": [ "path1"] } ], "template": "mytemplate.docx", "output": "mydoc.docx"  }
   * zeta-cli task run caixa-arquitectura:generateDoc --scopes-name MCA --scopes-paths path1,path2 --scopes-name MCA --scopes-paths path1,path2 --template assets/docs/uat_template.docx --output assets/output.docx --imageOutput assets/images
   * 
   * @param {Object} context Execution context
   * @param {{scopes: Array, template: string, output: string, outputImage: string, verbose?: boolean}} params Parameters
   * @returns {Promise} Promise data { file: outputFilePath }
   */
  async generateDoc(context, params) {
    // Get scopes with test
    const scopes = await generateDocTask._readTestFromScopes(params.scopes);

    // Trans
    const data = generateDocTask._getDataFromScopes(scopes);
    if (params.verbose) { console.log(JSON.stringify(data, null, 2)); }

    // Generate images from tests
    await generateDocTask._generateCodeImagesFromTest(data.test, params.outputImage);
    await generateDocTask._generateJUnitImagesFromTest(data.scopes, params.outputImage);

    return docxtemplater(data, params.template, params.output);
  },

  /**
   * Read test from scopes
   * @param {Array} scopes Scopes to read
   * @returns {Promise} Promises<[]> scopes completed with test
   */
  async _readTestFromScopes(scopes) {
    /** @type {Array} */
    let completedScopes = JSON.parse(JSON.stringify(scopes));

    // Scopes to array.
    if (completedScopes && !Array.isArray(completedScopes)) {
      completedScopes = [completedScopes];
    }

    // Add to scopes.test AST from source (scopes.test)
    await Promise.all(completedScopes.map(scope => (async () => { scope.test = await readTest({}, { paths: scope.paths }) })()));
    completedScopes.forEach(scope => { scope.test = generateDocTask._getTestFromAst(scope.test) });

    return completedScopes;
  },

  /**
   * Generate code images from test list
   * @param {Array} test Test list
   * @param {string} imageOutputPath Location to generated images
   * @returns {Promise} Promise to execution images.
   */
  async _generateCodeImagesFromTest(test, imageOutputPath) {
    const imagesPromises = [];
    if (test) {
      test.forEach(t => {
        t.image = path.join(imageOutputPath, `image-${t.tIndex}.png`);
        imagesPromises.push(htmlImageCapture.captureCodeUsingHighlightjs(
          t.image,
          t._content.map(l => l.replace(/^\t/g, '').replace(/\r\t/g, '\n')).join('\n'),
          // { style: '.hljs{display:block;overflow-x:auto;padding:.5em;background:#fff;color:#000}.hljs-comment,.hljs-quote,.hljs-variable{color:green}.hljs-built_in,.hljs-keyword,.hljs-name,.hljs-selector-tag,.hljs-tag{color:#00f}.hljs-addition,.hljs-attribute,.hljs-literal,.hljs-section,.hljs-string,.hljs-template-tag,.hljs-template-variable,.hljs-title,.hljs-type{color:#a31515}.hljs-deletion,.hljs-meta,.hljs-selector-attr,.hljs-selector-pseudo{color:#2b91af}.hljs-doctag{color:grey}.hljs-attr{color:red}.hljs-bullet,.hljs-link,.hljs-symbol{color:#00b0e8}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}' }
          { style: '.hljs{display:block;overflow-x:auto;padding:.5em;background:#fff;color:#000}.xml .hljs-meta{color:silver}.hljs-comment,.hljs-quote{color:#007400}.hljs-attribute,.hljs-keyword,.hljs-literal,.hljs-name,.hljs-selector-tag,.hljs-tag{color:#aa0d91}.hljs-template-variable,.hljs-variable{color:#3f6e74}.hljs-code,.hljs-meta-string,.hljs-string{color:#c41a16}.hljs-link,.hljs-regexp{color:#0e0eff}.hljs-bullet,.hljs-number,.hljs-symbol,.hljs-title{color:#1c00cf}.hljs-meta,.hljs-section{color:#643820}.hljs-built_in,.hljs-builtin-name,.hljs-class .hljs-title,.hljs-params,.hljs-type{color:#5c2699}.hljs-attr{color:#836c28}.hljs-subst{color:#000}.hljs-formula{background-color:#eee;font-style:italic}.hljs-addition{background-color:#baeeba}.hljs-deletion{background-color:#ffc8bd}.hljs-selector-class,.hljs-selector-id{color:#9b703f}.hljs-doctag,.hljs-strong{font-weight:700}.hljs-emphasis{font-style:italic}' }
        ));
      });
    }
    return Promise.all(imagesPromises);
  },

  /**
   * Generate JUnit images from test list
   * @param {Array} scopes Scope list
   * @param {string} imageOutputPath Location to generated images
   * @returns {Promise} Promise to execution images.
   */
  async _generateJUnitImagesFromTest(scopes, imageOutputPath) {
    const imagesPromises = [];
    scopes.forEach(scope => {
      //console.log(JSON.stringify(scope, null, 2));
      scope.test.forEach((t, i) => {
        t.imageEclipseJUnit = path.join(imageOutputPath, `junit-image-${scope.name}-${i}.png`);
        imagesPromises.push(htmlImageCapture.capturaFromHtml(
          t.imageEclipseJUnit,
          eclipseUnitTestGenerator.getHtmlTemplate(scope.test),
          { pageViewPort: { width: 746, height: 50 } }
        ));
      });
    });

    return Promise.all(imagesPromises);
  },

  _getTestFromAst(testAST) {
    return testAST.reduce((p, c) => {
      if (c.childs) {
        c.childs.map(c => c.id === 'test' && p.push(c))
      }
      return p;
    }, []);
  },

  /**
   * Read Data from scopes
   * @param {Array} scopes Array scopes with readed test
   * @returns {Object} Object
   */
  _getDataFromScopes(scopes) {
    scopes.map(s => { s.test.map((t, i) => { t.index = i + 1; }) });
    let i = 1;

    return {
      scopes: scopes,
      histories: scopes.reduce((p, c) => {
        const uniqueHistories = new Set();
        c.test.map(t => t.historia && uniqueHistories.add(t.historia));
        p.push({ scope: c.name, historiesUser: Array.from(uniqueHistories).map((h, i) => ({ name: h, scope: c.name, index: i + 1 })) });
        return p;
      }, []),
      test: scopes.reduce((p, c) => { c.test.map(t => { t.tIndex = i++; p.push(t); }); return p; }, [])
    };
  }

};

module.exports = {
  generateDoc: generateDocTask.generateDoc
};