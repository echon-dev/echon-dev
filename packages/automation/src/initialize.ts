import setupCommon from  './step-definitions/common';
import Selection from "./pageobjects/selection.page";

type ExposedStepDefinitions = 'common';

const stepDefinitions: Record<ExposedStepDefinitions, () => void>= {
  common: setupCommon,
};

type InitializeFunctions = {
  withBuiltIn: (stepDefinition: ExposedStepDefinitions) => InitializeFunctions;
  withSelectors: (selectors: Record<string, Record<string, unknown>>) => InitializeFunctions;
};

function initialize(): InitializeFunctions {
  return {
    withBuiltIn: function (stepDefinition: ExposedStepDefinitions) {
      stepDefinitions[stepDefinition]();
      return this;
    },
    withSelectors: function (selectors) {
      Selection.selectors = selectors;
      return this;
    },
  };
};

export default initialize;