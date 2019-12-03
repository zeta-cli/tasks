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

module.exports = {

  /**
   * Read test from sources.
   * 
   * @param {string} sourcePath Source path
   */
  readTestFromSource(sourcePath) {

    gulp.src(sourcePath).
    // Use gulp to read source
    console.log('readTestFromSource')

  },


};

