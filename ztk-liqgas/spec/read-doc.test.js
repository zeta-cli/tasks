const { readDoc } = require('../src/index');


test('Read python doc', (done) => {

  readDoc({}, { paths: `${process.cwd()}/assets/class/**/*.java`, verbose: true}).then(result => {
    done();
  });

});
