const readTest = require('../src/index').default;


test('Java class code', (done) => {
  readTest(`${process.cwd()}/assets/class/**/*.java`).then( result => {
    done();
  });
});
