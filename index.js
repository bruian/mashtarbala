const { pipe, filter, map, compose, prop, includes } = require('ramda');

void function() {
  const dataSetLength = 1000000;
  const dataSet = new Array(dataSetLength);
  const condition = 'bye';
  const testCase = [
    'imperative',
    'functional (forEach)',
    'functional (declarative)',
    'ramda (declarative)',
    'imperative (let)'
  ];

  const test = +process.argv[2] || 1;
  const timesCount = +process.argv[3] || 100;

  const results = new Array(timesCount);

  var start = Date.now();

  console.log('Start data generation');

  for (var i = 0; i < dataSetLength; i++) {
    dataSet[i] = {
      id: i,
      date: new Date(),
      name: `cicle №:${i}`,
      description: (i % 10)
        ? 'Hello, hello, hello, hello, hi, hello, hello, hello'
        : 'Hello, hello, hello, bye, hell, hello, hello, hello',
    };
  }

  console.log('End data generation, ms:', Date.now() - start);

  // 'bye' condition filtering and result mapping in the imperative paradigm
  start = Date.now();

  // test run 10 times
  console.log(`Starts ${testCase[test - 1]} test`);
  for (var times = 0; times < timesCount; times++) {
    // ***** begin *****
    if (test === 1) {
      var operationResult = [];
      for (var i = 0; i < dataSet.length; i++) {
        if (dataSet[i].description.includes(condition)) {
          operationResult.push({ id: dataSet[i].id, date: dataSet[i].date });
        }
      }
    } else if (test === 2) {
      var operationResult = [];
      dataSet.forEach(el => {
        if (el.description.includes(condition)) {
          operationResult.push({ id: el.id, date: el.date });
        }
      });
    } else if (test === 3) {
      var operationResult = dataSet
        .filter(el => el.description.includes(condition))
        .map(el => ({ id: el.id, date: el.date }));
    } else if (test === 4) {
      var operationResult = pipe(
        filter(el => el.description.includes(condition)),
        // filter(compose(includes(condition), prop('id'))),
        map(el => ({ id: el.id, date: el.date }))
      )(dataSet);
    } else if (test === 5) {
      var operationResult = [];
      for (let i = 0; i < dataSet.length; i++) {
        if (dataSet[i].description.includes(condition)) {
          operationResult.push({ id: dataSet[i].id, date: dataSet[i].date });
        }
      }
    }
    // *****  end  *****

    results[times] = Date.now() - start;
    start = Date.now();
  }

  const average = results.reduce((el, acc) => acc += el, 0) / results.length;
  const max = Math.max.apply(null, results);
  const min = Math.min.apply(null, results);
  console.log(`End tests -> average: ${average}, minimal: ${min}, maximal: ${max}`);
}();
