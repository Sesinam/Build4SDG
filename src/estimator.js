/* eslint-disable linebreak-style */
const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};
  if (data.periodType === 'weeks') {
    data.timeToElapse *= 7;
  } else if (data.timeToElapse === 'months') {
    data.timeToElapse *= 30;
  }
  const days = data.timeToElapse;
  const factorOfDays = 2 ** (Math.trunc(days / 3));
  impact.currentlyInfected = data.reportedCases * 10;
  severeImpact.currentlyInfected = data.reportedCases * 50;
  impact.infectionsByRequestedTime = impact.currentlyInfected * factorOfDays;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * factorOfDays;
  impact.severeCasesByRequestedTime = Math.trunc(0.15 * impact.infectionsByRequestedTime);
  severeImpact.severeCasesByRequestedTime = Math.trunc(0.15
     * severeImpact.infectionsByRequestedTime);

  const numberOfBeds = Math.trunc(0.35 * data.totalHospitalBeds);
  impact.hospitalBedsByRequestedTime = numberOfBeds - impact.severeCasesByRequestedTime;
  severeImpact.hospitalBedsByRequestedTime = numberOfBeds - severeImpact.severeCasesByRequestedTime;

  impact.casesForICUByRequestedTime = Math.trunc(0.05 * impact.infectionsByRequestedTime);
  severeImpact.casesForICUByRequestedTime = Math.trunc(0.05
     * severeImpact.infectionsByRequestedTime);

  impact.casesForVentilatorsByRequestedtTime = Math.trunc(0.02 * impact.infectionsByRequestedTime);
  severeImpact.casesForVentilatorsByRequestedtTime = Math.trunc(0.02
     * severeImpact.infectionsByRequestedTime);

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
