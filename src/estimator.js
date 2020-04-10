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
  impact.casesForICUByRequestedTime = casesForICUByRequestedTime1;
  const casesForICUByRequestedTime2 = 0.05 * severeImpact.infectionsByRequestedTime;
  severeImpact.casesForICUByRequestedTime = casesForICUByRequestedTime2;

  const casesForVentilatorsByRequestedTime1 = 0.02 * impact.infectionsByRequestedTime;
  impact.casesForVentilatorsByRequestedTime = casesForVentilatorsByRequestedTime1;
  const ventilatorCases = 0.02 * severeImpact.infectionsByRequestedTime;
  severeImpact.casesForVentilatorsByRequestedTime = ventilatorCases;

  const averageDailyIncome = data.region.avgDailyIncomePopulation;
  const dailyIncomePopulation = data.region.avgDailyIncomeInUSD;
  const incomeEconomy = (averageDailyIncome * dailyIncomePopulation);
  impact.dollarsInFlight = parseFloat(((impact.infectionsByRequestedTime
     * incomeEconomy) / 30)).toFixed(2);
  severeImpact.dollarsInFlight = parseFloat(((severeImpact.infectionsByRequestedTime
     * incomeEconomy) / 30).toFixed(2));

  return {
    data,
    impact,
    severeImpact
  };
};


export default covid19ImpactEstimator;
