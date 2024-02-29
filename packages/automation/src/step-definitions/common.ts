import { Given, Then } from '@wdio/cucumber-framework';
import { expect, browser } from '@wdio/globals'

import Retriever from '../pageobjects/retriever.page.js';
import Selection from '../pageobjects/selection.page.js';

function setup() {
  Given(/^I navigate to (.+)$/, async function handler(url) {
    await browser.url(url.replace(/"/g, ''));
  });
  
  Then(/^content for \"([^\"]*)\" should be$/, async function handler(fieldName, expectedText) {
    const selector = await Selection.getSelector(fieldName);
    const actualText = await Retriever.getFieldText(selector);
    expect(actualText).toBe(expectedText);
  });
}

export default setup;