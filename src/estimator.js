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

  const casesForICUByRequestedTime1 = 0.05 * impact.infectionsByRequestedTime;
  impact.casesForICUByRequestedTime = Math.trunc(casesForICUByRequestedTime1);
  const casesForICUByRequestedTime2 = 0.05 * severeImpact.infectionsByRequestedTime;
  severeImpact.casesForICUByRequestedTime = Math.trunc(casesForICUByRequestedTime2);

  const ventilatorCases1 = 0.02 * impact.infectionsByRequestedTime;
  impact.casesForVentilatorsByRequestedTime = Math.trunc(ventilatorCases1);
  const ventilatorCases2 = 0.02 * severeImpact.infectionsByRequestedTime;
  severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(ventilatorCases2);

  const incomeEconomy1 = (impact.infectionsByRequestedTime
     * data.region.avgDailyIncomePopulation
     * data.region.avgDailyIncomeInUSD) / days;
  const incomeEconomy2 = (severeImpact.infectionsByRequestedTime
     * data.region.avgDailyIncomePopulation
     * data.region.avgDailyIncomeInUSD) / days;

  impact.dollarsInFlight = Math.trunc(incomeEconomy1);
  severeImpact.dollarsInFlight = Math.trunc(incomeEconomy2);

  return {
    data,
    impact,
    severeImpact
  };
};


export default covid19ImpactEstimator;
