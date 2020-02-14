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

const gulp = require('gulp');
const through2 = require('through2');
const micro = require('@zeta-cli/z-microgrammar');
const dataConverter = require('../data.converter');
const fs = require('fs').promises;

const microgrammar = {
  tokens: {
    package: { pattern: /package\s*(.*);/, fragments: ['name'] },
    import: { pattern: /import\s*(static)?\s*(.*);/, fragments: ['modifier', 'name'] },
    class: { pattern: /(public|private|protected)\s*class\s*(\w*)\s*\{/, fragments: ['modifier', 'name'] },
    test: {
      pattern: /(\/\*\*[^\/]*\/)\s*(@Test.*)\s*(public|private|protected)\s*([^\(]*)\(([^\)]*)\)\s*([^{]*){/, balanced: '{', end: '}', fragments: [
        {
          pattern: /(\/\*\*[^\/]*\/)\s*/, fragments: [
            { name: 'historia', pattern: /@Historia\s*\(([^)]*)/, fragments: ['value'] },
            { name: 'criterio', pattern: /@Criterio\s*\(([^)]*)/, fragments: ['value'] },
            { name: 'caso_de_prueba', pattern: /@Caso_de_prueba\s*\(([^)]*)/, fragments: ['value'] },
            { name: 'descripcion', pattern: /@Descripcion\s*\(([^)]*)/, fragments: ['value'] },
            { name: 'estado', pattern: /@Estado\s*\(([^)]*)/, fragments: ['value'] }
          ]
        },
        'annotation',
        'modifier',
        'declaration'
      ]
    },
  }
};

const readTestTask = {

  /**
   * Read test from sources.
   *
   * @param {Object} context Execution context
   * @param {{paths: string|Array, output?: string, verbose?: boolean}} params Parameters
   * @returns {Promise} Promise
   */
  readTestFromSource(context, params) {
    return new Promise((resolve, reject) => {
      const parsedFiles = [];
      gulp.src(params.paths)
        .pipe(readTestTask.parseJavaTestFile(parsedFiles))
        .pipe(gulp.dest('./no_ouput')).on('end', async () => {
          dataConverter(parsedFiles);
          if (params.output) { await fs.writeFile(params.output, JSON.stringify(parsedFiles, null, 2)); }
          if (params.verbose) { console.log(JSON.stringify(parsedFiles, null, 2)); }
          resolve(parsedFiles);
        });
    });
  },

  parseJavaTestFile(parsedFiles) {
    return through2.obj((chunk, enc, cb) => {
      if (!chunk.isDirectory() && chunk.contents) {
        const content = chunk.contents.toString();
        const parsedFile = micro.parser(chunk.path, content, microgrammar, null, { content: true, parent: true });

        parsedFiles.push(parsedFile);
        // var buffer = new Buffer.from(lines.join('\n').toString(), 'binary');
        // chunk.contents = buffer;
      }
      cb(null); // Muy importante para no generar ficheros. Para generar: cb(null, chunk);
    });
  }
};


module.exports = {
  readTest: readTestTask.readTestFromSource
};