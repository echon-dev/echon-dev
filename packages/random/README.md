# `@echon-dev/random-helpers`

A zero dependency package to generate random strings and alphabets.

## Usage

### `generateRandomString`

```ts
import { generateRandomString } from '@echon-dev/random-helpers';

const randomString = generateRandomString(10, 'abc123');

console.log(randomString); // '1c3b2a1c3b' // random string
```

### `generateRandomAlpha`

Length defaults to 10 if not provided.

```ts
import { generateRandomAlpha } from '@echon-dev/random-helpers';

const randomAlpha = generateRandomAlpha(10);

console.log(randomAlpha); // 'aBcDeFgHiJ' // random string
```

Altervaly, you can use `generateRandomLowerAlpha` and `generateRandomUpperAlpha` to generate random lower and upper case alphabets respectively.

```ts
import { generateRandomLowerAlpha, generateRandomUpperAlpha } from '@echon-dev/random-helpers';

const randomLowerAlpha = generateRandomLowerAlpha(10);
const randomUpperAlpha = generateRandomUpperAlpha(10);

console.log(randomLowerAlpha); // 'abcdefghij' // random string
console.log(randomUpperAlpha); // 'ABCDEFGHIJ' // random string
```