function calculateEarnings(N, T, P, C) {
  let earnings = 0;
  let time_elapsed = 0;

  for (let i = 0; i < T; i++) {
    time_elapsed += 5;
    earnings += (N - time_elapsed) * 1500;
  }
  for (let j = 0; j < P; j++) {
    time_elapsed += 4;
    earnings += (N - time_elapsed) * 1000;
  }
  for (let k = 0; k < C; k++) {
    time_elapsed += 10;
    earnings += (N - time_elapsed) * 2000;
  }

  return earnings;
}

function maxProfit(N) {
  let max_earnings = 0;
  let best_combinations = [];

  for (let T = 0; T <= Math.floor(N / 5); T++) {
    let remaining_after_T = N - 5 * T;
    let prev_earnings = 0;

    for (let P = 0; P <= Math.floor(remaining_after_T / 4); P++) {
      let remaining_after_P = remaining_after_T - 4 * P;

      let C = remaining_after_P >= 10
        ? Math.floor(remaining_after_P / 10)
        : 0;

      let current_earnings = calculateEarnings(N, T, P, C);

      if (current_earnings < prev_earnings) break;
      prev_earnings = current_earnings;

      if (current_earnings > max_earnings) {
        max_earnings = current_earnings;
        best_combinations = [{ T, P, C }];
      } else if (current_earnings === max_earnings && current_earnings > 0) {
        best_combinations.push({ T, P, C });
      }
    }
  }

  return { max_earnings, best_combinations };
}

// --- Run ---
const testCases = [7, 8, 13, 25];
testCases.forEach(N => {
  const { max_earnings, best_combinations } = maxProfit(N);
  console.log(`\nN = ${N}`);
  console.log(`Max Earnings: $${max_earnings.toLocaleString()}`);
  best_combinations.forEach((c, i) =>
    console.log(`  ${i + 1}. T:${c.T} P:${c.P} C:${c.C}`)
  );
});

module.exports = { maxProfit, calculateEarnings };
