# ChatBot Builder Core

This module is core of chatbot-builder library. It is built with javascript (ES6) and Node.js. There is another repository written with typescript [here](https://github.com/DiUS/chatbot-builder-ts)

PLEASE NOTE: This project is in a WIP status, and is not ready for production. It can be terminiated at any time, based on the decision of the team.

## Get Started

1. Install dependencies
```bash
$ npm i
```
or 
```bash
$ yarn
```

## Run the code

```bash
$ npm start
```
or
```bash
$ yarn start
```

## Test

```bash
$ npm run test
```
or
```bash
$ yarn run test
```

## How does it work?

- The application will load the global configurations from `.exchatrc` file, located at the root directory
- It traverse the ChatBot intents folder and find the matched files, which you set in the configurations in the previous step
- All the scripts to generate chatbot intents or slots has followed the DSL pattern, which then get loaded into Node.js (vm)[https://nodejs.org/api/vm.html#vm_constructor_new_vm_sourcetextmodule_code_options] and executed in the vm sandbox.
- The output JSON from the last step will be exported to a seperated folder, which you can config in `.exchatrc`, with the timestamp and chatobot name in its filename.

## Usage and APIs

#### Intents
- `withIntent(name: string, callback: function)`
  Start a new intent component with the given name. If you don't specify the callback, the function will generate an intent object with all the fields set as default values:

  ```js
    withIntent('Smalltalk_Goodbye', null);
  ```

  The callback functions can accept a chain of API methods:

  ```js
  withIntent('Smalltalk_Goodbye', () => {
    utterances(['bye', 'goodbye', 'see you']);
  });
  ```

- `utterance(str: string)`
  Add a new utterance to the intent:

  ```js
  utterance('How are you');
  ```

- `utterances(str: string[])`
  Add multiple uterances to the intent

  ```js
  utterances(['How are you', 'Hows going', 'Hi']);
  ``` 

- `utteranceWithPattern(pattern: string)`
  Implement [intent-utterance-expander](https://github.com/miguelmota/intent-utterance-expander) to generate custom utterances with the given pattern: 

  ```js
  utteranceWithPattern(`(catch|see) you later`);
  /* You will get 
  catch you later
  see you later 
  */
  ```
  
- `responseMessage(content: string | object)`
  Add the response to the intent to the specified group.

  ```js
  responseMessage(`Bye! I look forward to chatting with you again soon.`)
  ```

  You can chain this method with `ofCustomType(contentType: string)` and `ofGroup(groupNumber: number)` that allows you to set `contentType` and `gourpNumber` of the message:

  ```js
  responseMessage(`Bye! I look forward to chatting with you again soon.`).ofCustomType('CustomLoad').ofGroup(3);
  /* This will output the message
  {
    "content": "Bye! I look forward to chatting with you again soon.",
    "contentType": "CustomPayload",
    "groupNumber": 3
  }
  */
  ```

- `responseCard()`:
  Add the responseCard field to the intent, it will generate a `responseCard` field with the default values: 
    ```js
      withResponseCard();
    ```
  
    ```json
      {
        version: 1,
        contentType: 'application/vnd.amazonaws.card.generic',
        genericAttachments: []
      }
    ```
  
  You can chain this method with:
  
  - `ofVersion(version: string)`: Set the version
  - `ofContentType(contentType: string)`: Set the contentType
  - `withLink(link: object)`: Insert a link attachment to `genericAttachments` field
  - `withButton(button: string | object)`: Insert a button attachment to `genericAttachments` field
 
  A comprehansive usage of `responseCard` will look like the following:

  ```js
    responseCard()
        .ofVersion(3.2)
        .ofContentType('custom-type')
        .withLink({
          title: 'More info',
          attachmentLinkUrl: 'https://google.com.au',
          subTitle: 'clickForMoreInfo'
        })
        .withButton('What do you want?')
        .withButton('Do you want to buy a book?');
  ```

## Resources

- [Amazon Lex](https://docs.aws.amazon.com/lex/latest/dg/what-is.html)
- [Import/Export JSON format](https://docs.aws.amazon.com/lex/latest/dg/import-export-format.html)

## License

chatbot-builder is licensed under a [MIT License](./LICENSE).

