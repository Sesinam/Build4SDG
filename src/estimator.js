/* eslint-disable linebreak-style */
/* eslint-disable no-const-assign */

import { input, impact, severeImpact } from './input';


const covid19ImpactEstimator = (data) => {
  const inputData = data;
  inputData = input;
  return {
    data: inputData,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
