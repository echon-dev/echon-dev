class Selectors {
  private _selectors: Record<string, Record<string, unknown>> = {};

  constructor(selectors: Record<string, Record<string, unknown>> = {}) {
    this._selectors = selectors;
  }

  getSelectorByPageName(fieldName: string, pageName: string) {
    return this._selectors[pageName][fieldName];
  }

  getSelector(path: string, delimiter = '.') {
    return this.getValueByPath(this._selectors, path, delimiter);
  }

  private getValueByPath(obj: Record<string, unknown>, path: string, delimiter = '.') {
    const keys = path.split(delimiter);

    function traverse(currentObj: any, keyIndex: number) {
      if (keyIndex === keys.length) {
        return currentObj;
      }

      const key = keys[keyIndex];
      const nextObj = currentObj[key];

      if (nextObj === undefined) {
        return undefined;
      }

      return traverse(nextObj as Record<string, unknown>, keyIndex + 1);
    }

    return traverse(obj, 0);
  }

  set selectors(selectors: Record<string, Record<string, unknown>>) {
    this._selectors = selectors;
  }

  get selectors() {
    return this._selectors;
  }
}

export default new Selectors();
