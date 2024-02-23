export function generateRandomString(length: number, characterSet: string | string[]) {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characterSet[Math.floor(Math.random() * characterSet.length)];
  }

  return result;
}