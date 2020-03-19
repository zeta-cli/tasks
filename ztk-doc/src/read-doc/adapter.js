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

module.exports = {

  // Python adapter.

  python: data => {

    const transformer = {

      // reStructured
      reStructured: (c) => {
        try {
          const lines = c.doc.split('\n');
          let description = [];
          let inDescription = true;
          lines.forEach(line => {
            inDescription = false;
            if (line.search(/^\s*:return(s)?\s*:\s*/) !== -1) {
              c.return = { type: '', description: line.split(/\s*:return(s)?\s*:\s*/)[2] }
            } else if (line.search(/^\s*:rtype\s*:\s*/) !== -1) {
              if (!c.return) c.return = {};
              c.return.type = line.replace(/s*:rtype\s*:\s*/g, '').trim();
            } else if (line.search(/^\s*:param\s+\w*:\s*/) !== -1) {
              let data = line.replace(/\s*:param\s*/g, '').split(':');
              node = { type: '', name: data[0].trim(), description: data[1].trim() };
              if (!c.parameters) { c.parameters = []; }
              c.parameters.push(node);
            } else if (line.search(/^\s*:type\s+\w*:\s*/) !== -1) {
              let data = line.replace(/\s*:type\s*/g, '').split(':')
              let param = c.parameters.find(p => p.name = data[0].trim());
              if (param) {
                param.type = data[1].trim();
              }
            } else if (!inDescription) {
              inDescription = true;
              description.push(line.trim());
            }
          });
          c.description = description;
        } catch (e) { c.error = e.message; }
      },

      // google
      google: (c) => {
        try {
          let data = c.doc.split(/\s*Args\s*:|Returns:\s+/);
          c.description = data[0].split('\n');
          let parameters = data[1];
          if (parameters) {
            c.parameters = parameters.split('\n').reduce((p, c) => {
              if (c.trim()) {
                if (c.search(/\w*\s*:/) !== -1 || c.search(/\w*\s*\(\s*\w*\s*\):/) !== -1) {
                  p.push(c);
                } else {
                  p[p.length - 1] = p[p.length - 1] + ' ' + c.trim();
                }
              }
              return p;
            }, []).map(p => {
              let param = p.match(/(\w*)\s*(\((\w*)\))?\s*:(.*)/);
              return { type: param[3] ? param[3] : '', name: param[1], description: param[4] ? param[4].trim() : '' }
            });
          }
        } catch (e) { c.error = e.message; }
      },

      // default
      default: (c) => {
        try {
          const lines = c.doc.split('\n');
          let description = [];
          lines.forEach(line => {
            description.push(line.trim());
          });
          c.description = description;
        } catch (e) { c.error = e.message; }
      },
    };

    function typeDocString(doc) {
      if (doc.search(/\s*:param\s+\w*:/) !== -1) {
        return 'reStructured';
      } else if (doc.search(/\s*Args\s*:|Returns:\s+/) !== -1) {
        return 'google';
      }
      return 'default';
    }


    function getFileInfo(file) {

      if (!file.childs) { return null; }

      return file.childs.reduce((p, c) => {
        if (c.doc) {
          c.doc = c.doc.replace(/\s{3,}/g, '\n');
        }
        if (c.id === 'class') {
          p.class = p.class || [];
          c.description = c.doc;
          p.class.push(c);
          p.hasClass = true;
        } else if (c.id === 'function') {
          c.type = typeDocString(c.doc);
          c.parameters = [];
          transformer[c.type] && transformer[c.type](c);
          let source = p.class ? p.class[p.class.length - 1] : p;
          source.functions = source.functions || [];
          source.functions.push(c);
          if (!p.class) {
            p.hasFunctions = true;
          }
        }
        return p;
      }, { file: file.id, name: file.name });
    }

    console.log(JSON.stringify(data, null, 2));
    return data.map(getFileInfo).filter(f => f);
  }
};
