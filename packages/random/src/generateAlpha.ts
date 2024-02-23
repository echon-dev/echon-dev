import { generateRandomString } from "./generateRandomString";
import {
  alpha,
  lowerAlpha,
  upperAlpha,
} from "./constants";

export function generateAlpha(length: number = 10) {
  return generateRandomString(length, alpha);
}

export function generateLowerAlpha(length: number = 10) {
  return generateRandomString(length, lowerAlpha);
}

export function generateUpperAlpha(length: number = 10) {
  return generateRandomString(length, upperAlpha);
}
