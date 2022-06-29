
# GULS

Github User Language Statistics (GULS) is a low-weight node module that gets an array of all the languages a github user has used.

<br  />

## Getting Started

To install GULS with npm run: 

```properties
npm i guls
```

<br  />

or clone this repo with git.

<br />

## Usage

```js
const guls = require('guls');
let languages = await guls('YOUR_NAME');
console.log(languages);
```