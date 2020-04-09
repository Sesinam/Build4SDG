/* eslint-disable linebreak-style */

const covid19ImpactEstimator = (data) => {
  // eslint-disable-next-line no-param-reassign
  data = {
    region: {
      name: 'Africa',
      avgAge: 19.7,
      avgDailyIncomeInUSD: 4,
      avgDailyIncomePopulation: 0.73
    },
    periodType: 'days',
    timeToElapse: 38,
    reportedCases: 2747,
    population: 92931687,
    totalHospitalBeds: 678874
  };
  const impact = {};
  const severeImpact = {};

  //   const daysUsed = data.periodType;
  let days;
  if (data.periodType === 'days') {
    days = data.timeToElapse;
  } else if (data.periodType === 'weeks') {
    days = data.periodType * 7;
  } else if (data.timeToElapse === 'months') {
    days = data.timeToElapse * 30;
  }

  const factorOfDays = 2 ** (Math.trunc(days / 3));

  impact.currentlyInfected = data.reportedCases * 10;

  severeImpact.currentlyInfected = data.reportedCases * 50;

  impact.infectionsByRequestedTime = impact.currentlyInfected * factorOfDays;

  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * factorOfDays;

  impact.severeCasesByRequestedTime = 0.15 * impact.infectionsByRequestedTime;

  severeImpact.severeCasesByRequestedTime = 0.15 * severeImpact.infectionsByRequestedTime;

  const numberOfBeds = 0.35 * data.totalHospitalBeds;
  impact.hospitalBedsByRequestedTime = Math.ceil(numberOfBeds - impact.severeCasesByRequestedTime);

  severeImpact.hospitalBedsByRequestedTime = Math.ceil(numberOfBeds
     - severeImpact.severeCasesByRequestedTime);

  impact.casesForICUByRequestedTime = 0.05 * impact.infectionsByRequestedTime;

  severeImpact.casesForICUByRequestedTime = 0.05 * severeImpact.infectionsByRequestedTime;

  impact.casesForVentilatorsByRequestedtTime = 0.02 * impact.infectionsByRequestedTime;

  severeImpact.casesForVentilatorsByRequestedtTime = 0.02 * severeImpact.infectionsByRequestedTime;

  const averageDailyIncome = data.avgDailyIncomePopulation;
  const dailyIncomePopulation = data.avgDailyIncomeInUSD;
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
