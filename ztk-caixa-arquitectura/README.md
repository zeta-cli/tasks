# Caixa Arquitectura package

Set of tasks associated with the caixa arquitectura project.

## Getting Started

Before you can execute this task, you must have zeta-cli installed ([zeta-cli README](https://github.com/zeta-cli/cli/blob/master/README.md)).


### Installing

Install task caixa-arquitectura using zeta-cli:

```bash
zeta-cli task install caixa-arquitectura
```

### Defined tasks

* __generateDoc__. Generate testing documentation from a list of Java files using a world template.

* __readTest__. Generate a json from parsed test classes.


### Use example

Show help:
```bash
zeta-cli task run caixa-arquitectura --help
```

To generate a doc-test-docx file with the existing source code in C:\project\caixa\src\: 

```bash
z task run caixa-arquitectura --scopes-0-name "MCA" --scopes-0-paths  "C:\project\caixa\src\**\*" --template "C:\project\caixa\template\uat_template.docx" --output "C:\project\caixa\template\output\doc-test.docx" --outputImage "C:\project\caixa\template\output\images"
```

To parse java test files:

```bash
z task run caixa-arquitectura.readTest --paths "C:\project\caixa\src\**\*" --output "C:\parsed_output.json" --verbose true
```

## Authors

* **Antonio Hermosilla**
  