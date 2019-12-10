const { generateDoc, readTest } = require('../src/index');

test('Testing generate doc task caixa-arquitectura:generateDoc', async (done) => {

  await generateDoc({}, {
    testPath:  `${process.cwd()}/assets/class/**/*.java`,
    templatePath: `${process.cwd()}/assets/docs/uat_template.docx`, 
    outputPath: `${process.cwd()}/assets/output.docx`
  });

  done();
});
