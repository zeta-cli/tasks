const { generateDoc, readTest } = require('../src/index');

beforeEach(() => {
  jest.setTimeout(30000);
});

test('Testing generate doc task caixa-arquitectura:generateDoc', async (done) => {

  // --scopes-name MCA --scopes-paths path1,path2 --scopes-name BCK --scopes-paths path1,path2 --template assets/docs/uat_template.docx --output assets/output.docx

  const options = {
    scopes: [
      { name: 'MCA', paths: [`${process.cwd()}/assets/class/**/*`] },

    ],
    template: `${process.cwd()}/assets/docs/uat_template.docx`,
    output: `${process.cwd()}/assets/output.docx`,
    imageOutput: `${process.cwd()}/assets/images`,
  };

  console.log(JSON.stringify(options));

  await generateDoc({}, options);

  done();
});