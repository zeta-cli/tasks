const { readTest  } = require('../src/index');


test('Testing read test task caixa-arquitectura:readTest', (done) => {

  readTest({}, { source: `${process.cwd()}/assets/class/**/*.java` }).then( result => {
    console.log(JSON.stringify(result, null, 2));
    done();
  });

});
