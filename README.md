# ChatBot Builder

This module is to help DiUS team to bootstrap and maintain a ChatBot project with Amazon Lex service. It is built with javascript (ES6), Node.js and [lerna](https://github.com/lerna/lerna) in a monorepo pattern.

The original idea is from [@sergei-matheson](https://github.com/sergei-matheson) who has suggested a more declarative way to manipulate the bot-definition, instead of managing and editing the JSON file directly. So we decided to start this new project and try to explore new approach to fulfill our requirements, which helps to spin up new ChatBot quickly and smoothly, as well as maintaining them.

PLEASE NOTE: This project is in a WIP status, and is not ready for production. It can be terminiated at any time, based on the decision of the team.

### Getting Started

1. Install lerna CLI 
```bash
$ npm i -g lerna
```
2. Link the dependencies. Go to the root directory and run
```bash
$ lerna bootstrap
```

#### Run the code

```bash
$ lerna run start
```

A simple CLI has been created in `chatbot-builder-core` which enables you to use the command `chatbot-builder` in your terminal. To get it running, you can run `npm link` in `chatbot-builder-core` directory and go to `chatbot-builder-example` and run `chatbot-builder` command in your terminal to test the result.

```bash
$ chatbot-builder
```

![alt text](https://s3-ap-southeast-2.amazonaws.com/mattyao-github-assets/chatbot-builder-cli.gif "chatbot-builder-cli")

#### Test

```bash
$ lerna run test
```

if you want to target a single module to test, simply run
```bash
$ lerna run test --scope=chatbot-builder-core
```

Alternatively, you can manually go to each module and run test in the traditional way:
```bash
$ npm run test
```

### Portal

- [chatbot-builder-core](https://github.com/DiUS/chatbot-builder/tree/monorepo-refactor/packages/chatbot-builder-core)
- [chatbot-builder-example](https://github.com/DiUS/chatbot-builder/tree/monorepo-refactor/packages/chatbot-builder-example)

## Resources

- [Amazon Lex](https://docs.aws.amazon.com/lex/latest/dg/what-is.html)
- [Import/Export JSON format](https://docs.aws.amazon.com/lex/latest/dg/import-export-format.html)

## License

chatbot-builder is licensed under a [MIT License](./LICENSE).

