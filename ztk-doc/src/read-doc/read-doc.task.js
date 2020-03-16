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
const adapter = require('./adapter');
const fs = require('fs').promises;
const microgrammar = require('./microgrammar');
const path = require('path');

const task = {

  /**
   * Read doc from sources.
   * 
   * @param {Object} context Execution context
   * @param {{paths: Array, language: string, ouput: string, verbose: boolean}} params Params
   * @returns {Promise} Promise
   */
  readDocFromSource(context, params) {
    return new Promise((resolve, reject) => {
      if (!microgrammar[params.language]) {
        reject(`Unsupported language ${params.language || 'EMPTY'}`);
      } else {
        let parsedFiles = [];
        gulp.src(params.paths)
          .pipe(task.getDocFromSourceCode(params.language, parsedFiles))
          .pipe(gulp.dest('./no_ouput')).on('end', async () => {
            parsedFiles = adapter[params.language] ? adapter[params.language](parsedFiles) : parsedFiles;
            if (params.output) { await fs.writeFile(params.output, JSON.stringify(parsedFiles, null, 2)); }
            if (params.verbose) { console.log(JSON.stringify(parsedFiles, null, 2)); }
            resolve(parsedFiles);
          });
      }
    });
  },

  /**
   * Parse python doc from file.
   * 
   * @param {string} language Code language
   * @param {Array} parsedFiles Parsed files
   * @returns {Object} through2 object
   */
  getDocFromSourceCode(language, parsedFiles) {
    return through2.obj((chunk, enc, cb) => {
      if (!chunk.isDirectory() && chunk.contents) {
        const content = chunk.contents.toString();
        const parsedFile = micro.parser(chunk.path, content, microgrammar[language], null, { content: false, parent: true });
        if (!parsedFile.error) {
          parsedFiles.push(this.addFileInfo(parsedFile));
        }
        // var buffer = new Buffer.from(lines.join('\n').toString(), 'binary');
        // chunk.contents = buffer;
      }
      cb(null); // Muy importante para no generar ficheros. Para generar: cb(null, chunk);
    });
  },

  addFileInfo(file) {
    if (file) {
      file.name = path.basename(file.id);
    }
    return file;
  }

};


module.exports = {
  readDoc: task.readDocFromSource
};