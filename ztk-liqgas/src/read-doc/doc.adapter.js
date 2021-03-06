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
module.exports = data => {

  function getFileInfo(file) {
    return file.childs.reduce((p, c) => {
      if (c.id === 'class') {
        p.class = p.class || [];
        p.class.push(c);
      } else if (c.id === 'function') {
        let source = p.class ? p.class[p.class.length - 1] : p;
        source.functions = source.functions || [];
        source.functions.push(c);
      }
      return p;
    }, { file: file.id });
  }

  return data.map(getFileInfo);
};

