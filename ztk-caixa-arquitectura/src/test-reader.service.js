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
var through2 = require('through2');

module.exports = {

  /**
   * Read test from sources.
   *
   * @param {string} sourcePath Source path
   * @returns {Promise} Promise
   */
  readTestFromSource(sourcePath) {
    return new Promise((resolve, reject) => {

      const parsedFiles = [];

      gulp.src(sourcePath)
        .pipe(module.exports.parseJavaTestFile(parsedFiles))
        .pipe(gulp.dest('./output')).on('end', resolve);
    });

  },

  parseJavaTestFile(parsedFiles) {
    return through2.obj((chunk, enc, cb) => {
      if (!chunk.isDirectory() && chunk.contents) {
        const content = chunk.contents.toString();

        console.log(content);
        // var buffer = new Buffer.from(lines.join('\n').toString(), 'binary');
        // file.contents = buffer;
      }
      cb(null);
      // cb(null, file);
    });
  }


};
