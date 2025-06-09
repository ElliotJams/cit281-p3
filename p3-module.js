module.exports = {
  coinCombo,
  coinValue
};

//find every combination of coins for a given number of cents (amount)
function coinCombo(amount, index = 0) {

  const coins = [100, 50, 25, 10, 5, 1];
  const coinNames = ['dollars', 'halves', 'quarters', 'dimes', 'nickels', 'pennies'];

  if (amount === 0) {
    const initialCombo = {};
    for (const name of coinNames) {
      initialCombo[name] = 0;
    }
    return [initialCombo];
  }
  if(amount < 0 || index >= coins.length) {return [];}

  const coin = coins[index];
  const combos = [];

  for(let count = 0; count<=(Math.floor(amount / coin)); count++) {
    const subCombos = coinCombo(amount-(count*coin), index+1);
    for(subCombo of subCombos) {
      const newCombo = { ...subCombo };
      newCombo[coinNames[index]] = count;
      for (const name of coinNames) {
        if (!(name in newCombo)) {
            newCombo[name] = 0;
        }
      }
      combos.push(newCombo);
    }
  }
  if(index === 0) {
    const result = {amount, combinations: combos, totalCombinations: combos.length};
    return result;
  } else {return combos;}
}

// console.log(coinCombo(0));

function coinValue(coinCounts) {
  const values = {pennies: 1, nickels: 5, dimes: 10, quarters: 25, halves: 50, dollars: 100}
  let totalCents = 0;
  for(coin in coinCounts) {
    totalCents += coinCounts[coin] * values[coin];
  }
  let totalDollars = totalCents / 100;
  return({coins: coinCounts, totalCents, totalDollars});
}

// ----------------------------
// Manual Test Cases
// ----------------------------
if (require.main === module) {

  console.log('\n===== Manual Tests for coinCombo() =====');
  const testCombo1 = coinCombo(5);
  console.log(`Test 1 - coinCombo(5)`);
  console.log(`Expected combinations > 0, Actual: ${testCombo1.totalCombinations}`);
  console.log('Sample:', testCombo1.combinations.slice(0, 3));

  const testCombo2 = coinCombo(0);
  console.log(`\nTest 2 - coinCombo(0)`);
  console.log(`Expected: 1 combination with all zeros`);
  console.log('Actual:', testCombo2.combinations);

  const testCombo3 = coinCombo(-5);
  console.log(`\nTest 3 - coinCombo(-5)`);
  console.log(`Expected: 0 combinations`);
  console.log('Actual:', testCombo3.totalCombinations);

  console.log('\n===== Manual Tests for coinValue() =====');
  const testValue1 = coinValue({ pennies: 4, nickels: 1, dimes: 2, quarters: 1, halves: 0, dollars: 1 });
  console.log(`Test 1 - coinValue({4p,1n,2d,1q,0h,1$})`);
  console.log(`Expected cents: 4 + 5 + 20 + 25 + 0 + 100 = 154`);
  console.log('Actual:', testValue1.totalCents, `($${testValue1.totalDollars})`);

  const testValue2 = coinValue({});
  console.log(`\nTest 2 - coinValue({})`);
  console.log(`Expected: 0 cents`);
  console.log('Actual:', testValue2.totalCents, `($${testValue2.totalDollars})`);

  const testValue3 = coinValue({ pennies: '10', nickels: '2', dollars: '1' });
  console.log(`\nTest 3 - coinValue(string inputs)`);
  console.log(`Expected: 10 + 10 + 100 = 120`);
  console.log('Actual:', testValue3.totalCents, `($${testValue3.totalDollars})`);
}