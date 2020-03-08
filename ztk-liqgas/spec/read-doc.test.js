const { readDoc } = require('../src/index');


test('Read python doc', (done) => {

  readDoc({}, { paths: `${process.cwd()}/assets/python/**/*.py`, verbose: true}).then(result => {
    done();
  });

});
