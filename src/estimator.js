/* eslint-disable linebreak-style */
const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};
  if (data.periodType === 'weeks') {
    data.timeToElapse *= 7;
  } else if (data.periodType === 'months') {
    data.timeToElapse *= 30;
  }
  const days = data.timeToElapse;
  const factorOfDays = 2 ** (Math.trunc(days / 3));
  impact.currentlyInfected = data.reportedCases * 10;
  severeImpact.currentlyInfected = data.reportedCases * 50;
  impact.infectionsByRequestedTime = impact.currentlyInfected * factorOfDays;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * factorOfDays;
  impact.severeCasesByRequestedTime = 0.15 * impact.infectionsByRequestedTime;
  severeImpact.severeCasesByRequestedTime = 0.15 * severeImpact.infectionsByRequestedTime;

  const numberOfBeds = 0.35 * data.totalHospitalBeds;
  impact.hospitalBedsByRequestedTime = Math.trunc(numberOfBeds - impact.severeCasesByRequestedTime);
  severeImpact.hospitalBedsByRequestedTime = Math.trunc(numberOfBeds
     - severeImpact.severeCasesByRequestedTime);

  impact.casesForICUByRequestedTime = 0.05 * impact.infectionsByRequestedTime;
  severeImpact.casesForICUByRequestedTime = 0.05 * severeImpact.infectionsByRequestedTime;

  impact.casesForVentilatorsByRequestedtTime = 0.02 * impact.infectionsByRequestedTime;
  severeImpact.casesForVentilatorsByRequestedtTime = 0.02 * severeImpact.infectionsByRequestedTime;

  const averageDailyIncome = data.region.avgDailyIncomePopulation;
  const dailyIncomePopulation = data.region.avgDailyIncomeInUSD;
  impact.dollarsInFlight = parseFloat(
    (impact.infectionsByRequestedTime * averageDailyIncome * dailyIncomePopulation * 30).toFixed(2)
  );
  severeImpact.dollarsInFlight = parseFloat(
    (severeImpact.infectionsByRequestedTime
     * averageDailyIncome * dailyIncomePopulation * 30).toFixed(2)
  );
  return {
    data,
    impact,
    severeImpact
  };
};


export default covid19ImpactEstimator;
