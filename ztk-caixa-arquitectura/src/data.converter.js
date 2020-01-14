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
module.exports = (data) => {

  function updateSimpleValue(test) {
    Object.keys(test).forEach((k) => {
      if (Array.isArray(test[k]) && test[k].length === 1 && test[k][0].value) {
        test[k] = test[k][0].value;
      }
    });
  }

  function getReturnFromDeclaration(declaration) {
    const list = declaration.split(' ');
    list.pop();
    return list.join(' ');
  }

  function getMethodNameFromDeclaration(declaration) {
    return declaration.split(' ').pop();
  }

  function getContentFormatted(content) {
    return content.join('\n').replace(/ * /g, '\n * ');
  }

  return data.map((d) => {
    if (d.id && d.childs) {
      d.childs.forEach((c) => {
        if (c.id === 'test') {
          c.return = getReturnFromDeclaration(c.declaration);
          c.methodName = getMethodNameFromDeclaration(c.declaration);
          c.content = getContentFormatted(c._content);
          updateSimpleValue(c);
        }
      });
    }
    return d;
  });

};
