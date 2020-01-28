const path = require('path');
const fs = require('fs').promises;
const { jsonToModel } = require('../src/index');

test('Testing task liqgas.jsonToModel', async (done) => {

  const ASSET_DIR = path.join(__dirname, '../assets');

  const strTemplate = await jsonToModel({}, { jsonFile: path.join(ASSET_DIR, 'calendarios.json'), output: 'calendarios.py', name: 'calendario' });

  await fs.writeFile(path.join(ASSET_DIR, 'calendarios.py'), strTemplate);
  // console.log(strTemplate);
  
  done();
});
