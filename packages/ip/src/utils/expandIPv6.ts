function getColonCount(ipv6: string) {
  let count = 0;

  for (let i = 0; i < ipv6.length; i++) {
    if (ipv6[i] === ':') count++;
  }

  return count;
}

function expandIPv6(ipv6: string) {
  const colonLength = getColonCount(ipv6);
  return ipv6
    .replace(/::/, () => `:${':'.repeat(7 - colonLength)}:`)
    .split(':')
    .map((part) => `0000${part}`.slice(-4))
    .join(':');
}


export {
  expandIPv6,
  getColonCount,
};
