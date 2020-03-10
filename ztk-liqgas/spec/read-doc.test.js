const { readDoc } = require('../src/index');


test('Class name on liqgas_dao.py is LiqGasDAO', (done) => {

  readDoc({}, { paths: `${process.cwd()}/assets/python/**/*.py`, verbose: false}).then(result => {
    expect(result[0].class[0].name).toBe('LiqGasDAO');
    done();
  });

});
