/* eslint-disable linebreak-style */

const covid19ImpactEstimator = (data) => {
  // eslint-disable-next-line no-unused-vars
  const input = data;
  const inputData = {
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


  const currentlyInfected1 = inputData.reportedCases * 10;

  const currentlyInfected2 = inputData.reportedCases * 50;

  const infectionsByRequestedTime1 = currentlyInfected1
  * (2 ** Math.trunc(inputData.timeToElapse / 3));

  const infectionsByRequestedTime2 = currentlyInfected2
  * (2 ** Math.trunc(inputData.timeToElapse / 3));

  const severeCasesByRequestedTime1 = Math.trunc(0.15 * infectionsByRequestedTime1);

  const severeCasesByRequestedTime2 = Math.trunc(0.15 * infectionsByRequestedTime2);

  const hospitalBedsByRequestedTime1 = Math.trunc(0.35 * inputData.totalHospitalBeds)
  - severeCasesByRequestedTime1;

  const hospitalBedsByRequestedTime2 = Math.trunc(0.35 * inputData.totalHospitalBeds)
  - severeCasesByRequestedTime2;

  const casesForICUByRequestedTime1 = Math.trunc(0.05 * infectionsByRequestedTime1);

  const casesForICUByRequestedTime2 = Math.trunc(0.05 * infectionsByRequestedTime2);

  const casesForVentilatorsByRequestedtTime1 = Math.trunc(0.02 * infectionsByRequestedTime1);

  const casesForVentilatorsByRequestedtTime2 = Math.trunc(0.02 * infectionsByRequestedTime1);

  const dollarsInFlight1 = parseFloat(
    (infectionsByRequestedTime1
      * inputData.avgDailyIncomePopulation * inputData.avgDailyIncomeInUSD * 30).toFixed(2)
  );

  const dollarsInFlight2 = parseFloat(
    (infectionsByRequestedTime2
      * inputData.avgDailyIncomePopulation * inputData.avgDailyIncomeInUSD * 30).toFixed(2)
  );

  return {
    data: { inputData },
    impact: {
      currentlyInfected: currentlyInfected1,
      infectionsByRequestedTime: infectionsByRequestedTime1,
      severeCasesByRequestedTime: severeCasesByRequestedTime1,
      hospitalBedsByRequestedTime: hospitalBedsByRequestedTime1,
      casesForICUByRequestedTime: casesForICUByRequestedTime1,
      casesForVentilatorsByRequestedtTime: casesForVentilatorsByRequestedtTime1,
      dollarsInFlight: dollarsInFlight1
    },
    severeImpact: {
      currentlyInfected: currentlyInfected2,
      infectionsByRequestedTime: infectionsByRequestedTime2,
      severeCasesByRequestedTime: severeCasesByRequestedTime2,
      hospitalBedsByRequestedTime: hospitalBedsByRequestedTime2,
      casesForICUByRequestedTime: casesForICUByRequestedTime2,
      casesForVentilatorsByRequestedtTime: casesForVentilatorsByRequestedtTime2,
      dollarsInFlight: dollarsInFlight2
    }
  };
};


export default covid19ImpactEstimator;
