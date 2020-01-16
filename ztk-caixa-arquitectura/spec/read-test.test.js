const { readTest } = require('../src/index');


test('Testing read test task caixa-arquitectura.readTest', (done) => {

  readTest({}, { paths: `${process.cwd()}/assets/class/**/*.java`, verbose: true}).then(result => {
    done();
  });

});
