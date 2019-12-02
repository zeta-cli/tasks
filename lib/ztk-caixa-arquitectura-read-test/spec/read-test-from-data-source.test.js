const readTest = require('../src/index').default;

// beforeAll(() => {
//   // https://steps.everis.com/git/IWOKIO/iwokio/blob/master/iwok-back/conf/core/plugins/js/iwok-plugin-js-core/gulp-code-ast/src/token-parser/token.languages.js

//   const microgrammar = {
//     tokens: {
//       package: { pattern: /package\s*(.*);/, fragments: ['name'] },
//       import: { pattern: /import\s*(static)?\s*(.*);/, fragments: ['modifier', 'name'] },
//       class: { pattern: /(public|private|protected)\s*class\s*(\w*)\s*\{/, fragments: ['modifier', 'name'] },
//       comments: { pattern: /(\/\*\*(\s*\*\s@.*)*\s*\*\s*\/)/, fragments: ['comment'] },

//     }
//   };

//   ast = parser('test', code, microgrammar, null, { content: false, parent: false });
// });

test('Java class code', () => {
  readTest();
});

