# `@echon-dev/ip-helpers`

## Usage

```
import { expandIPv6 } from '@echon-dev/ip-helpers';

console.log(expandIPv6('fe80:685::ff:fe72:c4fa')); // fe80:0685:0000:0000:0000:00ff:fe72:c4fa
console.log(expandIPv6('::1')); // 0000:0000:0000:0000:0000:0000:0000:0001
```
