import { browser } from '@wdio/globals';

class Retriever {
  async getFieldText(selector: string) {
    const element = await $(selector);
    await element.waitForDisplayed({ timeout: 75000 });
    await element.scrollIntoView({ block: 'center' });
    await browser.waitUntil(() => element.isDisplayedInViewport(), { timeout: 75000 });
    const text = await element.getText();
    return text;
  }
}

export default new Retriever();
