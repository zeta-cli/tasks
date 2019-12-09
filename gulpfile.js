const gulp = require('gulp');
const through2 = require('through2');
const fs = require('fs');

var paths = {
  packages: {
    src: './ztk-*/package.json',
    dist: 'dist/'
  }
};

function createZtkList() {

  const taskList = [];

  return gulp.src(paths.packages.src)
    .pipe(through2.obj((chunk, enc, cb) => {
      if (!chunk.isDirectory() && chunk.contents) {
        const content = JSON.parse(chunk.contents.toString());
        taskList.push({
          name: content.name.replace('@zeta-cli/ztk-', ''),
          packageName: content.name,
          version: content.version, description: content.description,
          keywords: content.keywords
        });
      }
      cb(null);
    }))
    .pipe(gulp.dest(paths.packages.dist)).on('end', () => {
      fs.writeFile('ztk-list.json', JSON.stringify(taskList, null, 2), () => { });
    });
}

exports.createZtkList = createZtkList;
exports.default = createZtkList;
