bara-cli
========

Bara CLI Application - Created For Creating

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/bara-cli.svg)](https://npmjs.org/package/bara-cli)
[![Downloads/week](https://img.shields.io/npm/dw/bara-cli.svg)](https://npmjs.org/package/bara-cli)
[![License](https://img.shields.io/npm/l/bara-cli.svg)](https://github.com/barajs/bara/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g bara-cli
$ bara COMMAND
running command...
$ bara (-v|--version|version)
bara-cli/2.0.0 darwin-x64 node-v11.12.0
$ bara --help [COMMAND]
USAGE
  $ bara COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`bara create [APPNAME]`](#bara-create-appname)
* [`bara deploy [FILE]`](#bara-deploy-file)
* [`bara help [COMMAND]`](#bara-help-command)

## `bara create [APPNAME]`

Create new Bara application

```
USAGE
  $ bara create [APPNAME]

OPTIONS
  -h, --help                              show CLI help
  -t, --template=backend|frontend|devops  Choose a template

EXAMPLE
  $ bara create
          Create new Bara application
```

_See code: [src/commands/create.ts](https://github.com/barajs/bara/blob/v2.0.0/src/commands/create.ts)_

## `bara deploy [FILE]`

Deploy Bara application to Bara Space

```
USAGE
  $ bara deploy [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/deploy.ts](https://github.com/barajs/bara/blob/v2.0.0/src/commands/deploy.ts)_

## `bara help [COMMAND]`

display help for bara

```
USAGE
  $ bara help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.6/src/commands/help.ts)_
<!-- commandsstop -->
